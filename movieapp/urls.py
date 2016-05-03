from django.contrib.auth.views import login, logout
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/', views.register, name='register'),
    
    #url(r'^login/', login, {'template_name': 'login.html'}),
    #url(r'^logout/', logout, {'template_name': 'logout.html'}),

    url(r'^movies$', views.movielist),
    url(r'^movies/search', views.moviesearch),
    url(r'^movies/result', views.result, name='result'),

    url(r'^movies/addMovie', views.addMovie),
    url(r'^movies/removeMovie', views.removeMovie),
    
    url(r'^movies/addNote', views.addNote),
    url(r'^movies/updateWatchStatus', views.updateWatchStatus),
]
