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

    def test_inventory_item_adjustment_updates_stock_and_records_movement(self):
        item = InventoryItem.objects.first()

        response = self.client.patch(
            reverse("inventory-item-detail", args=[item.id]),
            {"current_stock": 160, "movement_type": "inbound", "quantity": 40, "reference": "PO-2002", "notes": "Margin restock"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        item.refresh_from_db()
        self.assertEqual(item.current_stock, 160)
        self.assertTrue(StockMovement.objects.filter(reference="PO-2002").exists())
