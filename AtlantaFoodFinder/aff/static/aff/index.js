// Initialize and add the map
let map;
markersList = [];
let currentInfowindow = null;
let favorites = [];
let userLat = 0.0;
let userLong = 0.0;
let userName = "temp";


let latitudes;
let longitudes;
let names;
let categories;
let stars;
let addresses;
let attributes;
let business_ids;
let length;
let keywordFilter = '';
let cuisineFilter = '';
let ratingFilter = '';
let radiusFilter = '';

let isGeneralListenersAdded = false;
let isCuisineListenersAdded = false;
let isRatingsListenersAdded = false;
let isRadiusListenersAdded = false;
//let length = names.split('\n').length;
async function initMap() {
    let lats = await fetch('aff/../static/latitude.txt');
    latitudes = await lats.text();
    let longs = await fetch('aff/../static/longitude.txt');
    longitudes = await longs.text();
    let n = await fetch('aff/../static/name.txt');
    names = await n.text();
    let cats = await fetch('aff/../static/categories.txt');
    categories = await cats.text();
    let r = await fetch('aff/../static/stars.txt');
    stars = await r.text();
    let a = await fetch('aff/../static/address.txt');
    addresses = await a.text();
    let at = await fetch('aff/../static/attributes.txt');
    attributes = await at.text();
    let bid = await fetch('aff/../static/business_id.txt');
    business_ids = await bid.text();
    // length = names.split('\n').length;
    length = 1000;

    let {Map} = await google.maps.importLibrary("maps");

    // The map, centered in Atlanta
    map = new Map(document.getElementById("map"), {
        zoom: 11,
        center: {lat: 33.7488, lng: -84.3877},
        mapId: "DEMO_MAP_ID",
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Browser does not support geolocation.");
    }

  await getRestaurantGeneral();
  await getRestaurantCuisine();
  setupRatingFilters();
  await getRestaurantRadius();
  await choiceCuisine("empty");
  await clearMarkers();
}

async function showPosition(position) {
    let {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    let location = {lat: userLat, lng: userLong};
    let pinChanges = new PinElement({
        background: "#4cbbd3",
        borderColor: "#FFFFFF",
        glyphColor: "#FFFFFF",
  });
    let marker = new AdvancedMarkerElement({
        map: map,
        position: location,
        content: pinChanges.element,
        title: "Your Location",
    });
}
function getFilters() {
    getRestaurantGeneral();
    getRestaurantCuisine();
    getRestaurantRadius();
}

async function applyFilters() {
    clearMarkers();
    for (let i = 0; i < length; i++) {
        let actName = names.split('\n')[i].toUpperCase();
        let category = categories.split('\n')[i].toUpperCase();
        let address = addresses.split('\n')[i].toUpperCase();
        let star = stars.split('\n')[i];
        let lat = latitudes.split('\n')[i];
        let long = longitudes.split('\n')[i];

        // Check if both filters match
        let keywordMatch = keywordFilter === '' || actName.includes(keywordFilter) || category.includes(keywordFilter) || address.includes(keywordFilter);
        let cuisineMatch = cuisineFilter === '' || category.includes(cuisineFilter);
        let ratingMatch = ratingFilter === '' || (parseFloat(star) >= parseFloat(ratingFilter) && parseFloat(star) < (parseFloat(ratingFilter) + 1));
        let radiusMatch = radiusFilter === '' || getDistanceFromLatLonInKm(userLat, userLong, lat, long) <= parseFloat(radiusFilter);

        if (keywordMatch && cuisineMatch && ratingMatch && radiusMatch) {
            let business_id = business_ids.split('\n')[i];
            makeMarker(lat, long, actName, category, star, business_id, address, i);
        }
    }
}

async function getRestaurantGeneral() {
  let input = document.getElementById("restaurantSearch");
  let button = document.getElementById("restaurantButton")
  keywordFilter = input.value.toUpperCase();
  if(!isGeneralListenersAdded) {
      input.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
              event.preventDefault();
              getFilters();
              applyFilters();
          }
      });
      button.addEventListener("click", () => {
          keywordFilter = input.value.toUpperCase();
          getFilters();
          applyFilters();
      });
      isGeneralListenersAdded = true;
  }
}
async function getRestaurantGeneralHelper() {
    clearMarkers();
    for (let i = 0; i < length; i++) {
        let actName = names.split('\n')[i].toUpperCase();
        let category = categories.split('\n')[i].toUpperCase();
        let address = addresses.split('\n')[i].toUpperCase();
        let description = attributes.split('\n')[i];
      if (actName === filter || actName.includes(filter) || category.includes(filter) || address.includes(filter)) {
          let lat = latitudes.split('\n')[i]
          let long = longitudes.split('\n')[i]
          let star = stars.split('\n')[i]
          let business_id = business_ids.split('\n')[i]
          makeMarker(lat, long, actName, category, star, business_id, address, i);
      }
    }
}
async function display_list() {
    var list = document.getElementById("cuisine_id");
    if (list.style.display === "block") {
        list.style.display = "none"
    } else {
        list.style.display = "block";
    }
}

