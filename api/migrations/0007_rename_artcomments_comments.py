# Generated by Django 3.2.8 on 2021-11-04 22:04

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0006_auto_20211104_2149'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ArtComments',
            new_name='Comments',
        ),
    ]