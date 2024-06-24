// Initialize and add the map
let map;
markersList = [];
favorites = [];
userLat = 0.0;
userLong = 0.0;
let userName = "temp";

async function initMap() {
    const lats = await fetch('aff/../static/latitude.txt');
    const latitudes = await lats.text();
    const longs = await fetch('aff/../static/longitude.txt');
    const longitudes = await longs.text();
    const n = await fetch('aff/../static/name.txt');
    const names = await n.text();
    const cats = await fetch('aff/../static/categories.txt');
    const categories = await cats.text();
    const r = await fetch('aff/../static/stars.txt');
    const stars = await r.text();
    const a = await fetch('aff/../static/address.txt');
    const addresses = await a.text();
    const at = await fetch('aff/../static/attributes.txt');
    const attributes = await at.text();
    const firstLat = latitudes.split('\n')[0]
    const l = parseFloat(firstLat)
    const firstLong = longitudes.split('\n')[0]
    const long = parseFloat(firstLong)

    const position = { lat: l, lng: long};

    const {Map} = await google.maps.importLibrary("maps");

    // The map, centered in Atlanta
    map = new Map(document.getElementById("map"), {
        zoom: 8,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Browser does not support geolocation.");
    }

  placeMarkers(1, latitudes, longitudes, names);
  getRestaurantGeneral(latitudes, longitudes, names, categories, stars, addresses, attributes);
  getRestaurantCuisine(latitudes, longitudes, names, categories, stars, addresses, attributes);
  getRestaurantRating(latitudes, longitudes, names, categories, stars, addresses, attributes);
  getRestaurantRadius(latitudes, longitudes, names, categories, stars, addresses, attributes);
  //choiceCuisine("empty");
}

async function showPosition(position) {
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    makeMarker(userLat, userLong, "You", "Your device", 1);
}

async function placeMarkers(number, latitudes, longitudes, names) {
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
    const {InfoWindow} = await google.maps.importLibrary("maps")
    for (var i = 0; i < number; i++) {
        const lat = latitudes.split('\n')[i]
        const long = longitudes.split('\n')[i]
        const name = names.split('\n')[i]
        const positionVariable = {lat: parseFloat(lat), lng: parseFloat(long)}
        const contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
          '<div id="bodyContent">' +
          "<p> information about the restaurant and cuisine, etc </p>" +
          "</div>";

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: name,
        });
        const marker = new AdvancedMarkerElement({
            map: map,
            position: positionVariable,
            title: name,
        });
       marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });
       markersList.push(marker);
    }
}

async function getRestaurantGeneral(latitudes, longitudes, names, categories, stars, addresses, attributes) {
  clearMarkers();
  var input = document.getElementById('restaurant');
  filter = input.value.toUpperCase();
  input.addEventListener("dblclick", function(event) {
    for (var i = 0; i < 1000; i++) {
      var actName = names.split('\n')[i].toUpperCase();
      var category = categories.split('\n')[i].toUpperCase();
      var address = addresses.split('\n')[i].toUpperCase();
      const description = attributes.split('\n')[i];
      if (actName == filter || actName.includes(filter) || category.includes(filter) || address.includes(filter)) {
          const lat = latitudes.split('\n')[i]
          const long = longitudes.split('\n')[i]
          const star = stars.split('\n')[i]
          makeMarker(lat, long, actName, category, star);
      }
    }
  });
}

async function display_list() {
    var list = document.getElementById("cuisine_id");
    if (list.style.display == "block") {
        list.style.display = "none"
    } else {
        list.style.display = "block";
    }
}

