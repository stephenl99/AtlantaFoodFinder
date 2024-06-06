let map;

const coordinates = [[33.846334999999996,-84.36357779999999], [33.8428749,-84.3785385],
[33.896640500000004,-84.280918], [33.772758,-84.380375], [33.640879018,-84.4255140424],
[33.8551066087,-84.3133151086],
[33.7599229,-84.3864441], [33.827582299999996,-84.328604], [33.7826388,-84.41155069999999],
[33.788608261,-84.3690906035]];
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 33.7488, lng: -84.3877 },
    zoom: 8,
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

initMap()