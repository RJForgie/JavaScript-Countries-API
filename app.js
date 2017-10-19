var url = "https://restcountries.eu/rest/v2/all"

var makeRequest = function( url ) {
  var request = new XMLHttpRequest()
  request.open( "GET", url );
  request.addEventListener( "load", function() {
    var countries = JSON.parse( this.responseText )
    var countryToRestore = restore()
    addCountriesToList(countries, countryToRestore)
    var select = document.getElementById("selectCountry")

    console.log(countryToRestore)
    reloadBorders(countries, countryToRestore)
  })
  request.send()
}

var render = function(country){
  var countryName = document.getElementById("countryName")
  countryName.innerText = "Name: " + country.name
  var countryPop = document.getElementById("countryPop")
  countryPop.innerText = "Population: " + country.population
  var countryCapital = document.getElementById("countryCapital")
  countryCapital.innerText = "Capital: " + country.capital
}

var addCountriesToList = function( countries, countryToRestore ) {
  var select = document.getElementById("selectCountry")
  countries.forEach( function(country, index) {
    var option = document.createElement("option")
    if (country.name === countryToRestore.name) option.selected = true
    option.innerText = country.name
    option.value = index
    select.appendChild(option)
  })

  select.addEventListener("change", function () {
  var div = document.getElementById('bordering')
  div.innerHTML = " "
    var borders = []
    var country = countries[this.value]
    save(country)
    render(country)
    renderMap(country)

      for (alphaCode of country.borders) {
        for (country of countries) {
          if (country.alpha3Code === alphaCode) {
              borders.push(country)
          }
        }
      }
      for (bordering of borders) {
        renderBordering(bordering)
      }
  })
}

var restore = function () {
  var jsonString = localStorage.getItem("country")
  var savedCountry = JSON.parse(jsonString)

  return savedCountry
}

var save = function (country) {
  var jsonString = JSON.stringify(country)
  localStorage.setItem("country", jsonString)
}

var renderBordering = function(country){
  var ul = document.createElement("ul")
  var countryNameLi = document.createElement("li")
  countryNameLi.innerText = "Name: " + country.name
  ul.appendChild(countryNameLi)
  var countryPopLi = document.createElement("li")
  countryPopLi.innerText = "Population: " + country.population
  ul.appendChild(countryPopLi)
  var countryCapitalLi = document.createElement("li")
  countryCapitalLi.innerText = "Capital: " + country.capital
  ul.appendChild(countryCapitalLi)
  var div = document.getElementById('bordering')
  div.appendChild(ul)

}

makeRequest( url )

var renderMap = function (country) {
  var mapDiv= document.getElementById('main-map')
  var center = {lat: country.latlng[0], lng: country.latlng[1]}
  var mainMap = new MapWrapper(mapDiv, center, 10)
}

var reloadBorders = function (countries, country) {
  var div = document.getElementById('bordering')
  div.innerHTML = " "
  var borders = []
  console.log(country)
  for (alphaCode of country.borders) {
    for (country of countries) {
      if (country.alpha3Code === alphaCode) {
          borders.push(country)
      }
    }
  }
  for (bordering of borders) {
    renderBordering(bordering)
  }
}

// var returnIndexOfCountry = function (countries, country) {
//   countries.forEach( function(each, index) {
//     if (each.name === country.name)
//     return index
//   })
//
// }

window.addEventListener("load", function() {

  var countryToRestore = restore()
  render(countryToRestore)
  renderMap(countryToRestore)
  // reloadBorders(countryToRestore)
  // var select = document.getElementById("selectCountry")
  // select.value = countryToRestore.name
  // var center = {lat: 55.9441, lng: -3.1618}
  // var mapDiv= document.getElementById('main-map')
  // // var center = {lat: country.latlang[0], lng: country.latlang[1]}
  // var mainMap = new MapWrapper(mapDiv, center, 10)
  // mainMap.addMarker(center)
})




// var handleSelectChange = function () {
//   var country = countries[this.value]
//   save(country)
//   var countryName = document.getElementById("countryName")
//   countryName.innerText = "Name: " + country.name
//   var countryPop = document.getElementById("countryPop")
//   countryPop.innerText = "Population: " + country.population
//   var countryCapital = document.getElementById("countryCapital")
//   countryCapital.innerText = "Capital: " + country.capital
// }

// var handleSelectChange = function () {
//   console.log(countries);
//   var countryName = document.getElementById("countryName")
//   console.log(this)
//   countryName.innerText = (this.name)
// }

// var button = document.getElementById("btn")
// button.addEventListener("click", function () {
//   makeRequest( url )
// })

// var buttonClear = document.getElementById("clear")
// buttonClear.addEventListener("click", function () {
//   var ul = document.getElementById("countries")
//   ul.innerHTML = " "
// })
