from rest_framework import generics, permissions

from .models import MenuItem, RestaurantTable
from .serializers import MenuItemSerializer, RestaurantTableSerializer


class RestaurantTableListView(generics.ListAPIView):
    queryset = RestaurantTable.objects.filter(is_active=True).order_by("name")
    serializer_class = RestaurantTableSerializer
    permission_classes = [permissions.AllowAny]


class MenuItemListView(generics.ListAPIView):
    queryset = MenuItem.objects.filter(is_available=True).order_by("category", "name")
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.AllowAny]
