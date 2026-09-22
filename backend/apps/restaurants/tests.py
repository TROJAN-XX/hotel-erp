from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import MenuItem, RestaurantTable


class RestaurantAPITests(APITestCase):
    def setUp(self):
        RestaurantTable.objects.create(
            name="Garden Table 1",
            seating_capacity=4,
            location="Garden",
            is_active=True,
        )
        MenuItem.objects.create(
            name="Paneer Tikka Platter",
            slug="paneer-tikka-platter",
            category="Starters",
            price=560,
            is_available=True,
        )

    def test_restaurant_table_list_returns_tables(self):
        response = self.client.get(reverse("restaurant-table-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_menu_item_list_returns_items(self):
        response = self.client.get(reverse("restaurant-menu-item-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
