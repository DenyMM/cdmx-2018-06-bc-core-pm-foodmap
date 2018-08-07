/*function initMap() {
 // Creamos un objeto mapa y especificamos el elemento DOM donde se va a mostrar.
 var map = new google.maps.Map(document.getElementById('mapa'), {
 center: {lat: 43.2686751, lng: -2.9340005},
 scrollwheel: false,
 zoom: 8,
 zoomControl: true,
 rotateControl : false,
 mapTypeControl: true,
 streetViewControl: false,
 });
 // Creamos el marcador
 var marker = new google.maps.Marker({
 position: {lat: 43.2686751, lng: -2.9340005},
 draggable: true
 });
 // Le asignamos el mapa a los marcadores.
 marker.setMap(map);
 // creamos el objeto geodecoder
 var geocoder = new google.maps.Geocoder();
// le asignamos una funcion al eventos dragend del marcado
 google.maps.event.addListener(marker, 'dragend', function() {
 geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
 if (status == google.maps.GeocoderStatus.OK) {
 var address=results[0]['formatted_address'];
 alert(address);
 }
 });
});
}
*/
let map
let infowindow

function initMap () {
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude
    lon = pos.coords.longitude

    var myLatlng = new google.maps.LatLng(lat, lon)

    var mapOptions = {
      center: myLatlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.MAPA
    }

    map = new google.maps.Map(document.getElementById('mapa'), mapOptions)

    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow()
    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    let restaurant = {
      location: myLatlng,
      radius: 2500,
      types: ['restaurant']
    }
    let cafe = {
      location: myLatlng,
      radius: 2500,
      types: ['cafe']
    }
    let bakery = {
      location: myLatlng,
      radius: 2500,
      types: ['bakery']
    }
    let bar = {
      location: myLatlng,
      radius: 2500,
      types: ['bar']
    }
    // Creamos el servicio PlaceService y enviamos la petición.
    let service = new google.maps.places.PlacesService(map)

    service.nearbySearch(restaurant, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i])
        }
      }
    })
    service.nearbySearch(cafe, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i])
        }
      }
    })
    service.nearbySearch(bakery, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i])
        }
      }
    })
    service.nearbySearch(bar, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i])
        }
      }
    })

  })
}
function crearMarcador (place) {
  // Creamos un marcador
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  })

  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name)
    infowindow.open(map, this)
  })
}
var input = document.getElementById('pac-input');

var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds', map);

map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

/*function initMap() {
       var map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -99.166953, lng: 19.402908},
         zoom: 13
       });

       var input = document.getElementById('pac-input');

       var autocomplete = new google.maps.places.Autocomplete(input);
       autocomplete.bindTo('bounds', map);

       map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

       var infowindow = new google.maps.InfoWindow();
       var infowindowContent = document.getElementById('infowindow-content');
       infowindow.setContent(infowindowContent);
       var marker = new google.maps.Marker({
         map: map
       });
       marker.addListener('click', function() {
         infowindow.open(map, marker);
       });

       autocomplete.addListener('place_changed', function() {
         infowindow.close();
         var place = autocomplete.getPlace();
         if (!place.geometry) {
           return;
         }

         if (place.geometry.viewport) {
           map.fitBounds(place.geometry.viewport);
         } else {
           map.setCenter(place.geometry.location);
           map.setZoom(17);
         }

         // Set the position of the marker using the place ID and location.
         marker.setPlace({
           placeId: place.place_id,
           location: place.geometry.location
         });
         marker.setVisible(true);

         infowindowContent.children['place-name'].textContent = place.name;
         infowindowContent.children['place-id'].textContent = place.place_id;
         infowindowContent.children['place-address'].textContent =
             place.formatted_address;
         infowindow.open(map, marker);
       });
     }
*/

  const initialize = () => {
    console.log("holi");
  }
