from django.urls import path
from .views import *

urlpatterns = [
    path("<str:name>/", games, name="games"),
    path('/event/list/',list_event,name="events_list_gamer"),
    path("gamer/<int:gid>/<str:action>/", update_gamer_games, name="update_gamer_games")
]
