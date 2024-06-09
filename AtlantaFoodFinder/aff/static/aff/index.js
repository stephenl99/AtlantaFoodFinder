
// Initialize and add the map
let map;

const coordinates = [[33.846334999999996,-84.36357779999999], [33.8428749,-84.3785385],
[33.896640500000004,-84.280918], [33.772758,-84.380375], [33.640879018,-84.4255140424],
[33.8551066087,-84.3133151086],
[33.7599229,-84.3864441], [33.827582299999996,-84.328604], [33.7826388,-84.41155069999999],
[33.788608261,-84.3690906035]];
async function initMap() {


  const lats = await fetch('aff/../static/latitude.txt');
  const latitudes = await lats.text();
  const longs = await fetch('aff/../static/longitude.txt');
  const longitudes = await longs.text();
  const firstLat = latitudes.split('\n')[0]
  const l = parseFloat(firstLat)
  const firstLong = longitudes.split('\n')[0]
  const long = parseFloat(firstLong)



  const position = { lat: l, lng: long};

  const position3 = { lat: 33.753746, lng:  -84.386330};
  const position2 = { lat: l, lng:  long};

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered in Atlanta
  map = new Map(document.getElementById("map"), {

    center: { lat: 33.7488, lng: -84.3877 },

    zoom: 8,
//     center: position,
    mapId: "DEMO_MAP_ID",
  });

  for (var i = 0; i < 15; i++) {
    const lat = latitudes.split('\n')[i]
    const long = longitudes.split('\n')[i]
    const positionVariable = {lat: parseFloat(lat), lng: parseFloat(long)}
    const property = {
      type: "store-alt",
      address: "some address, Atlanta, GA",
      description: "ex: cozy coffee shop ",
      name: " restaurant name ",
      cuisine: "cuisine of restaurant",
      rating: 5,
    }
    const marker = new AdvancedMarkerElement({
    map: map,
    position: positionVariable,
      content: buildContent(property),
    title: "Some restaurant",
    });
    marker.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, property);
    });
  }
  function buildContent(property) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
        <span class="fa-sr-only">${property.type}</span>
    </div>
    <div class="details">
        <div class="name">${property.name}</div>
        <div class="address">${property.address}</div>
        <div class="features">
        <div>
            <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
            <span class="fa-sr-only">bedroom</span>
            <span>${property.rating}</span>
        </div>
        </div>
    </div>
    `;
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
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Hooray this works",
  });



  // The marker, on a random restaurant
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Some restaurant",
  });
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });

  //marker2, to show multiple markers
  // The marker, on a random restaurant
  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: position2,
    title: "A different restaurant",
  });
  marker2.addListener("click", () => {
    infowindow.open({
      anchor: marker2,
      map,
    });
  });

  var Atlanta = {
    location: new google.maps.LatLng(33.7488, -84.3877),
    radius: '10000',
    type: ['restaurant']
  };

  showRestaurants()

  window.initMap = initMap;
}

function getData() {
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('db.sqlite', sqlite3.OPEN_READWRITE);
  let sql = 'SELECT latitude, longitude';
  db.get(sql, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row;
  });
}

function showRestaurants() {
  for (var i = 0; i < 9; i++) {
    var x = coordinates[i][0];
    var y = coordinates[i][1];
    new google.maps.Marker({
      map: map,
      position: {lat: x, lng: y},
      title: 'test'
    });
  }
  //list = getData();
  //list.forEach((row) => {
    //new google.maps.Marker({
      //  map: map,
        //position: {lat: row.latitude, lng: row.longitude},
        //title: 'test'
    //});
  //})
}

initMap();
