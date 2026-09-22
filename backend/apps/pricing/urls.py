from django.urls import path

from .views import PricingRuleDetailView, PricingRuleListView

urlpatterns = [
    path("rules/", PricingRuleListView.as_view(), name="pricing-rule-list"),
    path("rules/<slug:slug>/", PricingRuleDetailView.as_view(), name="pricing-rule-detail"),
]
