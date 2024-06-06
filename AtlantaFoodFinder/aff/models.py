from django.db import models
from googlemaps import Client
from googleplaces import GooglePlaces
from django.http import JsonResponse
import sqlite3


def getLatitude(self):
    con = sqlite3.connect("/Users/stephenlinder/Downloads/database.db.sqlite")
    cur = con.cursor()
    cur.execute("SELECT latitude FROM yelp_atl_restaurants")
    latitude = cur.fetchall()
    con.close()
    return JsonResponse({'latitude': latitude})


def getLongitude(self):
    con = sqlite3.connect("/Users/stephenlinder/Downloads/database.db.sqlite")
    cur = con.cursor()
    cur.execute("SELECT longitude FROM yelp_atl_restaurants")
    longitude = cur.fetchall()
    return longitude


def writeLatitude():
    con = sqlite3.connect("/Users/stephenlinder/Downloads/database.db.sqlite")
    cur = con.cursor()
    cur.execute("SELECT latitude FROM yelp_atl_restaurants")
    latitude = cur.fetchall()
    cur.close()
    con.close()
    open('/Users/stephenlinder/Desktop/DjangoProjects/CS2340Project/latitude.txt', 'w').close()
    with open('/Users/stephenlinder/Desktop/DjangoProjects/CS2340Project/latitude.txt', 'w') as f:

        for row in latitude:
            f.write(str(row[0]) + '\n')
    f.close()

def writeLongitude():
    con = sqlite3.connect("/Users/stephenlinder/Downloads/database.db.sqlite")
    cur = con.cursor()
    cur.execute("SELECT longitude FROM yelp_atl_restaurants")
    longitude = cur.fetchall()
    cur.close()
    con.close()
    open('/Users/stephenlinder/Desktop/DjangoProjects/CS2340Project/longitude.txt', 'w').close()
    with open('/Users/stephenlinder/Desktop/DjangoProjects/CS2340Project/longitude.txt', 'w') as f:
        for row in longitude:
            f.write(str(row[0]) + '\n')
    f.close()

# writeLatitude()
# with open('/Users/stephenlinder/Desktop/DjangoProjects/CS2340Project/latitude.txt', 'r') as f:
#     fline = f.readline().strip()
#     print(fline)
# Create your models here.

class Resturant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    addressName = str(address) + ", " + str(zipcode) + ", Atlanta, Georgia"
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    cuisine = models.CharField(max_length=100)

    def getGeoCode(self):
        gmaps = Client(key='AIzaSyCKFWHaszPZ-MmMklaiANsxo2fz8vhwTq8')
        gmaps.find_place("Atlanta", 'textquery')
        result = gmaps.geocode(str(self.address) + ", " + str(self.zipcode) + ", Atlanta, Georgia")[0]
        gmaps.find_place()
        return result

    #gp = GooglePlaces("AIzaSyAFti1ky6h6R9RLNpRgRHAOLrAR5XXMU4A")
    #q = gp.nearby_search(location='Atlanta',keyword='Resturant',radius=500)
