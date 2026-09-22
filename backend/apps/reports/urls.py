from django.urls import path

from .views import SalesReportListView

urlpatterns = [
    path("sales/", SalesReportListView.as_view(), name="sales-report-list"),
]
