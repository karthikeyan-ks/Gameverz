from django.contrib import admin
from .models import Game,Genre

# Register your models here.
admin.site.register(Genre)
admin.site.register(Game)