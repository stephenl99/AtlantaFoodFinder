from django.db import models
import googlemaps
from googleplaces import GooglePlaces
import sqlite3
import csv

# Create your models here.

class Resturant(models.Model):
    lat = 0
    lon = 0
    #def getGeoCode(self):
        #gmaps = googlemaps.Client(key='AIzaSyAFti1ky6h6R9RLNpRgRHAOLrAR5XXMU4A')
        #gmaps.find_place("Atlanta", 'textquery')
        #result = gmaps.geocode(str(self.address) + ", " + str(self.zipcode) + ", Atlanta, Georgia")[0]
        #return result

    #gp = GooglePlaces("AIzaSyAFti1ky6h6R9RLNpRgRHAOLrAR5XXMU4A")
    #q = gp.nearby_search(location='Atlanta',keyword='Resturant',radius=500)

class RestaurantList(models.Model):
    name = models.CharField(max_length=100)
    listLat = []
    listLon = []
    def makeList(self):
        list = []
        listLat = []
        listLon = []
        conn = sqlite3.connect('db.sqlite')
        cur = conn.cursor()
        cur.execute("SELECT latitude, longitude from yelp_atl_restaurants")
        rows = cur.fetchall()
        for row in rows:
            list.append(row)
        return list
        #with open("restaurantCoordinates.csv", 'w') as restaurantCoordinates:
            #csvwriter = csv.writer(restaurantCoordinates)
            #for row in rows:
                #csvwriter.writerow(row)
        #restaurantCoordinates.close()

