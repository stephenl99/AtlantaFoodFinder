from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.views import View

from django.http import JsonResponse
from . import models

import json


def my_ajax_view(request):

    #data = {'result': 'Hello from Python!'}
    data = models.Getters.getLongitude()
    return JsonResponse(data)
def index(request):
    #template = loader.get_template("html.html")
    return render(request, "aff/html.html")
    #return HttpResponse(template.render({}, request))
    #return HttpResponse("Are you hungry Atlanta?")

def MapView(request):
    r = RestaurantList()
    list = r.makeList()
    template_name = "aff/index.html"
    context = {
        "list": list,
    }
    return render(request, template_name, context)
    #def get(self,request):
     #   context = {
      #      "list": self.list,
       # }
        #return render(request, self.template_name, context)