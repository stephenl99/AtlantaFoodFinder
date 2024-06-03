from django.db import models
import googlemaps
from googleplaces import GooglePlaces

# Create your models here.

class Resturant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    #addressName = str(address) + ", " + str(zipcode) + ", Atlanta, Georgia"
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    cuisine = models.CharField(max_length=100)
    def getGeoCode(self):
        gmaps = googlemaps.Client(key='AIzaSyAFti1ky6h6R9RLNpRgRHAOLrAR5XXMU4A')
        #gmaps.find_place("Atlanta", 'textquery')
        result = gmaps.geocode(str(self.address) + ", " + str(self.zipcode) + ", Atlanta, Georgia")[0]
        gmaps.find_place()
        return result

    #gp = GooglePlaces("AIzaSyAFti1ky6h6R9RLNpRgRHAOLrAR5XXMU4A")
    #q = gp.nearby_search(location='Atlanta',keyword='Resturant',radius=500)