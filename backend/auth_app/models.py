from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # models.py
    firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=255, blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)

    # Ensure these fields exist
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.display_name or self.email
