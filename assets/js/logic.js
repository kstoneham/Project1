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
        var tempConverted = ((response.main.temp - 273.15) * 1.80 + 32);
        var temperature = tempConverted.toFixed(1);
        console.log("Temperature: " + temperature + " fahrenheit"); 

        $("#weather").prepend($("<p style='text-align: center;'>"+ temperature + " F" + "</p>"));
    })
}

// SEARCH BUTTON 
$("#search-btn").click(function(event){
    event.preventDefault();
    weather();
})

