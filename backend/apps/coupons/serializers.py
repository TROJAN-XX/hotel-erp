from rest_framework import serializers

from .models import Coupon


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = [
            "id",
            "code",
            "discount_type",
            "discount_value",
            "minimum_order_amount",
            "max_discount_amount",
            "is_active",
            "valid_from",
            "valid_to",
            "created_at",
            "updated_at",
        ]
