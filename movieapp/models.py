# Database models
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import URLValidator

class Movie(models.Model):
	User        = models.ForeignKey(User)
	Title       = models.CharField(max_length = 100, null = True)
	Released    = models.CharField(max_length = 50,  null = True)
	Genre       = models.CharField(max_length = 100, null = True)
	Plot        = models.CharField(max_length = 250, null = True)
	Director    = models.CharField(max_length = 100, null = True)
	Writer      = models.CharField(max_length = 300, null = True)
	Actors      = models.CharField(max_length = 250, null = True)
	Country     = models.CharField(max_length = 50,  null = True)
	imdbRating  = models.DecimalField(max_digits = 10, decimal_places = 2, null = True)
	Poster		= models.URLField(validators=[URLValidator()], null=True)
	note        = models.CharField(max_length = 500, null = True, blank = True)
	IsWatched   = models.BooleanField(default=False)