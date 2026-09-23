from django.urls import path

from .views import InventoryItemDetailView, InventoryItemListView, StockMovementListView

urlpatterns = [
    path("items/", InventoryItemListView.as_view(), name="inventory-item-list"),
    path("items/<int:pk>/", InventoryItemDetailView.as_view(), name="inventory-item-detail"),
    path("movements/", StockMovementListView.as_view(), name="stock-movement-list"),
]
