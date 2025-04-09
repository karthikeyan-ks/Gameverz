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
    
    
class GameAdmin(models.Model):
    gid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, related_name="game_admin_user", on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.uid.username}({self.gid})'

    def save(self, *args, **kwargs):
        if Gamer.objects.filter(uid=self.uid).exists():
            raise ValueError("This user is already a Gamer and cannot be a GameAdmin.")
        super().save(*args, **kwargs)


class Gamer(models.Model):
    gid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, related_name="gamer_user", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if GameAdmin.objects.filter(uid=self.uid).exists():
            raise ValueError("This user is already a GameAdmin and cannot be a Gamer.")
        super().save(*args, **kwargs)
