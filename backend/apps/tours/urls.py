from django.urls import path

from .views import TourDestinationListView, TourListView

urlpatterns = [
    path("destinations/", TourDestinationListView.as_view(), name="tour-destination-list"),
    path("", TourListView.as_view(), name="tour-list"),
]
