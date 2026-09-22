from rest_framework import generics, permissions

from .models import Hotel
from .serializers import HotelSerializer


class HotelListView(generics.ListAPIView):
    queryset = Hotel.objects.filter(is_active=True).order_by("name")
    serializer_class = HotelSerializer
    permission_classes = [permissions.AllowAny]


class HotelDetailView(generics.RetrieveAPIView):
    queryset = Hotel.objects.filter(is_active=True)
    serializer_class = HotelSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
