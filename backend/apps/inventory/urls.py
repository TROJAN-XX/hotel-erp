from django.urls import path

from .views import InventoryItemListView, StockMovementListView

urlpatterns = [
    path("items/", InventoryItemListView.as_view(), name="inventory-item-list"),
    path("movements/", StockMovementListView.as_view(), name="stock-movement-list"),
]
