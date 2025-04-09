from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path("admin/", admin.site.urls),  # Add this line
    path("api/accounts/", include("auth_app.urls")),
    path("api/gamer/",include("gameAdmin.urls")),
    path("api/games/",include('common.urls')),
    path('logout/', LogoutView.as_view(), name='logout'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)