from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import BarMenuItem, BarTable


class BarAPITests(APITestCase):
    def setUp(self):
        BarTable.objects.create(
            name="Pool Bar 1",
            seating_capacity=2,
            location="Pool Deck",
            is_active=True,
        )
        BarMenuItem.objects.create(
            name="Mango Mojito",
            slug="mango-mojito",
            category="Cocktails",
            price=420,
            is_available=True,
        )

    def test_bar_table_list_returns_tables(self):
        response = self.client.get(reverse("bar-table-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_bar_menu_item_list_returns_items(self):
        response = self.client.get(reverse("bar-menu-item-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
