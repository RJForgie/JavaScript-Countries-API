var MapWrapper = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
  this.markers = []

}

MapWrapper.prototype.goTo = function (coords) {
  var position = {lat: 41.878114, lng: -87.629798}
  this.googleMap.setCenter(position)
}
