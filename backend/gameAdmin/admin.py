from django.contrib import admin
from .models import Game,Genre,Event

# Register your models here.
admin.site.register(Genre)
admin.site.register(Game)
admin.site.register(Event)