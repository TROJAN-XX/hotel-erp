from django.urls import path

from .views import PackageDetailView, PackageListView

urlpatterns = [
    path("", PackageListView.as_view(), name="package-list"),
    path("<slug:slug>/", PackageDetailView.as_view(), name="package-detail"),
]
