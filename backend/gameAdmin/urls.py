from django.urls import path
from .views import *

urlpatterns = [
    path("dashboard/", dashboard, name="dashboard"),
    path("add_game/",addGame , name="add_game"),
    path('delete_game/<int:gid>',deleteGame,name="delete_game"),
    path("update_game/<int:gid>/",updateGame,name="update_game"),
    path('search_game/<str:name>/',searchGame,name="search_game")
]
