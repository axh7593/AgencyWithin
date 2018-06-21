var api_key = "b02c829edbd50b430f4f974e9d24bb32";
var api_url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";

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
}


function createExtended(latitude, longitude, cityName, divID){
    //console.log("exteded lat: " + latitude);
    var api_call = api_url + api_key + "/" + latitude + "," + longitude;
    this.latitude = latitude;
    this.longitude = longitude;
    this.cityName = cityName;
    this.divID = divID;

    var city = cityName;


    //create string for hourly forecast
    var string = "";
    string += "<h1 style='width: 400px;'>" + city + "</h1>" + "<br>";
    string += "<h4 style='width: 400px;'>" + "Hourly Forecast" + "</h4>";
    string += "<table style='width: 800px !important;'>" +
                "<thead>" +
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
            // loop through all the hourly data
            $.each(forecast.hourly.data, function(key, value){
                
                // convert UNIX time to standard time stamps
                var date = new Date(value.time * 1000);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var formattedTime = hours + ":" + minutes.substr(-2);
                
                //convert precipitation to a percentage instead of a decimal
                var precipPercent = value.precipProbability * 100;
                // prevent value from creating a run on number by fixing to number to one decimal point
                var precipFixed = precipPercent.toFixed(1);

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
                                    "<td>" + precipFixed + "%" + "</td>" + 
                                    "<td>" + humidPercentFixed + "%" + "</td>" +
                                    "<td>" + value.windSpeed + " mph" + "</td>"
                                "</tr>" +
                            "</tbody>" +
                        "</table>";          
            }  
        });




    //create string for daily forecast
    var dailyString = "";                
    dailyString += "<table style='width: 900px !important; '>" +
    dailyString + "<h4 style='width: 400px; padding-top: 30px;'>" + "Daily Forecast"  + "</h4>" +
        "<thead >" +
            "<tr>" +
                "<th>" + "Date" + "</th>" +
                "<th>" + "Description" + "</th>"+
                "<th>" + "High/Low" + "</th>" +
                "<th>" + "Precip" + "</th>" +
                "<th>" + "Humidity" + "</th>" +
                "<th>" + "Wind" + "</th>" +
            "</tr>" +
        "</thead>";


            //loop through all the daily data
            $.each(forecast.daily.data, function(key, value){
                //console.log(value);
                
                // convert UNIX time to standard date stamps
                var date = new Date(value.time * 1000);
                // had to add 1 to month as data was showing the month as being 1 behind the current, could be api error?
                var month = ((date.getMonth()) + 1).toString();
                var day = (date.getDate()).toString();
                var year = (date.getFullYear()).toString();
                var formattedDate = month + "/" +  day + "/" + year;
                
                //convert precipitation to a percentage instead of a decimal
                var precipPercent = value.precipProbability * 100;
                // prevent value from creating a run on number by fixing to number to one decimal point
                var precipFixed = precipPercent.toFixed(1);

                //convert humidity to a percentage instead of a decimal also convert to string so that 
                // substring can run on the results to shorten the result to prevent a runon percentage
                var humidPercent = (value.humidity * 100).toString();
                var humidPercentFixed = humidPercent.substring(0,5);
                
                // Format string that will be displayed on page as a html table
                dailyString +="<tbody>" +
                                "<tr>" +
                                    "<td>" + formattedDate + "</td>" +  
                                    "<td style='max-width:200px;'>" + value.summary + "</td>" +
                                    "<td>" + value.temperatureMin + "&#8457" + " / " + value.temperatureMax + "&#8457" + "</td>" +
                                    "<td>" + precipFixed + "%" + "</td>" + 
                                    "<td>" + humidPercentFixed + "%" + "</td>" +
                                    "<td>" + value.windSpeed + " mph" + "</td>"
                                "</tr>" +
                                "</tbody>" +
                            "</table>";    
            });

        //append above html to the selected divID parameter and change its inner html and be sure to add both created strings so both tables appear
        divID = document.querySelector(divID).innerHTML = string + dailyString;
      });
    
}
