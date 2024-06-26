from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
#from django.contrib.auth.models import User
#User = get_user_model()
from aff.models import user


class SignupForm(UserCreationForm):
    class Meta:
        model = user
        fields = ['username', 'password1', 'password2']


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
