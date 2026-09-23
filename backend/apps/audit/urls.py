from django.urls import path

from .views import AuditLogListView, AuditSummaryView

urlpatterns = [
    path("", AuditLogListView.as_view(), name="audit-log-list"),
    path("summary/", AuditSummaryView.as_view(), name="audit-summary"),
]
