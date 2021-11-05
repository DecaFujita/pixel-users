# Generated by Django 3.2.8 on 2021-11-04 13:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_art'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='art',
            name='likes',
        ),
        migrations.CreateModel(
            name='ArtLikes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('art', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='liked_by', to='api.art')),
                ('likes', models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]