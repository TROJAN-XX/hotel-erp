from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView as JWTTokenRefreshView

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


class TokenRefreshView(JWTTokenRefreshView):
    permission_classes = [permissions.AllowAny]
