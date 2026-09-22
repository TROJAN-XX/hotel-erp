from django.urls import path

from .views import TransportServiceListView, TransportVehicleListView

urlpatterns = [
    path("services/", TransportServiceListView.as_view(), name="transport-service-list"),
    path("vehicles/", TransportVehicleListView.as_view(), name="transport-vehicle-list"),
]
