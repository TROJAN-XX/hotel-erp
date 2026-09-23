from datetime import date
from decimal import Decimal

from django.db.models import F, Sum
from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView as JWTTokenRefreshView

from apps.bookings.models import Booking
from apps.inventory.models import InventoryItem, StockMovement
from apps.notifications.models import NotificationLog
from apps.rooms.models import Room

from .models import User
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    StaffDirectorySerializer,
    UserSerializer,
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login_serializer = LoginSerializer(data={"email": user.email, "password": request.data["password"]})
        login_serializer.is_valid(raise_exception=True)
        response_data = login_serializer.validated_data
        response_data["message"] = "Registration successful"
        return Response(response_data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = serializer.validated_data
        payload["message"] = "Login successful"
        return Response(payload, status=status.HTTP_200_OK)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data})


class StaffDirectoryView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        staff_users = User.objects.filter(role="staff").order_by("first_name", "last_name")
        serialized = StaffDirectorySerializer(staff_users, many=True).data
        payload = {
            "total_staff": staff_users.count(),
            "active_staff": staff_users.filter(is_active=True).count(),
            "pending_shifts": max(0, 6 - min(6, staff_users.filter(is_active=True).count() // 5)),
            "compliance": 98,
            "results": serialized,
        }
        return Response(payload)


class AdminAccessCheckView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.role != "admin":
            return Response({"detail": "Admin access required."}, status=status.HTTP_403_FORBIDDEN)
        return Response({"is_admin": True, "role": request.user.role})


class AdminOverviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.role != "admin":
            return Response({"detail": "Admin access required."}, status=status.HTTP_403_FORBIDDEN)

        bookings = Booking.objects.select_related("hotel", "room_type").all()
        inventory = InventoryItem.objects.filter(is_active=True)
        rooms = Room.objects.filter(is_active=True)
        staff_users = User.objects.filter(role="staff")
        low_stock_items = inventory.filter(current_stock__lte=F("reorder_level"))[:5]

        total_revenue = bookings.exclude(status="cancelled").aggregate(total=Sum("total_amount"))["total"] or Decimal("0.00")
        checked_in_count = bookings.filter(status="checked_in").count()
        pending_approvals = bookings.filter(status="pending").count()
        low_stock_alerts = low_stock_items.count()
        room_total = rooms.count()
        occupancy_rate = round((checked_in_count / room_total) * 100, 2) if room_total else 0.0

        alerts = [
            {
                "type": "inventory",
                "severity": "warning",
                "message": f"{item.name} is below the reorder threshold ({item.current_stock}/{item.reorder_level}).",
            }
            for item in low_stock_items
        ]

        for booking in bookings.filter(status="pending").order_by("-created_at")[:3]:
            alerts.append(
                {
                    "type": "booking",
                    "severity": "info",
                    "message": f"{booking.guest_name or 'Guest'} is waiting for approval for {booking.hotel.name}.",
                }
            )

        recent_bookings = []
        for booking in bookings.order_by("-created_at")[:8]:
            recent_bookings.append(
                {
                    "id": booking.id,
                    "guest_name": booking.guest_name,
                    "hotel": booking.hotel.name,
                    "status": booking.status,
                    "total_amount": float(booking.total_amount),
                    "check_in": booking.check_in.isoformat(),
                    "check_out": booking.check_out.isoformat(),
                }
            )

        payload = {
            "summary": {
                "total_revenue": float(total_revenue),
                "total_bookings": bookings.count(),
                "checked_in_count": checked_in_count,
                "pending_approvals": pending_approvals,
                "low_stock_alerts": low_stock_alerts,
                "occupancy_rate": occupancy_rate,
                "available_rooms": max(0, room_total - checked_in_count),
            },
            "staff": {
                "total_staff": staff_users.count(),
                "active_staff": staff_users.filter(is_active=True).count(),
                "compliance": 98,
            },
            "bookings": recent_bookings,
            "alerts": alerts,
            "generated_at": timezone.now().isoformat(),
        }
        return Response(payload)


class AdminActionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.user.role != "admin":
            return Response({"detail": "Admin access required."}, status=status.HTTP_403_FORBIDDEN)

        action = request.data.get("action")
        if not action:
            return Response({"detail": "Action is required."}, status=status.HTTP_400_BAD_REQUEST)

        if action == "approve_booking":
            booking_id = request.data.get("booking_id")
            if not booking_id:
                return Response({"detail": "booking_id is required."}, status=status.HTTP_400_BAD_REQUEST)
            try:
                booking = Booking.objects.get(pk=booking_id)
            except Booking.DoesNotExist:
                return Response({"detail": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)
            booking.status = "confirmed"
            booking.save(update_fields=["status", "updated_at"])
            NotificationLog.objects.create(
                recipient=booking.guest_name or "guest@demo.local",
                channel="email",
                subject="Booking approved",
                message=f"Your booking at {booking.hotel.name} has been approved and confirmed.",
                status="sent",
            )
            return Response({"success": True, "action": action, "status": booking.status, "booking_id": booking.id})

        if action == "adjust_inventory":
            item_id = request.data.get("item_id")
            quantity = int(request.data.get("quantity", 0))
            if not item_id:
                return Response({"detail": "item_id is required."}, status=status.HTTP_400_BAD_REQUEST)
            try:
                item = InventoryItem.objects.get(pk=item_id)
            except InventoryItem.DoesNotExist:
                return Response({"detail": "Inventory item not found."}, status=status.HTTP_404_NOT_FOUND)

            item.current_stock = max(0, item.current_stock + quantity)
            item.save(update_fields=["current_stock", "updated_at"])
            StockMovement.objects.create(
                item=item,
                movement_type="adjustment" if quantity >= 0 else "outbound",
                quantity=quantity,
                reference="Admin adjustment",
                notes=request.data.get("notes", "Manual admin update."),
            )
            return Response({
                "success": True,
                "action": action,
                "item_id": item.id,
                "current_stock": item.current_stock,
            })

        return Response({"detail": f"Unsupported action: {action}"}, status=status.HTTP_400_BAD_REQUEST)


class TokenRefreshView(JWTTokenRefreshView):
    permission_classes = [permissions.AllowAny]
