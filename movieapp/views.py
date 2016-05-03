from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.http import HttpResponseRedirect

# Used in registration
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_protect

# Login
from django.contrib.auth.decorators import login_required

# Search form
from .forms import MovieSearchForm

# For API calls
import requests
import yaml

# Models
from .models import Movie

# json to model deserializer
from django.core import serializers
import json

def index(request):
    return render(request, 'index.html')

@csrf_protect
def register(request):
    if request.method == 'POST':
        # Let's use Django built-in form for user registration
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            return HttpResponseRedirect("/")
    else:
        form = UserCreationForm()
    return render(request, "register.html", {
        'form': form,
    })

@login_required
def movielist(request):
    movies = Movie.objects.filter(User=request.user)
    return render(request, 'movielist.html', {'movielist': movies})

@login_required
def moviesearch(request):
    if request.method == 'GET':
        form = MovieSearchForm(request.GET)

        if form.is_valid():
            # Process the data in form.cleaned_data
            title = str(form.cleaned_data['title'])

            # The actual api call
            response = requests.get('http://www.omdbapi.com/?t=' + title)
            # Convert Django response model to json
            response = response.json()

            return render(request, 'result.html', {'result': response})
    else:
        form = MovieSearchForm()

    return render(request, 'search.html', {'form': form})

# Search results of movie search
@login_required
def result(request):
    return render(request, 'result.html')

@login_required
def addMovie(request):
    if request.method == 'POST':
        data = request.POST
        data = yaml.load(data["movie"])
        loggedUser = request.user

        # Check that it isn't already in db
        if Movie.objects.filter(User = request.user, Title = data['Title']).count() == 0:

            # Set user field
            movie = Movie(User = request.user)

            # Set the other fields from the post data
            for key, value in data.items():
                setattr(movie, key, value)
            movie.save()

            # Movie wasn't already in db, adding
            return JsonResponse({'success': True})

        # Movie was already in db, not adding again
        return JsonResponse({'success': False, 'error-msg': 'The movie is already in the list'})

    # Request method was something else than POST
    return JsonResponse({'success': False, 'error-msg': 'Only POST is supported'})


@login_required
def removeMovie(request):
    if request.method == 'POST':
        data = request.POST
        loggedUser = request.user

        # Get the movie from db and delete it, send error response if not found
        try:
            movie = Movie.objects.get(id = data['id'])
            movie.delete()
        except Movie.DoesNotExist:
            return JsonResponse({'status': 'ERROR', 'error-msg': 'Movie was not found'})

    return JsonResponse({'status': 'OK'})

# Saves user notes
@login_required
def addNote(request):
    if request.method == 'POST':
        data = request.POST
        loggedUser = request.user

        # Get the movie from db and delete it, send error response if not found
        try:
            movie = Movie.objects.get(id = data['id'])
            movie.note = data["note"]
            movie.save();
        except Movie.DoesNotExist:
            return JsonResponse({'success': False, 'error-msg': 'The note could not be saved.'})

    return JsonResponse({'success': True})

# Handles drag n drop effect on movie watch status
@login_required
def updateWatchStatus(request):
    if request.method == 'POST':
        data = request.POST
        loggedUser = request.user

        try:
            movie = Movie.objects.get(id = data['id'])
            movie.IsWatched = json.loads(data["isWatched"])
            movie.save();
        except Movie.DoesNotExist:
            return JsonResponse({'success': False, 'error-msg': 'Movie does not exist'})

    return JsonResponse({'success': True})