# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-26 16:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movieapp', '0008_auto_20160424_1701'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='IsWatched',
            field=models.BooleanField(default=False),
        ),
    ]