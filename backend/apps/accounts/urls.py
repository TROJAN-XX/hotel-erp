from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import AdminAccessCheckView, LoginView, MeView, RegisterView, StaffDirectoryView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),
    path("staff/", StaffDirectoryView.as_view(), name="staff-directory"),
    path("admin-check/", AdminAccessCheckView.as_view(), name="admin-access-check"),
]
