from rest_framework import generics, permissions

from .models import PricingRule
from .serializers import PricingRuleSerializer


class PricingRuleListView(generics.ListAPIView):
    queryset = PricingRule.objects.filter(is_active=True).order_by("name")
    serializer_class = PricingRuleSerializer
    permission_classes = [permissions.AllowAny]


class PricingRuleDetailView(generics.RetrieveAPIView):
    queryset = PricingRule.objects.filter(is_active=True)
    serializer_class = PricingRuleSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
