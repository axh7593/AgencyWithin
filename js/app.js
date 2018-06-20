var api_key = "b02c829edbd50b430f4f974e9d24bb32";
var api_url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
//var Buflatitude = "42.880230";
//var Buflongitude = "-78.878738";


function createCall(latitude, longitude, cityName, divID){
    var api_call = api_url + api_key + "/" + latitude + "," + longitude;

    $.getJSON(api_call, function(forecast) {
        var string = "";
        var city = cityName;
        var currentTemp = forecast.currently.temperature;
        var summary = forecast.currently.summary;
        string = city + "<br>" +
            "<strong>Current Temperature</strong>: " + currentTemp + "&#8457" + "<br>" + 
            "<strong>Current Conditions</strong>: " + summary;
        divID = document.querySelector(divID).innerHTML = string;
    

      });

}