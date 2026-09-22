from django.urls import path

from .views import NotificationLogListView

urlpatterns = [
    path("logs/", NotificationLogListView.as_view(), name="notification-log-list"),
]
