
let map
let infowindow
let resultPrint = ''
let RestaurantData =''
let CafeData = ''
let BarData = ''
let BakeryData = ''

const initMap =()=>{
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude
    lon = pos.coords.longitude

    let myLatlng = new google.maps.LatLng(lat, lon)

    let mapOptions = {
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
        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i])
          RestaurantData = results
         console.log(RestaurantData)
         ResultPrint(results[i])
        }
      }
    })
    service.nearbySearch(cafe, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i])
          CafeData = results
         console.log(CafeData)
         ResultPrint(results[i])
        }
      }
    })
    service.nearbySearch(bakery, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i])
          BakeryData = results
         console.log(BakeryData)
         ResultPrint(results[i])
        }
      }
    })
    service.nearbySearch(bar, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i])
          BarData = results
         console.log(BarData)
         ResultPrint(results[i])
        }
      }
    })

  })
}
const crearMarcador =(place)=> {
  // Creamos un marcador
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  })

  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name)
    infowindow.open(map, this)
  })
}
ResultPrint = (getprint) => {
  resultPrint += `
  <div class="card">
<div class="card-header">
<h4>${getprint.name}</h4>
  </div>
  <div class="card-body">
    <h5 class="card-title"> Puntaje: </h5>
    <p class="card-text">
     ${getprint.rating}
    </p>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
     Mas detalles ...
    </button>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">${getprint.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      Dirección: ${getprint.vicinity},
      Puntaje: ${getprint.rating}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
    </div>
  </div>
</div>`
dataRestaurant.innerHTML= resultPrint
}
