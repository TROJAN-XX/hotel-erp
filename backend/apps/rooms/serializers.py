from rest_framework import serializers

from .models import Room, RoomType


class RoomTypeSerializer(serializers.ModelSerializer):
    hotel = serializers.StringRelatedField()

    class Meta:
        model = RoomType
        fields = [
            "id",
            "hotel",
            "name",
            "slug",
            "room_size_sqft",
            "max_guests",
            "base_price",
            "bed_type",
            "description",
            "amenities",
            "is_active",
            "created_at",
            "updated_at",
        ]


class RoomSerializer(serializers.ModelSerializer):
    hotel = serializers.StringRelatedField()
    room_type = serializers.StringRelatedField()

    class Meta:
        model = Room
        fields = [
            "id",
            "hotel",
            "room_type",
            "room_number",
            "floor",
            "status",
            "is_active",
        ]
