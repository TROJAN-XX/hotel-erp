from rest_framework import serializers

from .models import MassageTherapist, WellnessService


class WellnessServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellnessService
        fields = [
            "id",
            "name",
            "slug",
            "category",
            "description",
            "duration_minutes",
            "price",
            "currency",
            "is_active",
            "created_at",
            "updated_at",
        ]


class MassageTherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model = MassageTherapist
        fields = [
            "id",
            "name",
            "specialty",
            "experience_years",
            "hourly_rate",
            "is_available",
            "created_at",
            "updated_at",
        ]
