let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new Map(document.getElementById("map"), {
    center: { lat: 33.7488, lng: -84.3877 },
    zoom: 8,
  });

  new google.maps.Marker({
    map: map,
    position: {lat: 33, lng: -84},
    title: 'test'
  });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['restaurant']
  };

  var request2 = {
    location: new google.maps.LatLng(33.7488, -84.3877),
    radius: '10000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  window.initMap = initMap;
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  new google.maps.Marker({
    map: map,
    position: {lat: place.lat, lng: place.lng},
    title: 'test'
  });
}

initMap()