from django.urls import path

from .views import DashboardSummaryView, SalesReportListView

urlpatterns = [
    path("sales/", SalesReportListView.as_view(), name="sales-report-list"),
    path("dashboard/", DashboardSummaryView.as_view(), name="dashboard-summary"),
]
