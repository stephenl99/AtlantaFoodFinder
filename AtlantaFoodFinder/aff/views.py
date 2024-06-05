from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader


def index(request):
    #template = loader.get_template("html.html")
    return render(request, "html.html")
    #return HttpResponse(template.render({}, request))
    #return HttpResponse("Are you hungry Atlanta?")