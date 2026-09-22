from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import InventoryItem, StockMovement


class InventoryAPITests(APITestCase):
    def setUp(self):
        item = InventoryItem.objects.create(
            name="Fresh Linen",
            sku="LIN-001",
            category="Housekeeping",
            current_stock=120,
            reorder_level=20,
            unit="pieces",
            is_active=True,
        )
        StockMovement.objects.create(
            item=item,
            movement_type="inbound",
            quantity=25,
            reference="PO-1001",
            notes="Restock from supplier",
        )

    def test_inventory_item_list_returns_items(self):
        response = self.client.get(reverse("inventory-item-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_stock_movement_list_returns_movements(self):
        response = self.client.get(reverse("stock-movement-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
