from django.urls import path
from .views import *

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("index", MapView.as_view(), name='map_view'),
    path('my_ajax_endpoint/', views.my_ajax_view, name='my_ajax_endpoint'),

#     path("index", views.MapView, name='map_view'),

