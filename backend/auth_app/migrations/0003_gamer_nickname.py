# Generated by Django 5.2 on 2025-04-09 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamer',
            name='nickname',
            field=models.CharField(default=2, max_length=100),
            preserve_default=False,
        ),
    ]
