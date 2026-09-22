from rest_framework import serializers

from .models import Tour, TourDestination


class TourDestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourDestination
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]


class TourSerializer(serializers.ModelSerializer):
    destination = serializers.StringRelatedField()

    class Meta:
        model = Tour
        fields = [
            "id",
            "destination",
            "name",
            "slug",
            "description",
            "duration_hours",
            "adult_price",
            "child_price",
            "is_active",
            "created_at",
            "updated_at",
        ]
