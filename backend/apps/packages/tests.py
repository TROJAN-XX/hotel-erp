from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Package


class PackageAPITests(APITestCase):
    def setUp(self):
        Package.objects.create(
            name="Goa Getaway",
            slug="goa-getaway",
            duration_days=4,
            base_price=18000,
            currency="INR",
            description="Beach stay, transfers, and spa access.",
            is_active=True,
        )

    def test_package_list_returns_active_packages(self):
        response = self.client.get(reverse("package-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_package_detail_returns_package(self):
        response = self.client.get(reverse("package-detail", kwargs={"slug": "goa-getaway"}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["slug"], "goa-getaway")
