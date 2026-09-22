from django.urls import path

from .views import MassageTherapistListView, WellnessServiceListView

urlpatterns = [
    path("services/", WellnessServiceListView.as_view(), name="wellness-service-list"),
    path("therapists/", MassageTherapistListView.as_view(), name="massage-therapist-list"),
]
