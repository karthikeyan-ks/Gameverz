from django.db import models
from django.utils import timezone

class Genre(models.Model):
    gid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,unique=True)
    
    def __str__(self):
        return f"{self.name}({self.gid})"
    
    def save(self, *args, **kwargs):
        if self.name:
            self.name = self.name.lower()
        super().save(*args, **kwargs)

class Game(models.Model):
    gid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True,null=True)
    description = models.TextField()
    date_of_join  = models.DateField(default=timezone.now)
    genre = models.ManyToManyField(Genre,blank=False,related_name="game_genre")
    created_by = models.ForeignKey('auth_app.GameAdmin',on_delete=models.CASCADE,related_name="game_created_by")
    
    
    