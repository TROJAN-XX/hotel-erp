from rest_framework import serializers

from .models import GuestReview


class GuestReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestReview
        fields = [
            "id",
            "guest_name",
            "item_type",
            "item_id",
            "rating",
            "comment",
            "status",
            "created_at",
            "updated_at",
        ]
