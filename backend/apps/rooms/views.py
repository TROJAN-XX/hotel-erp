from rest_framework import generics, permissions

from .models import Room, RoomType
from .serializers import RoomSerializer, RoomTypeSerializer


class RoomTypeListView(generics.ListAPIView):
    queryset = RoomType.objects.filter(is_active=True).select_related("hotel").order_by("hotel__name", "name")
    serializer_class = RoomTypeSerializer
    permission_classes = [permissions.AllowAny]


class RoomTypeDetailView(generics.RetrieveAPIView):
    queryset = RoomType.objects.filter(is_active=True).select_related("hotel")
    serializer_class = RoomTypeSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class RoomListView(generics.ListAPIView):
    queryset = Room.objects.filter(is_active=True).select_related("hotel", "room_type").order_by("hotel__name", "room_number")
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny]
