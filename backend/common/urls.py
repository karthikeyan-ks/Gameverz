from django.urls import path
from .views import games,list_event,update_gamer_games,allGames,eventsForYou

urlpatterns = [
    path("<str:name>/", games, name="games_games"),
    path('event/list/',list_event,name="games_events_list_gamer"),
    path("gamer/<int:gid>/<str:action>/", update_gamer_games, name="games_update_gamer_games"),
    path('allgames/',allGames,name="games_all_games_user_123"),
    path('events/foryou/', eventsForYou, name='games_events-for-you'),
]