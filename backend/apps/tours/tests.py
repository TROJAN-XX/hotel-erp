from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Tour, TourDestination


class TourAPITests(APITestCase):
    def setUp(self):
        destination = TourDestination.objects.create(
            name="Goa Beaches",
            slug="goa-beaches",
            description="Popular coastal discovery route",
            is_active=True,
        )
        Tour.objects.create(
            destination=destination,
            name="Sunset Coastal Tour",
            slug="sunset-coastal-tour",
            duration_hours=6,
            adult_price=2200,
            child_price=1100,
            is_active=True,
        )

    def test_tour_destination_list_returns_destinations(self):
        response = self.client.get(reverse("tour-destination-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_tour_list_returns_tours(self):
        response = self.client.get(reverse("tour-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
