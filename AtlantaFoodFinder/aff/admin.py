from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
#from .models import user
user = get_user_model()

admin.site.register(user, UserAdmin)