from django.urls import path
from .views import *

from . import views

urlpatterns = [

    path('', views.index, name="index"),
    path("index", views.MapView, name='map_view'),
    path('processMapView/', views.processMapView, name='processMapView'),
    path('removeMapView/', views.removeMapView, name='removeMapView'),
]
#     path("index", views.MapView, name='map_view'),

