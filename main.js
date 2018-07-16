$(document).ready(function(){
    //remember that jQuery uses css selectors
    $("#submitLocation").click(function(){
        return getWeather();
    });
});

function getWeather(){
    //this is the value of whats in the input of id="city" (current.html line 57)
    var city = $("#city").val();
    if(city != ''){
        $.ajax({
            //We got the url from the openweathermap, replaced the default city with our input, and then added our api key to the end of the url 
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=94e3bf100dd40bfcfdf2db91f4b6d843",
            type: "GET",
            datatype: "jsonp",
            success: function(data){
                var widget = showResults(data);
                console.log(widget);
                $("#showWeather").html(widget);
                $("#city").val('');
            }
        });
    } else {
        $("#error").html("<div class='alert alert-danger' id='errorInput'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Location Field Required</div>");
    }
}

function showResults(data) {
    //data is what was retrieved from the previous function, main.temp is how we get the temp according to the docs at openweathermap docs
    return "<h3>Current Weather for " + data.name + "</h3>" +
           "<p><span>Weather: </span>" + data.weather[0].main + "</p>" +
           "<p><span>Weather Description: </span>" + data.weather[0].description + "</p>" +
           "<p><span>Temperature: </span>" + data.main.temp + " &deg;F</p>" +
           "<p><span>Humidity: </span>" + data.main.humidity + " %</p>" +
           "<p><span>Cloudiness: </span>" + data.clouds.all + " %</p>" +
           "<p><span>Winds: </span>" + data.wind.speed + " mph</p>";
}
