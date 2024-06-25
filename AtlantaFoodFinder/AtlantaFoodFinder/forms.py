from django import forms
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm
from django.contrib.auth.models import User


class SignupForm(UserCreationForm):
   class Meta:
       model = User
       fields = ['username', 'password1', 'password2']


class LoginForm(forms.Form):
   username = forms.CharField()
   password = forms.CharField(widget=forms.PasswordInput)


class CustomSetPasswordForm(SetPasswordForm):


   username = forms.CharField(max_length=User._meta.get_field('username').max_length)


   class Meta:
       model = User
       fields = ['username', 'new_password1', 'new_password2']


   field_order = ['username', 'new_password1', 'new_password2']


   def clean_username(self):
       username = self.cleaned_data['username']
       try:
           self.user_cache = User.objects.get(username=username)
       except User.DoesNotExist:
           raise forms.ValidationError("Sorry, this username doesn't exist.")
       return username


   def save(self, commit=True):
       user = self.user_cache
       user.set_password(self.cleaned_data['new_password1'])
       if commit:
           user.save()
       return user
