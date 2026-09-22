from rest_framework import serializers

from .models import MenuItem, RestaurantTable


class RestaurantTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantTable
        fields = [
            "id",
            "name",
            "seating_capacity",
            "location",
            "is_active",
            "created_at",
            "updated_at",
        ]


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
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
