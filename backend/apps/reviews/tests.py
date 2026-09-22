from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import GuestReview


class ReviewAPITests(APITestCase):
    def setUp(self):
        GuestReview.objects.create(
            guest_name="Raj Sharma",
            item_type="hotel",
            item_id=1,
            rating=5,
            comment="Excellent service and warm hospitality.",
            status="approved",
        )

    def test_review_list_returns_reviews(self):
        response = self.client.get(reverse("review-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
