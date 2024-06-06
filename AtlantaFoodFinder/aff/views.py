from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.views import View
from .models import Resturant
from .models import RestaurantList
import json


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