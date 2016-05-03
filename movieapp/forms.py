# This module contains form structures of the application
from django import forms

class MovieSearchForm(forms.Form):
    title = forms.CharField(label='Movie title')