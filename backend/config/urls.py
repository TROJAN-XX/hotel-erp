from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/v1/auth/", include("apps.accounts.urls")),
    path("api/v1/hotels/", include("apps.hotels.urls")),
    path("api/v1/rooms/", include("apps.rooms.urls")),
    path("api/v1/restaurants/", include("apps.restaurants.urls")),
    path("api/v1/bar/", include("apps.bar.urls")),
    path("api/v1/tours/", include("apps.tours.urls")),
    path("api/v1/transport/", include("apps.transportation.urls")),
    path("api/v1/wellness/", include("apps.wellness.urls")),
    path("api/v1/packages/", include("apps.packages.urls")),
    path("api/v1/bookings/", include("apps.bookings.urls")),
    path("api/v1/payments/", include("apps.payments.urls")),
    path("api/v1/notifications/", include("apps.notifications.urls")),
    path("api/v1/reports/", include("apps.reports.urls")),
]
