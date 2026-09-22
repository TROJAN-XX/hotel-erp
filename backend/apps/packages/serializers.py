from rest_framework import serializers

from .models import Package


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "duration_days",
            "base_price",
            "currency",
            "included_services",
            "image_url",
            "is_active",
            "created_at",
            "updated_at",
        ]
