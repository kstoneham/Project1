// WEATHER AJAX CALL
function weather() {
    var citySearch = $("#search-bar").val().trim();
    console.log("City: " + citySearch);
    // Query URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch + "&appid=a65d8d10d8d0113809dcb571fe23ebb8";
    // AJAX CALL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        // console.log("Weather: ", response);
        var tempConverted = ((response.main.temp - 273.15) * 1.80 + 32);
        var temperature = tempConverted.toFixed(1);
        var condition = response.weather[0].description;
        var wind = response.wind.speed;
        console.log("Temperature: " + temperature + " fahrenheit"); 
        // POST WEATHER TO HTML
        $("#weather").append($("<h2>Weather Conditions</h2>" + "<hr style='border-color: rgb(243, 242, 223);'>" + "<p style='text-align: center;'>"+ "Temp: " + temperature + " \xB0F" + "</p>" + "<p style='text-align: center;'>" + "Precipitation: " + condition + "</p>" + "<p style='text-align: center;'>" + "Wind Speed: " + wind + " mph" + "</p>" + "<hr style='border-color: rgb(243, 242, 223);'>"));
    })
}
// WEATHER AJAX CALL BY ZIP
function weatherZIP() {
    var zipCode = $("#search-zip").val().trim();
    console.log("ZIP Code: " + zipCode);
    // ZIP CODE API
    var APIKEY = "3BHfNoGVJZtKdX7h9rLzIr9OfCcEnusmDgQYoWIeUKJqnvKjAbYHrcsHtg7n5APZ";
    var queryURL = "https://cors-everywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + APIKEY + "/info.json/" + zipCode + "/degrees";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var city = response.city;
        console.log("city from ZIP: " + city);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&appid=a65d8d10d8d0113809dcb571fe23ebb8";
        // AJAX CALL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            // console.log("Weather: ", response);
            var tempConverted = ((response.main.temp - 273.15) * 1.80 + 32);
            var temperature = tempConverted.toFixed(1);
            var condition = response.weather[0].description;
            var wind = response.wind.speed;
            console.log("Temperature: " + temperature + " fahrenheit"); 
            // POST WEATHER TO HTML
            $("#weather").append($("<h2>Weather Conditions</h2>" + "<hr style='border-color: rgb(243, 242, 223);'>" + "<p style='text-align: center;'>"+ "Temp: " + temperature + " \xB0F" + "</p>" + "<p style='text-align: center;'>" + "Precipitation: " + condition + "</p>" + "<p style='text-align: center;'>" + "Wind Speed: " + wind + " mph" + "</p>" + "<hr style='border-color: rgb(243, 242, 223);'>"));
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
    .then(function(response){
        // DEFINE SEARCH TERMS
        // console.log("GEOCODE: ", response);
        var lat = response.results[0].geometry.location.lat;
        var lng = response.results[0].geometry.location.lng;
        // console.log("latitude, longitude: ", lat, ",", lng);
        // SEARCH BASED ON LOCATION, RADIUS, TYPE, KEYWORD
        var location = "location=" + lat + ", " + lng + "&radius=17000&type=restaurant&keyword=patio";
        // QUERY URL FORMULA
        var queryURL2 = "https://cors-everywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+ location + APIKEY;
        $.ajax({
            url: queryURL2,
            method: "GET"
        })
        .then(function(rest){
            console.log("Restaurants: ", rest);
            $("#restaurants").append("<h2>Restaurants</h2>" + "<hr style='border-color: rgb(243, 242, 223);'>");
            for (i = 0; i < rest.results.length; i++) {
                // console.log(rest.results[i].name);
                var patioResults = rest.results[i].name;
                // var patioLink = rest.results[i].photos[0].html_attributions[0];
                $("#restaurants").append("<p style='text-align: center;'>" + patioResults + "</p>");
                // $("#restaurants").append("<div style='text-align: center;'>" + patioLink + "</div>");
                // $("a").attr("target", "_blank");
            }
            $("#restaurants").append("<hr style='border-color: rgb(243, 242, 223);'>");
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
    .then(function(response){
        var APIKEY2 = "&key=AIzaSyBU8WngwG699p-gzKCP_VezmXkXqZ64ovc";
        var lat = response.lat;
        var lng = response.lng;
        var location = "location=" + lat + ", " + lng + "&radius=17000&type=restaurant&keyword=patio";
        var queryURL2 = "https://cors-everywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + location + APIKEY2;
        $.ajax({
            url: queryURL2,
            method: "GET"
        })
        .then(function(rest){
            console.log("Restaurants: ", rest);
            $("#restaurants").append("<h2>Restaurants</h2>" + "<hr style='border-color: rgb(243, 242, 223);'>");
            for (i = 0; i < rest.results.length; i++) {
                // console.log(rest.results[i].name);
                var patioResults = rest.results[i].name;
                // var patioLink = rest.results[i].photos[0].html_attributions[0];
                $("#restaurants").append("<p style='text-align: center;'>" + patioResults + "</p>");
                // $("#restaurants").append("<div style='text-align: center;'>" + patioLink + "</div>");
                // $("a").attr("target", "_blank");
            }
            $("#restaurants").append("<hr style='border-color: rgb(243, 242, 223);'>");
        })
    })
}

// PREVENTS PAGE REFRESH ON HITTING ENTER IN SEARCH BAR
$("#myForm").submit(function(event){
    event.preventDefault();
    var checkBlank = $("#search-bar").val().trim();
    $("#display").empty("");

    if (checkBlank === ""){
        weatherZIP();
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
$("#search-btn").click(function(event){
    event.preventDefault();
    var checkBlank = $("#search-bar").val().trim();
    $("#display").empty("");

    if (checkBlank === ""){
        weatherZIP();
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