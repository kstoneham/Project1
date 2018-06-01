// FUNCTIONS
//-----------------------------------------------------
// WEATHER AJAX CALL
var lat, lng, citySearch, zipCode, cityBox, weatherBox, temperature, condition, wind;


$(function () {


  function weather() {
    var citySearch = $("#search-bar").val().trim();
    // Query URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch + "&appid=a65d8d10d8d0113809dcb571fe23ebb8";
    // AJAX CALL

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var tempConverted = ((response.main.temp - 273.15) * 1.80 + 32);
        var temperature = tempConverted.toFixed(1);
        var condition = response.weather[0].description;
        var wind = response.wind.speed;
        // POST WEATHER TO HTML
        var cityBox = `
        <div>
          <h2>Weather Conditions</h2>
          <hr style='border-color: rgb(243, 242, 223);'/>
          <p style='text-align: center;'>Temp: ${temperature} \xB0F</p>
          <p style='text-align: center;'>Precipitation: ${condition} </p>
          <p style='text-align: center;'>Wind Speed:${wind} mph</p>
          <hr style='border-color: rgb(243, 242, 223);'/>
          <div id='places-map'>
            <iframe id='mapSmall'
              width="550"
              height="350"
              frameborder="0" style="border:0"
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBU8WngwG699p-gzKCP_VezmXkXqZ64ovc&q=restaurant+patio+in+${citySearch}" allowfullscreen>
            </iframe>
          </div>
        </div>
        `
        $("#weather").empty().append(cityBox);
      })
  }
  // WEATHER AJAX CALL BY ZIP
  function weatherZIP() {

    var zipCode = $("#search-zip").val().trim();
    // ZIP CODE API
    var APIKEY = "3BHfNoGVJZtKdX7h9rLzIr9OfCcEnusmDgQYoWIeUKJqnvKjAbYHrcsHtg7n5APZ";
    var queryURL = "https://cors-everywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + APIKEY + "/info.json/" + zipCode + "/degrees";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var city = response.city;
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
          city + "&appid=a65d8d10d8d0113809dcb571fe23ebb8";
        // AJAX CALL
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function (response) {
            var tempConverted = ((response.main.temp - 273.15) * 1.80 + 32);
            var temperature = tempConverted.toFixed(1);
            var condition = response.weather[0].description;
            var wind = response.wind.speed;
            // POST WEATHER TO HTML

            var weatherBox = `
            <div>
              <h2>Weather Conditions</h2>
              <hr style='border-color: rgb(243, 242, 223);'/>
              <p style='text-align: center;'>Temp: ${temperature} \xB0F</p>
              <p style='text-align: center;'>Precipitation: ${condition} </p>
              <p style='text-align: center;'>Wind Speed:${wind} mph</p>
              <hr style='border-color: rgb(243, 242, 223);'/>
              <div id='places-map'>
                <iframe id='mapSmall'
                  width="550"
                  height="350"
                  frameborder="0" style="border:0"
                  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBU8WngwG699p-gzKCP_VezmXkXqZ64ovc&q=restaurant+patio+in+${zipCode}" allowfullscreen>
                </iframe>
              </div>
            </div>
          `
            $("#weather").empty().append(weatherBox);

          })

      })
  }

  // MAPS AJAX CALLS BY CITY, THEN PLACES SEARCH CALL
  function restaurants() {
    var citySearch = $("#search-bar").val().trim();
    $("#display").append("<h2 style='text-align: center;'>" +
      "You Searched: " + citySearch +
      "</h2>");
    var APIKEY = "&key=AIzaSyBU8WngwG699p-gzKCP_VezmXkXqZ64ovc";
    // QUERY URL FOR CONVERTING CITY SEARCH TO LAT/LNG COORDINATES
    var queryURL = "https://cors-everywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=" + citySearch + APIKEY;
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        // DEFINE SEARCH TERMS
        lat = response.results[0].geometry.location.lat;
        lng = response.results[0].geometry.location.lng;
        // SEARCH BASED ON LOCATION, RADIUS, TYPE, KEYWORD
        var location = "location=" + lat + ", " + lng + "&radius=17000&rankby=prominence&type=restaurant&keyword=patio";
        // QUERY URL FORMULA
        var queryURL2 = "https://cors-everywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + location + APIKEY;
        $.ajax({
            url: queryURL2,
            method: "GET"
          })
          .then(function (rest) {
            $("#restaurants").append("<h2>Restaurants within 10 miles</h2>" + "<hr style='border-color: rgb(243, 242, 223);'>");
            for (i = 0; i < rest.results.length; i++) {
              var patioResults = rest.results[i].name;
              var patioAddress = rest.results[i].vicinity;
              var patioRating = rest.results[i].rating;
              $("#restaurants").append("<p style='text-align: center;'>" + patioResults + " - " + patioRating + "/5" + "</p>");
              $("#restaurants").append("<p style='text-align: center; line-height: 0.1em;'>" + "\xB0" + "</p>")
              $("#restaurants").append("<p style='text-align: center;'>" + patioAddress + "</p>");
              $("#restaurants").append("<hr style='border-color: rgb(243, 242, 223);'>");
            }
          })
      })
  }
  // ZIP CODE AJAX CALL, THEN GOOGLE PLACES SEARCH CALL
  function restaurantsZIP() {
    var zipCode = $("#search-zip").val().trim();
    $("#display").append("<h2 style='text-align: center;'>" +
      "You Searched: " + zipCode +
      "</h2>");
    // ZIP CODE API
    var APIKEY = "3BHfNoGVJZtKdX7h9rLzIr9OfCcEnusmDgQYoWIeUKJqnvKjAbYHrcsHtg7n5APZ";
    var queryURL = "https://cors-everywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + APIKEY + "/info.json/" + zipCode + "/degrees";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var APIKEY2 = "&key=AIzaSyBU8WngwG699p-gzKCP_VezmXkXqZ64ovc";
        var lat = response.lat;
        var lng = response.lng;
        var location = "location=" + lat + ", " + lng + "&radius=17000&rankby=prominence&type=restaurant&keyword=patio";
        var queryURL2 = "https://cors-everywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + location + APIKEY2;
        $.ajax({
            url: queryURL2,
            method: "GET"
          })
          .then(function (rest) {
            $("#restaurants").append("<h2>Restaurants within 10 miles</h2>" + "<hr style='border-color: rgb(243, 242, 223);'>");
            for (i = 0; i < rest.results.length; i++) {
              var patioResults = rest.results[i].name;
              var patioAddress = rest.results[i].vicinity;
              var patioRating = rest.results[i].rating;
              $("#restaurants").append("<p style='text-align: center;'>" + patioResults + " - " + patioRating + "/5" + "</p>");
              $("#restaurants").append("<p style='text-align: center; line-height: 0.1em;'>" + "\xB0" + "</p>")
              $("#restaurants").append("<p style='text-align: center;'>" + patioAddress + "</p>");
              $("#restaurants").append("<hr style='border-color: rgb(243, 242, 223);'>");
            }
          })
      })
  }
  //-----------------------------------------------------
  // MAIN PROCESS
  //-----------------------------------------------------
  // PREVENTS PAGE REFRESH ON HITTING ENTER IN SEARCH BAR
  $("#myForm").submit(function (event) {
    event.preventDefault();
    var checkBlank = $("#search-bar").val().trim();
    $("#display").empty("");
    if (checkBlank === "") {

      restaurantsZIP();
      $("#restaurants").empty();
      $("#weather").empty();
    } else {
      weather();
      restaurants();
      $("#restaurants").empty();
      $("#weather").empty();
    }
    $("#search-zip").val("");
    $("#search-bar").val("");
  })
  // SEARCH BUTTON 
  $("#search-btn").click(function (event) {
    event.preventDefault();
    var checkBlank = $("#search-bar").val().trim();
    $("#display").empty("");
    if (checkBlank === "") {
      restaurantsZIP();
      weatherZIP();

      $("#restaurants").empty();
      $("#weather").empty();
    } else {
      restaurants();
      weather();

    }
    $("#search-zip").val("");
    $("#search-bar").val("");
  })
})