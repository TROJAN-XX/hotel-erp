from rest_framework import generics, permissions

from .models import NotificationLog
from .serializers import NotificationLogSerializer


class NotificationLogListView(generics.ListAPIView):
    queryset = NotificationLog.objects.all().order_by("-created_at")
    serializer_class = NotificationLogSerializer
    permission_classes = [permissions.AllowAny]
