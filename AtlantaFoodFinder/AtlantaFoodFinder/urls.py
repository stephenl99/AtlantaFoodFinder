"""
URL configuration for AtlantaFoodFinder project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from aff import views

urlpatterns = [
    path("", include('aff.urls'), name='index'),
    path("aff/", include("aff.urls"), name='aff'),
    path("admin/", admin.site.urls),
    path('login/', views.user_login, name='login'),
    path('signup/', views.user_signup, name='signup'),
    path('logout/', views.user_logout, name='logout'),
    path('reset/', views.user_resetpassword, name='reset'),
    path('about/', views.about, name='about'),
    path('notfound/', views.builder, name='notFound'),
    path('favorites/', views.favorites, name='favorites'),
    path('explore/', views.explore, name='explore'),
]
