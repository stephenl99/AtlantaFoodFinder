// Initialize and add the map
let map;

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
  //const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const firstLat = latitudes.split('\n')[0]
  const l = parseFloat(firstLat)
  const firstLong = longitudes.split('\n')[0]
  const long = parseFloat(firstLong)

  const position = { lat: l, lng: long};

  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered in Atlanta
  map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  placeMarkers(1, latitudes, longitudes);
  getRestaurant(names, latitudes, longitudes, categories, stars);
  //Info block stuff
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";
}

async function placeMarkers(number, latitudes, longitudes) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  for (var i = 0; i < number; i++) {
    const lat = latitudes.split('\n')[i]
    const long = longitudes.split('\n')[i]
    const positionVariable = {lat: parseFloat(lat), lng: parseFloat(long)}
    const marker = new AdvancedMarkerElement({
      map: map,
      position: positionVariable,
      title: "Some restaurant",
    });
  }
}

async function getRestaurant(names, latitudes, longitudes, categories, stars) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  var input = document.getElementById('restaurant');
  filter = input.value.toUpperCase();
  input.addEventListener("dblclick", function(event) {
    for (var i = 0; i < 50; i++) {
      var actName = names.split('\n')[i].toUpperCase();
      if (actName == filter) {
        alert("found");
        const lat = latitudes.split('\n')[i]
        const long = longitudes.split('\n')[i]
        const star = stars.split('\n')[i]
        const location = {lat: parseFloat(lat), lng: parseFloat(long)};
        const property = {
          type: "store-alt",
          address: "some address, Atlanta, GA",
          description: "ex: cozy coffee shop ",
          name: actName,
          cuisine: "cuisine of restaurant",
          rating: star,
        }
        const marker = new AdvancedMarkerElement({
          map: map,
          position: location,
          title: actName,
          //content: buildContent(property),
        });
        i = 50;
      }
    }
    alert("not found");
  });
}

  function buildContent(property) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML =
    '<div class="icon">' +
        '<i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>' +
        '<span class="fa-sr-only">${property.type}</span>' +
    '</div>' +
    '<div class="details">' +
        '<div class="name">{property.name}</div>' +
        '<div class="address">${property.address}</div>' +
        '<div class="features">' +
        '<div>' +
            '<i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>' +
            '<span class="fa-sr-only">bedroom</span>' +
            '<span>${property.rating}</span>' +
        '</div>' +
        '</div>' +
    '</div>';
  return content;
}

function toggleHighlight(markerView, property) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

initMap();