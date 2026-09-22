from rest_framework import serializers

from .models import PricingRule


class PricingRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingRule
        fields = [
            "id",
            "name",
            "slug",
            "rule_type",
            "value",
            "applies_to",
            "description",
            "is_active",
            "effective_value",
            "created_at",
            "updated_at",
        ]
