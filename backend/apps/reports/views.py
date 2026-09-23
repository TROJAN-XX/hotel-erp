from django.db.models import F
from django.utils import timezone
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.bookings.models import Booking
from apps.inventory.models import InventoryItem
from apps.rooms.models import Room

from .models import SalesReport
from .serializers import SalesReportSerializer


class SalesReportListView(generics.ListAPIView):
    queryset = SalesReport.objects.all().order_by("-generated_at")
    serializer_class = SalesReportSerializer
    permission_classes = [permissions.AllowAny]


class DashboardSummaryView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        bookings = Booking.objects.all()
        inventory = InventoryItem.objects.filter(is_active=True)
        room_total = Room.objects.filter(is_active=True).count()

        total_revenue = sum(
            (booking.total_amount for booking in bookings.exclude(status="cancelled")),
            0,
        )
        checked_in_count = bookings.filter(status="checked_in").count()
        pending_approvals = bookings.filter(status="pending").count()
        low_stock_alerts = inventory.filter(current_stock__lte=F("reorder_level")).count()
        occupancy_rate = (
            round((checked_in_count / room_total) * 100, 2) if room_total else 0.0
        )

        data = {
            "total_revenue": float(total_revenue),
            "total_bookings": bookings.count(),
            "checked_in_count": checked_in_count,
            "pending_approvals": pending_approvals,
            "low_stock_alerts": low_stock_alerts,
            "occupancy_rate": occupancy_rate,
            "available_rooms": max(0, room_total - checked_in_count),
            "generated_at": timezone.now().isoformat(),
        }
        return Response(data)
