// PREVENTS PAGE REFRESH ON HITTING ENTER IN SEARCH BAR
$("#myForm").submit(function(event){
    event.preventDefault();
    weather();
    restaurants();
    $("#search-bar").val("");
})
// SEARCH BUTTON 
$("#search-btn").click(function(event){
    event.preventDefault();
    weather();
    restaurants();
    $("#search-bar").val("");
})
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
        console.log("Weather: ", response);
        var tempConverted = ((response.main.temp - 273.15) * 1.80 + 32);
        var temperature = tempConverted.toFixed(1);
        console.log("Temperature: " + temperature + " fahrenheit"); 
        // POST WEATHER TO HTML
        $("#weather").prepend($("<p style='text-align: center;'>"+ temperature + " F" + "</p>" + "<hr style='border-color: rgb(243, 242, 223);'>"));
    })
}

// MAPS AJAX CALLS
function restaurants() {
    var citySearch = $("#search-bar").val().trim();
    var APIKEY = "&key=AIzaSyBU8WngwG699p-gzKCP_VezmXkXqZ64ovc";

    // QUERY URL FOR CONVERTING CITY SEARCH TO LAT/LNG COORDINATES
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + citySearch + APIKEY;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log("GEOCODE: ", response);
        var lat = response.results[0].geometry.location.lat;
        var lng = response.results[0].geometry.location.lng;
        console.log("latitude, longitude: ", lat, ",", lng);

        // SEARCH BASED ON LOCATION AND 10 MILE RADIUS AND FINDS RESTAURANTS
        var location = "location=" + lat + ", " + lng + "&radius=17000&type=restaurant&keyword=patio";

        // QUERY URL FOR RESTAURANTS, DONT FORGET KEYWORD=PATIO
        var queryURL2 = "http://cors-everywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+ location + APIKEY;
        $.ajax({
            url: queryURL2,
            method: "GET"
        })
        .then(function(rest){
            console.log("Restaurants: ", rest);
            for (i = 0; i < 10; i++) {
                console.log(rest.results[i].name);
                var patioResults = rest.results[i].name;
                $("#restaurants").prepend(patioResults);


            }
            $("#restaurants").append("<hr style='border-color: rgb(243, 242, 223);'>");
        })
    })



}


