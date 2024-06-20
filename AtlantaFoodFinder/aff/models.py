from django.db import models
from googlemaps import Client
#from googleplaces import GooglePlaces
from django.http import JsonResponse
import sqlite3

#
#def getLatitude(self):
     #con = sqlite3.connect("./database.db.sqlite")
     #cur = con.cursor()
    # cur.execute("SELECT name FROM yelp_atl_restaurants")
   #  latitude = cur.fetchall()
  #   con.close()
 #    return JsonResponse({'latitude': latitude})
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

#writeName()
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

class newResturant(models.Model):
    name = models.CharField(max_length=100)
    lat = models.FloatField()
    long = models.FloatField()
    address = models.CharField(max_length=100)
    categories = models.CharField(max_length=100)
    stars = models.CharField(max_length=100)

def populate():
    con = sqlite3.connect("/Users/christopherlinder/Downloads/db.sqlite")
    cur = con.cursor()
    cur.execute("SELECT name FROM yelp_atl_restaurants")
    name = cur.fetchall()
    cur.execute("SELECT latitude FROM yelp_atl_restaurants")
    latitude = cur.fetchall()
    cur.execute("SELECT longitude FROM yelp_atl_restaurants")
    longitude = cur.fetchall()
    cur.execute("SELECT categories FROM yelp_atl_restaurants")
    categories = cur.fetchall()
    cur.execute("SELECT stars FROM yelp_atl_restaurants")
    stars = cur.fetchall()
    cur.close()
    con.close()
    for i in range(1):
        r = newResturant(name[i], latitude[i], longitude[i])
        print(r.lat, r.long, r.address, r.categories, r.stars)
    #open('static/business_id.txt', 'w').close()
    #with open('static/business_id.txt', 'w') as f:
     #  for row in name:
      #     f.write(str(row[0]) + '\n')
    #f.close()

#populate()