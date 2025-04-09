from django.urls import path
from .views import *

urlpatterns = [
    path("<str:name>/", games, name="games"),
]
