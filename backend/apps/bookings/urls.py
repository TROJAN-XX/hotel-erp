from django.urls import path

from .views import BookingDetailView, BookingListCreateView

urlpatterns = [
    path("", BookingListCreateView.as_view(), name="booking-list"),
    path("<int:pk>/", BookingDetailView.as_view(), name="booking-detail"),
]
