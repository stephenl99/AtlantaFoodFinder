// let map;
// let mark;
// async function initMap() {
//   const { Map } = await google.maps.importLibrary("maps");
//
//   const myLatLng = { lat: -25.363, lng: 131.044 };
//
//   map = new Map(document.getElementById("map"), {
//     center: { lat: 33.7488, lng: -84.3877 },
//     zoom: 12,
//   });
//   mark = new google.maps.importLibrary
// }
//
// initMap()



// Initialize and add the map
let map;

const coordinates = [[33.846334999999996,-84.36357779999999], [33.8428749,-84.3785385],
[33.896640500000004,-84.280918], [33.772758,-84.380375], [33.640879018,-84.4255140424],
[33.8551066087,-84.3133151086],
[33.7599229,-84.3864441], [33.827582299999996,-84.328604], [33.7826388,-84.41155069999999],
[33.788608261,-84.3690906035]];
async function initMap() {
  //Atlanta center position
  const position = { lat: 33.753746, lng:  -84.386330};
  const position2 = { lat: 33.000, lng:  -82.000};
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered in Atlanta
  map = new Map(document.getElementById("map"), {

    center: { lat: 33.7488, lng: -84.3877 },

    zoom: 8,
//     center: position,
    mapId: "DEMO_MAP_ID",
  });


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