from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import PricingRule


class PricingRuleAPITests(APITestCase):
    def setUp(self):
        PricingRule.objects.create(
            name="Weekend Discount",
            slug="weekend-discount",
            rule_type="percentage",
            value=10,
            is_active=True,
        )

    def test_pricing_rule_list_returns_rules(self):
        response = self.client.get(reverse("pricing-rule-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_pricing_rule_detail_returns_rule(self):
        response = self.client.get(reverse("pricing-rule-detail", kwargs={"slug": "weekend-discount"}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["slug"], "weekend-discount")
