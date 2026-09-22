from rest_framework import serializers

from .models import BarMenuItem, BarTable


class BarTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarTable
        fields = [
            "id",
            "name",
            "seating_capacity",
            "location",
            "is_active",
            "created_at",
            "updated_at",
        ]


class BarMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarMenuItem
        fields = [
            "id",
            "name",
            "slug",
            "category",
            "description",
            "price",
            "currency",
            "is_available",
            "created_at",
            "updated_at",
        ]
