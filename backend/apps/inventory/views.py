from rest_framework import generics, permissions
from rest_framework.response import Response

from .models import InventoryItem, StockMovement
from .serializers import InventoryItemSerializer, StockMovementSerializer


class InventoryItemListView(generics.ListAPIView):
    queryset = InventoryItem.objects.filter(is_active=True).order_by("category", "name")
    serializer_class = InventoryItemSerializer
    permission_classes = [permissions.AllowAny]


class InventoryItemDetailView(generics.RetrieveUpdateAPIView):
    queryset = InventoryItem.objects.filter(is_active=True).order_by("category", "name")
    serializer_class = InventoryItemSerializer
    permission_classes = [permissions.AllowAny]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        payload = request.data.copy()

        movement_type = payload.get("movement_type")
        quantity = payload.get("quantity")
        current_stock = payload.get("current_stock")

        if current_stock is not None:
            target_stock = int(current_stock)
            delta = target_stock - instance.current_stock
            if quantity is None:
                quantity = delta
            payload["current_stock"] = target_stock
        elif quantity is not None:
            quantity_value = int(quantity)
            if movement_type == "outbound":
                quantity_value = -abs(quantity_value)
            elif movement_type == "inbound":
                quantity_value = abs(quantity_value)
            payload["current_stock"] = instance.current_stock + quantity_value

        serializer = self.get_serializer(instance, data=payload, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if movement_type and quantity is not None:
            movement_quantity = int(quantity)
            if movement_type == "outbound" and movement_quantity > 0:
                movement_quantity = -abs(movement_quantity)
            elif movement_type == "inbound" and movement_quantity < 0:
                movement_quantity = abs(movement_quantity)
            StockMovement.objects.create(
                item=instance,
                movement_type=movement_type,
                quantity=movement_quantity,
                reference=payload.get("reference", ""),
                notes=payload.get("notes", ""),
            )

        return Response(serializer.data)


class StockMovementListView(generics.ListAPIView):
    queryset = StockMovement.objects.all().order_by("-created_at")
    serializer_class = StockMovementSerializer
    permission_classes = [permissions.AllowAny]
