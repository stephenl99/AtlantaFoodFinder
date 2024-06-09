from django.db import models

from googlemaps import Client
from googleplaces import GooglePlaces
from django.http import JsonResponse
import sqlite3
import googlemaps

import csv





#
# def getLatitude(self):
#     con = sqlite3.connect("./database.db.sqlite")
#     cur = con.cursor()
#     cur.execute("SELECT latitude FROM yelp_atl_restaurants")
#     latitude = cur.fetchall()
#     con.close()
#     return JsonResponse({'latitude': latitude})
#
#
# def getLongitude(self):
#     con = sqlite3.connect("./database.db.sqlite")
#     cur = con.cursor()
#     cur.execute("SELECT longitude FROM yelp_atl_restaurants")
#     longitude = cur.fetchall()
#     return longitude
#
#
# def writeLatitude():
#     con = sqlite3.connect("./database.db.sqlite")
#     cur = con.cursor()
#     cur.execute("SELECT latitude FROM yelp_atl_restaurants")
#     latitude = cur.fetchall()
#     cur.close()
#     con.close()
#     open('./latitude.txt', 'w').close()
#     with open('./latitude.txt', 'w') as f:
#
#         for row in latitude:
#             f.write(str(row[0]) + '\n')
#     f.close()
#
# def writeLongitude():
#     con = sqlite3.connect("./database.db.sqlite")
#     cur = con.cursor()
#     cur.execute("SELECT longitude FROM yelp_atl_restaurants")
#     longitude = cur.fetchall()
#     cur.close()
#     con.close()
#     open('./longitude.txt', 'w').close()
#     with open('./longitude.txt', 'w') as f:
#         for row in longitude:
#             f.write(str(row[0]) + '\n')
#     f.close()

# writeLatitude()
# with open('/Users/stephenlinder/Desktop/DjangoProjects/CS2340Project/latitude.txt', 'r') as f:
#     fline = f.readline().strip()
#     print(fline)
#Create your models here.

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


#     name = "restaurant"
#     lat = 0
#     lon = 0

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


