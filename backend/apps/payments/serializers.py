from rest_framework import serializers

from .models import PaymentTransaction, RefundRequest


class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = [
            "id",
            "amount",
            "currency",
            "payment_method",
            "gateway",
            "status",
            "reference_id",
            "note",
            "created_at",
            "updated_at",
        ]


class RefundRequestSerializer(serializers.ModelSerializer):
    transaction = serializers.StringRelatedField()

    class Meta:
        model = RefundRequest
        fields = [
            "id",
            "transaction",
            "refund_amount",
            "reason",
            "status",
            "created_at",
            "updated_at",
        ]