async function choiceCuisine(name) {
    clearMarkers();
    const lats = await fetch('aff/../static/latitude.txt');
    const latitudes = await lats.text();
    const longs = await fetch('aff/../static/longitude.txt');
    const longitudes = await longs.text();
    const n = await fetch('aff/../static/name.txt');
    const names = await n.text();
    const cats = await fetch('aff/../static/categories.txt');
    const categories = await cats.text();
    const r = await fetch('aff/../static/stars.txt');
    const stars = await r.text();
    for (var i = 0; i < 1000; i++) {
        if (categories.split('\n')[i].toUpperCase().includes(name.toUpperCase())) {
            //alert(i);
            const lat = latitudes.split('\n')[i]
            const long = longitudes.split('\n')[i]
            makeMarker(parseFloat(lat), parseFloat(long), names.split('\n')[i], categories.split('\n')[i], stars.split('\n')[i]);
        }
    }
}

async function getRestaurantCuisine(latitudes, longitudes, names, categories, stars, addresses, attributes) {
  clearMarkers();
  var input = document.getElementById('restaurantCuisine');
  filter = input.value.toUpperCase();
  input.addEventListener("dblclick", function(event) {
    for (var i = 0; i < 1000; i++) {
      var actName = names.split('\n')[i].toUpperCase();
      var category = categories.split('\n')[i].toUpperCase();
      var address = addresses.split('\n')[i].toUpperCase();
      const description = attributes.split('\n')[i];
      if (category.includes(filter)) {
          const lat = latitudes.split('\n')[i]
          const long = longitudes.split('\n')[i]
          const star = stars.split('\n')[i]
          makeMarker(parseFloat(lat), parseFloat(long), actName, category, star);
      }
    }
  });
}

async function getRestaurantRating(latitudes, longitudes, names, categories, stars, addresses, attributes) {
  clearMarkers();
  var input = document.getElementById('restaurantStar');
  filter = input.value;
  input.addEventListener("dblclick", function(event) {
    for (var i = 0; i < 1000; i++) {
      var actName = names.split('\n')[i].toUpperCase();
      var category = categories.split('\n')[i].toUpperCase();
      var address = addresses.split('\n')[i].toUpperCase();
      var star = stars.split('\n')[i];
      if (star.includes(filter)) {
          const lat = latitudes.split('\n')[i]
          const long = longitudes.split('\n')[i]
          const star = stars.split('\n')[i]
          makeMarker(parseFloat(lat), parseFloat(long), actName, category, star);
      }
    }
  });
}

async function getRestaurantRadius(latitudes, longitudes, names, categories, stars, addresses, attributes) {
  clearMarkers();
  var input = document.getElementById('restaurantRadius');
  filter = input.value;
  input.addEventListener("dblclick", function(event) {
    for (var i = 0; i < 1000; i++) {
        const lat = latitudes.split('\n')[i]
        const long = longitudes.split('\n')[i]
      if (getDistanceFromLatLonInKm(userLat, userLong, lat, long) <= parseFloat(filter)) {
          var actName = names.split('\n')[i].toUpperCase();
          var category = categories.split('\n')[i].toUpperCase();
          var address = addresses.split('\n')[i].toUpperCase();
          const star = stars.split('\n')[i]
          makeMarker(parseFloat(lat), parseFloat(long), actName, category, star);
      }
    }
  });
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

async function makeMarker(lat, long, name, category, star) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const location = {lat: parseFloat(lat), lng: parseFloat(long)};
    const marker = new AdvancedMarkerElement({
        map: map,
        position: location,
        title: name,
    });
    const contentString = `
          <div>
            <h3>${name}</h3>
            <p><strong>Categories:</strong> ${category}</p>
            <p><strong>Rating:</strong> ${star}</p>
            <button onclick="addToFavorites('${name}')">Add to Favorites</button>
        </div>
    `;
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: name,
    });
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });
    markersList.push(marker);
}

function addToFavorites(name) {
    //import Restaurant from "./test";
    //var temp = Restaurant(name);
    favorites.push(name);
    alert(favorites.length + ", " + name + ", " + userName);
}

async function name(inputName) {
    userName = inputName;
    //alert("working, " + userName);
}

function clearMarkers() {
    for (var j = 0; j < markersList.length; j++) {
      markersList[j].map = null;
    }
}

initMap();