async function choiceCuisine(name) {
    clearMarkers();
    for (let i = 0; i < length; i++) {
        if (categories.split('\n')[i].toUpperCase().includes(name.toUpperCase())) {
            let lat = latitudes.split('\n')[i];
            let long = longitudes.split('\n')[i];
            await makeMarker(lat, long, names.split('\n')[i], categories.split('\n')[i], stars.split('\n')[i], business_ids.split('\n')[i], addresses.split('\n')[i], i);
        }
    }
}

async function getRestaurantCuisine() {
  let input = document.getElementById("restaurantCuisine");
  let button= document.getElementById("cuisineButton");
  cuisineFilter = input.value.toUpperCase();
  if(!isCuisineListenersAdded) {
      input.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
              event.preventDefault();
              getFilters();
              applyFilters();
          }
      });
      button.addEventListener("click", () => {
          cuisineFilter = input.value.toUpperCase();
          getFilters();
          applyFilters();
      });
      isCuisineListenersAdded = true;
  }
}

async function getRestaurantCuisineHelper() {
    clearMarkers();
    for (let i = 0; i < length; i++) {
        let actName = names.split('\n')[i].toUpperCase();
        let category = categories.split('\n')[i].toUpperCase();
        let address = addresses.split('\n')[i].toUpperCase();
        let description = attributes.split('\n')[i];
      if (category.includes(filter)) {
          let lat = latitudes.split('\n')[i]
          let long = longitudes.split('\n')[i]
          let star = stars.split('\n')[i]
          let business_id = business_ids.split('\n')[i]
          makeMarker(lat, long, actName, category, star, business_id, address, i);
      }
    }
}
async function setupRatingFilters() {
    let ratingButtons = document.querySelectorAll("[id^='restaurantStar']");
    if(!isRatingsListenersAdded) {
        ratingButtons.forEach(button => {
            button.addEventListener("click", function () {
                ratingFilter = button.value;
                getFilters();
                applyFilters();
            });
        });
        isRatingsListenersAdded = true;
    }
}
/*
async function getRestaurantRating5() {
    let input = document.getElementById("restaurantStar5");
    ratingFilter = input.value;
  input.addEventListener("click", applyFilters);
}
async function getRestaurantRating4() {
    let input = document.getElementById("restaurantStar4");
    ratingFilter = input.value;
  input.addEventListener("click", applyFilters);
}
async function getRestaurantRating3() {
    let input = document.getElementById("restaurantStar3");
    ratingFilter = input.value;
  input.addEventListener("click", applyFilters);
}async function getRestaurantRating2() {
    let input = document.getElementById("restaurantStar2");
    ratingFilter = input.value;
  input.addEventListener("click", applyFilters);
}
async function getRestaurantRating1() {
    let input = document.getElementById("restaurantStar1");
    ratingFilter = input.value;
  input.addEventListener("click", applyFilters);
}
*/
async function getRestaurantRatingHelper() {
    clearMarkers();
    for (let i = 0; i < length; i++) {
        let actName = names.split('\n')[i].toUpperCase();
        let category = categories.split('\n')[i].toUpperCase();
        let address = addresses.split('\n')[i].toUpperCase();
        let star = stars.split('\n')[i];
        if (parseFloat(star) - parseFloat(filter) >= 0 && parseFloat(star) - parseFloat(filter) < 1) {
          let lat = latitudes.split('\n')[i];
          let long = longitudes.split('\n')[i];
          let star = stars.split('\n')[i];
          let business_id = business_ids.split('\n')[i];
          await makeMarker(lat, long, actName, category, star, business_id, address, i);
      }
    }
}
async function getRestaurantRadius() {
    let input = document.getElementById("restaurantRadius");
  let button= document.getElementById("radiusButton");
  radiusFilter = input.value.toUpperCase();
  if(!isRadiusListenersAdded) {
      input.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
              event.preventDefault();
              getFilters();
              applyFilters();
          }
      });
      button.addEventListener("click", () => {
          radiusFilter = input.value.toUpperCase();
          getFilters();
          applyFilters();
      });
      isRadiusListenersAdded = true;
  }
}
async function getRestaurantRadiusHelper() {
    clearMarkers();
    for (let i = 0; i < length; i++) {
        let lat = latitudes.split('\n')[i];
        let long = longitudes.split('\n')[i];
      if (getDistanceFromLatLonInKm(userLat, userLong, lat, long) <= parseFloat(filter)) {
          let actName = names.split('\n')[i].toUpperCase();
          let category = categories.split('\n')[i].toUpperCase();
          let address = addresses.split('\n')[i].toUpperCase();
          let star = stars.split('\n')[i];
          let business_id = business_ids.split('\n')[i];
          await makeMarker(lat, long, actName, category, star, business_id, address, i);
      }
    }
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

async function makeMarker(lat, long, name, category, star, business_id, address, index) {
    let newName = name.replaceAll("'", "`");
    let newCategory = category.replaceAll("'", "`");
    let newAddress = address.replaceAll("'", "`");
    let newBusiness_id = "https://www.yelp.com/biz/" + business_id;
    let leaveReview = "https://www.yelp.com/writeareview/biz/" + business_id + "?return_url=%2Fbiz%2F" + business_id + "&review_origin=biz-details-war-button";
    //alert(newBusiness_id);
    let {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
    let location = {lat: parseFloat(lat), lng: parseFloat(long)};
    let marker = new AdvancedMarkerElement({
        map: map,
        position: location,
        title: newName,
    });
    let contentString = `
<style>
        /* Custom styles for the info window content */
        .info-window-content {
            font-family: Roboto;
            font-size: 14px;
            padding: 10px;
        }
        .info-window-content h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        .info-window-content p {
            margin: 5px 0;
            line-height: 1.5;
        }
        .info-window-content a {
            /* color: #007BFF; */
            color: #89824c;
            text-decoration: none;
        }
        .info-window-content a:hover {
            text-decoration: underline;
        }
        .info-window-content button {
            background-color: #ffeda9;
            color: black;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 8px;
        }
        .info-window-content button:hover {
            background-color: #b5835a;
        }
    </style>
        <div class="info-window-content">
            <h3>${newName}</h3>
            <p><strong>Categories:</strong> ${newCategory}</p>
            <p><strong>Rating:</strong> ${star}</p>
            <p><strong>Address:</strong> ${newAddress}</p>
            <!--<p><strong>Business ID:</strong> ${business_id}</p> -->
            <p><a href="${leaveReview}" target = "_blank">Leave a review on Yelp</a></p>
            <form method="get" action=${"'processMapView/'"}>
                <input type="hidden" name="name" value=${index} required>
                <button type="submit">Add to favorites</button>
            </form>
            <form method="get" action=${"'removeMapView/'"}>
                <input type="hidden" name="name" value=${index} required>
                <button type="submit">Remove from favorites</button>
            </form>
        </div>
    `;
    let infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: name,
    });
    marker.addListener("click", () => {
        if (currentInfowindow) {
            currentInfowindow.close();
        }

        infowindow.open({
            anchor: marker,
            map,
        });

        currentInfowindow = infowindow;
    });
    markersList.push(marker);
}
function addToFavorites(name) {
    //let fs = require('fs');
    //fs.writeFile('userFavoritesList.txt', "hello", err => {
      //  if (err) throw err;
    //});
    favorites.push(name);
    alert(favorites.length + ", " + name + ", " + userName);
}

