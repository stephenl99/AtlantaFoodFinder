from django.http import HttpResponse


def index(request):
    return HttpResponse("Are you hungry Atlanta?")