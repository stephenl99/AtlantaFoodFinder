


// Initialize and add the map
let map;

async function initMap() {


  const lats = await fetch('./latitude.txt');
  const latitudes = await lats.text();
  const longs = await fetch('./longitude.txt');
  const longitudes = await longs.text();
  const first = longitudes.split('\n')[0]
  const l = parseFloat(first)


  const position = { lat: l, lng: -84};

  const position3 = { lat: 33.753746, lng:  -84.386330};
  const position2 = { lat: 33.000, lng:  -82.000};
  // fetch('/Users/stephenlinder/Desktop/DjangoProjects/CS2340Project/longitude.txt')
  // .then(response => response.text())
  // .then(text => console.log(text))
  // // Request needed libraries.
  // //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered in Atlanta
  map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: position,
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
}

initMap();