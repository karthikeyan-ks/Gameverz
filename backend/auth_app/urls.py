from django.urls import path
from .views import *

urlpatterns = [
    path("firebase-login/", firebase_login, name="firebase-login"),
    path('signup/',signUp,name="sign_up"),
    path('gameadmin/',gameAdminSignup,name="gameadmin_signup")
]
