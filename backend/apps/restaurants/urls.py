from django.urls import path

from .views import MenuItemListView, RestaurantTableListView

urlpatterns = [
    path("tables/", RestaurantTableListView.as_view(), name="restaurant-table-list"),
    path("menu/", MenuItemListView.as_view(), name="restaurant-menu-item-list"),
]
