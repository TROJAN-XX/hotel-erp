from rest_framework import generics, permissions

from .models import InventoryItem, StockMovement
from .serializers import InventoryItemSerializer, StockMovementSerializer


class InventoryItemListView(generics.ListAPIView):
    queryset = InventoryItem.objects.filter(is_active=True).order_by("category", "name")
    serializer_class = InventoryItemSerializer
    permission_classes = [permissions.AllowAny]


class StockMovementListView(generics.ListAPIView):
    queryset = StockMovement.objects.all().order_by("-created_at")
    serializer_class = StockMovementSerializer
    permission_classes = [permissions.AllowAny]
