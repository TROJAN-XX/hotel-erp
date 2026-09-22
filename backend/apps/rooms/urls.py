from django.urls import path

from .views import RoomListView, RoomTypeDetailView, RoomTypeListView

urlpatterns = [
    path("types/", RoomTypeListView.as_view(), name="room-type-list"),
    path("types/<slug:slug>/", RoomTypeDetailView.as_view(), name="room-type-detail"),
    path("", RoomListView.as_view(), name="room-list"),
]
