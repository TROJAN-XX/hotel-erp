from django.urls import path

from .views import BarMenuItemListView, BarTableListView

urlpatterns = [
    path("tables/", BarTableListView.as_view(), name="bar-table-list"),
    path("menu/", BarMenuItemListView.as_view(), name="bar-menu-item-list"),
]
