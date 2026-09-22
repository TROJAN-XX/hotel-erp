from rest_framework import generics, permissions

from .models import BarMenuItem, BarTable
from .serializers import BarMenuItemSerializer, BarTableSerializer


class BarTableListView(generics.ListAPIView):
    queryset = BarTable.objects.filter(is_active=True).order_by("name")
    serializer_class = BarTableSerializer
    permission_classes = [permissions.AllowAny]


class BarMenuItemListView(generics.ListAPIView):
    queryset = BarMenuItem.objects.filter(is_available=True).order_by("category", "name")
    serializer_class = BarMenuItemSerializer
    permission_classes = [permissions.AllowAny]
