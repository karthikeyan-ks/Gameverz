from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),  # Add this line
    path("api/accounts/", include("auth_app.urls")),
    path("api/gamer/",include("gameAdmin.urls"))
]
