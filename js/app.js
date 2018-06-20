var api_key = "b02c829edbd50b430f4f974e9d24bb32";
var api_url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
//var Buflatitude = "42.880230";
//var Buflongitude = "-78.878738";
var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];
var sunday    = [],
			monday    = [],
			tuesday   = [],
			wednesday = [],
			thursday  = [],
			friday    = [],
			saturday  = [];


function createCall(latitude, longitude, cityName, divID){
    this.latitude = latitude;
    this.longitude = longitude;
    this.cityName = cityName;
    this.divID = divID;
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
      //console.log("normal lat: " + latitude);
}



function createExtended(latitude, longitude, cityName, divID){
    //console.log("exteded lat: " + latitude);
    var api_call = api_url + api_key + "/" + latitude + "," + longitude;
    this.latitude = latitude;
    this.longitude = longitude;
    this.cityName = cityName;
    this.divID = divID;

    var city = cityName;

    var string = "";
    string += "<h1 style='width: 400px;'>" + city + "</h1>" + "<br>";
    string += "<h4 style='width: 400px;'>" + "Extended Hourly forecast" + "</h4>";
    string += "<table style='width: 800px !important;'>" +
                "<thead >" +
                    "<tr>" +
                        "<th>" + "Time" + "</th>" +
                        "<th>" + "Description" + "</th>"+
                        "<th>" + "Temperature" + "</th>" +
                        "<th>" + "Precip" + "</th>" +
                        "<th>" + "Humidity" + "</th>" +
                        "<th>" + "Wind" + "</th>" +
                    "</tr>" +
                "</thead>";
    $.getJSON(api_call, function(forecast) {
        
        
        
      
            $.each(forecast.hourly.data, function(key, value){
                console.log(value);
                
                // convert UNIX time to standard time stamps
                var date = new Date(value.time * 1000);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var formattedTime = hours + ":" + minutes.substr(-2);
                //console.log(string);
                
                //convert precipitation to a percentage instead of a decimal
                var precipPercent = value.precipProbability * 100;

                //convert humidity to a percentage instead of a decimal also convert to string so that 
                // substring can run on the results to shorten the result to prevent a runon percentage
                var humidPercent = (value.humidity * 100).toString();
                var humidPercentFixed = humidPercent.substring(0,5);

                // limit hourly times displayed to 10 to not show to much information on screen
                if(key == 10){
                    return false;
                }
                else{
                // Format string that will be displayed on page as a html table
                string +="<tbody>" +
                                "<tr>" +
                                    "<td>" + formattedTime + "</td>" +  
                                    "<td>" + value.summary + "</td>" +
                                    "<td>" + value.temperature + "&#8457" + "</td>" +
                                    "<td>" + precipPercent + "%" + "</td>" + 
                                    "<td>" + humidPercentFixed + "%" + "</td>" +
                                    "<td>" + value.windSpeed + " mph" + "</td>";
                                     

            }

                
            });
        //append above html to the selected divID parameter and change its inner html 
        divID = document.querySelector(divID).innerHTML = string;
    

      });
    
}
