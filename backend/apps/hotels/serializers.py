from rest_framework import serializers

from .models import Hotel


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "slug",
            "city",
            "state",
            "country",
            "address",
            "description",
            "star_rating",
            "check_in_time",
            "check_out_time",
            "is_active",
            "created_at",
            "updated_at",
        ]
