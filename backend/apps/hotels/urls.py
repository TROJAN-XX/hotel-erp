from django.urls import path

from .views import HotelDetailView, HotelListView

urlpatterns = [
    path("", HotelListView.as_view(), name="hotel-list"),
    path("<slug:slug>/", HotelDetailView.as_view(), name="hotel-detail"),
]
