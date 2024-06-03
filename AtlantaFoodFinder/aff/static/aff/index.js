let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 33.7488, lng: 84.3877 },
    zoom: 8,
  });
}

initMap()