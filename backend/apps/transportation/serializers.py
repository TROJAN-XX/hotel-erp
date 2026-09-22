from rest_framework import serializers

from .models import TransportService, TransportVehicle


class TransportServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportService
        fields = [
            "id",
            "name",
            "slug",
            "service_type",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]


class TransportVehicleSerializer(serializers.ModelSerializer):
    service = serializers.StringRelatedField()

    class Meta:
        model = TransportVehicle
        fields = [
            "id",
            "service",
            "name",
            "plate_number",
            "capacity",
            "base_price",
            "is_active",
            "created_at",
            "updated_at",
        ]
