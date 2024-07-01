from django.db import models
from django.contrib.auth.models import AbstractUser, User
#from googleplaces import GooglePlaces
from django.http import JsonResponse
import sqlite3

#User.add_to_class('favorites', [])
# class user(AbstractUser):
#     #REQUIRED_FIELDS = []
#     name = ""
#     favorites = []
# #

class favoriteRestaurant(models.Model):
    associatedUser = models.CharField(max_length=255)
    restaurant = models.CharField(max_length=255)

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

# class Resturant(models.Model):
#     name = models.CharField(max_length=100)
#     address = models.CharField(max_length=100)
#     zipcode = models.CharField(max_length=100)
#     addressName = str(address) + ", " + str(zipcode) + ", Atlanta, Georgia"
#     phone = models.CharField(max_length=100)
#     email = models.CharField(max_length=100)
#     cuisine = models.CharField(max_length=100)
#
#     def getGeoCode(self):
#         gmaps = Client(key='AIzaSyCKFWHaszPZ-MmMklaiANsxo2fz8vhwTq8')
#         gmaps.find_place("Atlanta", 'textquery')
#         result = gmaps.geocode(str(self.address) + ", " + str(self.zipcode) + ", Atlanta, Georgia")[0]
#         gmaps.find_place()
#         return result

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
    #for i in range(1):
        #r = newResturant(name[i], latitude[i], longitude[i])
        #print(r.lat, r.long, r.address, r.categories, r.stars)
    #open('static/business_id.txt', 'w').close()
    #with open('static/business_id.txt', 'w') as f:
     #  for row in name:
      #     f.write(str(row[0]) + '\n')
    #f.close()

#populate()