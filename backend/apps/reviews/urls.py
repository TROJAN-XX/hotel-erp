from django.urls import path

from .views import GuestReviewListView

urlpatterns = [
    path("", GuestReviewListView.as_view(), name="review-list"),
]
