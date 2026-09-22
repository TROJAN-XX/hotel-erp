from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Coupon


class CouponAPITests(APITestCase):
    def setUp(self):
        Coupon.objects.create(
            code="SAVE10",
            discount_type="percentage",
            discount_value=10,
            minimum_order_amount=1500,
            max_discount_amount=500,
            is_active=True,
        )

    def test_coupon_list_returns_coupons(self):
        response = self.client.get(reverse("coupon-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