async function name(inputName, fav) {
    userName = inputName;
    favorites = fav;
    //alert(userName + ", " + favorites);
}

async function favorite() {
    const input = document.getElementById('favorites');
    filter = input.value;
    alert(filter);
    input.addEventListener("click", showFavorites);
}

async function showFavorites() {
    //clearMarkers();
    let needs = true
    let htmlList = document.getElementById("restaurantList")
    if (htmlList.innerHTML !== "") {
        needs = false
    }
    htmlList.innerHTML = "";
    if (favorites.length === 0) {
        alert("You have no favorites yet")
    }
    for (let j = 0; j < favorites.length; j++) {
        const s = favorites[j];
        //alert("working, " + s);
        if (s >= 0 && s <= length) {
            let actName = names.split('\n')[s].toUpperCase();
            let realName = names.split('\n')[s];
            let category = categories.split('\n')[s].toUpperCase();
            let realCategory = categories.split('\n')[s]
            let lat = latitudes.split('\n')[s];
            let long = longitudes.split('\n')[s];
            let star = stars.split('\n')[s];
            let business_id = business_ids.split('\n')[s];
            let index = s;
            let address = addresses.split('\n')[s];
            let newName = actName.replaceAll("'", "");
            let newCategory = category.replaceAll(",", "");
            let newAddress = address.toUpperCase().replaceAll(",", "");
            let newBusiness_id = "https://www.yelp.com/biz/" + business_id;
            if (needs === true) {
                let item = document.createElement('li')
                item.innerHTML = `
                   <div style="font-family: Roboto">
                    <h3>${realName}</h3>
                    <p><strong>Categories:</strong> ${realCategory}</p>
                    <p><strong>Rating:</strong> ${star}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><a href="${newBusiness_id}" target="_blank">View on Yelp</a></p>
                   </div>
                    `;
                htmlList.appendChild(item)
            }
            //makeMarker(parseFloat(lat), parseFloat(long), actName, category, star, business_id, address, s);
        }
    }
}

function clearMarkers() {
    for (let j = 0; j < markersList.length; j++) {
      markersList[j].map = null;
    }
    markersList = [];
}
// attached to clear markers button
function clearMarkersAndFilters() {
    for (let j = 0; j < markersList.length; j++) {
        markersList[j].map = null;
    }
    markersList = [];
    keywordFilter = '';
    cuisineFilter = '';
    ratingFilter = '';
    radiusFilter = '';
}

initMap();