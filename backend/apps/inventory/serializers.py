from rest_framework import serializers

from .models import InventoryItem, StockMovement


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = [
            "id",
            "name",
            "sku",
            "category",
            "current_stock",
            "reorder_level",
            "unit",
            "is_active",
            "created_at",
            "updated_at",
        ]


class StockMovementSerializer(serializers.ModelSerializer):
    item = serializers.StringRelatedField()

    class Meta:
        model = StockMovement
        fields = [
            "id",
            "item",
            "movement_type",
            "quantity",
            "reference",
            "notes",
            "created_at",
        ]
