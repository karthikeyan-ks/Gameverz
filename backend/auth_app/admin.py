from django.contrib import admin
from .models import User,GameAdmin,Gamer

# Register your models here.
admin.site.register(User)
admin.site.register(GameAdmin)
admin.site.register(Gamer)