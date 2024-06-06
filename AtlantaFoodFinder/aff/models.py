from django.db import models

import googlemaps
from googleplaces import GooglePlaces
import sqlite3
import csv




# Create your models here.

class Resturant(models.Model):

    name = "restaurant"
    lat = 0
    lon = 0

    def __str__(self):
        return self.name
    #def getGeoCode(self):
        #gmaps = googlemaps.Client(key='AIzaSyAFti1ky6h6R9RLNpRgRHAOLrAR5XXMU4A')

#     name = models.CharField(max_length=100)
#     address = models.CharField(max_length=100)
#     zipcode = models.CharField(max_length=100)
#     #addressName = str(address) + ", " + str(zipcode) + ", Atlanta, Georgia"
#     phone = models.CharField(max_length=100)
#     email = models.CharField(max_length=100)
#     cuisine = models.CharField(max_length=100)
#     def getGeoCode(self):
#         gmaps = Client(key='AIzaSyCKFWHaszPZ-MmMklaiANsxo2fz8vhwTq8')

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
        list2 = []
        conn = sqlite3.connect('db.sqlite')
        cur = conn.cursor()
        cur.execute("SELECT name, latitude, longitude from yelp_atl_restaurants")
        rows = cur.fetchall()
        for row in rows:
            list.append(row)
            r = Resturant()
            r.name = row[0]
            r.lat = row[1]
            r.lon = row[2]
            list2.append(r)
        return list2
        #with open("restaurantCoordinates.csv", 'w') as restaurantCoordinates:
            #csvwriter = csv.writer(restaurantCoordinates)
            #for row in rows:
                #csvwriter.writerow(row)
        #restaurantCoordinates.close()

