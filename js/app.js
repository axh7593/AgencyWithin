
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
        // Get current temp
        var currentTemp = forecast.currently.temperature;
        // make temp only show the non decimal number for temp by trunc'ing the number 
        var currentTempFixed = Math.trunc(currentTemp);
        var summary = forecast.currently.summary;
        string = city + "<br>" +
            "<strong>Current Temperature</strong>: " + currentTempFixed + "&#8457" + "<br>" + 
            "<strong>Current Conditions</strong>: " + summary;
        divID = document.querySelector(divID).innerHTML = string;
      });
}


function createExtended(latitude, longitude, cityName, divID){
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
    string += "<table style='width: 900px !important;'>" +
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
                // prevent value from creating a run on number trunc'ing the decimal point 
                var precipFixed = Math.trunc(precipPercent);

                //convert humidity to a percentage instead of a decimal             
                // also prevent some other variables from producing decimals by trunc'ing the decimals
                var humidPercent = value.humidity * 100;
                var humidPercentFixed = Math.trunc(humidPercent);

                var temperature = value.temperature
                var temperatureFixed = Math.trunc(temperature);

                var windSpeed = value.windSpeed;
                var windSpeedFixed = Math.trunc(windSpeed);


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
                                    "<td>" + temperatureFixed + "&#8457" + "</td>" +
                                    "<td>" + precipFixed + "%" + "</td>" + 
                                    "<td>" + humidPercentFixed + "%" + "</td>" +
                                    "<td>" + windSpeedFixed + " mph" + "</td>"
                                "</tr>";
                                     
            }      
        });
        string += "</tbody>" +
                        "</table>"; 




    //create string for daily forecast
    var dailyString = "";                
    dailyString += "<table style='width: 900px !important; '>" +
    dailyString + "<h4 style='width: 400px; padding-top: 30px;'>" + "Daily Forecast"  + "</h4>" +
        "<thead >" +
            "<tr>" +
                "<th>" + "Date" + "</th>" +
                "<th>" + "Description" + "</th>"+
                "<th>" + "Low/High" + "</th>" +
                "<th>" + "Precip" + "</th>" +
                "<th>" + "Humidity" + "</th>" +
                "<th>" + "Wind" + "</th>" +
            "</tr>" +
        "</thead>";


            //loop through all the daily data
            $.each(forecast.daily.data, function(key, value){
                
                // convert UNIX time to standard date stamps
                var date = new Date(value.time * 1000);
                // had to add 1 to month as data was showing the month as being 1 behind the current, could be api error?
                var month = ((date.getMonth()) + 1).toString();
                var day = (date.getDate()).toString();
                var year = (date.getFullYear()).toString();
                var formattedDate = month + "/" +  day + "/" + year;
                
                //convert precipitation to a percentage instead of a decimal
                var precipPercent = value.precipProbability * 100;
                // prevent value from creating a run on number trunc'ing the decimal point 
                var precipFixed = Math.trunc(precipPercent);

                //convert humidity to a percentage instead of a decimal             
                // also prevent some other variables from producing decimals by trunc'ing the decimals
                var humidPercent = value.humidity * 100
                var humidPercentFixed = Math.trunc(humidPercent);

                var minTemp = value.temperatureMin;
                var minTempFixed = Math.trunc(minTemp);

                var maxTemp = value.temperatureMax;
                var maxTempFixed = Math.trunc(maxTemp);

                var windSpeed = value.windSpeed;
                var windSpeedFixed = Math.trunc(windSpeed);
                
                
                // Format string that will be displayed on page as a html table
                dailyString +="<tbody>" +
                                "<tr>" +
                                    "<td>" + formattedDate + "</td>" +  
                                    "<td style='max-width:200px;'>" + value.summary + "</td>" +
                                    "<td>" + minTempFixed + "&#8457" + " / " + maxTempFixed + "&#8457" + "</td>" +
                                    "<td>" + precipFixed + "%" + "</td>" + 
                                    "<td>" + humidPercentFixed + "%" + "</td>" +
                                    "<td>" + windSpeedFixed+ " mph" + "</td>"
                                "</tr>";
                                   
            });
            dailyString += "</tbody>" +
                             "</table>"; 

            dailyString += "<form action='../index.html'>" +
                                "<input type='submit' value='Back' id='back' />" +
                            "</form>";

        //append above html to the selected divID parameter and change its inner html and be sure to add both created strings so both tables appear
        divID = document.querySelector(divID).innerHTML = string + dailyString;
      });
    
}
