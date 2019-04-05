/*------------------------------------------------------------------------------ WEATHER API -------------------------------------------------------------------------------*/

function getWeatherData(city, id, id2) { //retrieve weather data from OpenWeather API

    var url = "https://api.openweathermap.org/data/2.5/weather";
    var apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2";

    var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city; //creating the retrieval URL within a var
    
    fetch(request) //fetching the data through the link
    
    .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })
    
    .then(function(response) {
        onWeatherSucces(response, id, id2);  
    })
    
    .catch(function (error) {
        onWeatherError(error, id);
    });
}

function tempIcon(degC) { //retrieving temperature icons from FontAwesome
  if (degC < 0) //if-statement determining which icon is to be written into the html
    return '<i class="fas fa-thermometer-empty"></i> ';
  if (degC < 10)
    return '<i class="fas fa-thermometer-quarter"></i> ';
  if (degC < 20)
    return '<i class="fas fa-thermometer-half"></i> ';
  if (degC < 30)
    return '<i class="fas fa-thermometer-three-quarters"></i> ';

return '<i class="fas fa-thermometer-full"></i> ';
}

function onWeatherSucces(response, id, id2) { //the continuation of the getWeatherData function.  
//The parameters are: response, which takes the data from the getWeatherData function; id, which is the id where the weather information 
//will be written to; id2, which is the div that the Elevation data will be written to. 
    
    var type = '<img class="weatherIcon" src="images/'+response.weather[0].icon+'.png" />'; //determining which locally saved img to use
    var windSpeed = response.wind.speed;
    var degC = Math.floor(response.main.temp - 273.15);
    var temperatureIcon = tempIcon(degC);
    var windIcon = '<i class="fas fa-wind"></i>';

    var weatherBox = document.getElementById(id); 
    weatherBox.innerHTML += type + "<br />" + '<span class="degC">' + temperatureIcon + degC + "&#176;C <br />" + '</span>' + '<span class="windSpeed">' + windIcon + windSpeed + " m/s" + '</span>';
    getElevationData(response.coord.lat,response.coord.lon, id2);
}

function onWeatherError(error, id) { //error function in case the API data can not be retrieved
    console.error('Request failed', error);
    var weatherBox = document.getElementById(id);
    weatherBox.className = 'hidden'; 
}


/*------------------------------------------------------------------------------ ELEVATION API ------------------------------------------------------------------------------*/


function getElevationData(latitude, longitude, id2) { //the elevation data based off of the cities used in the weather function
    var request = 'https://open.mapquestapi.com/elevation/v1/profile?key=uV4sKUUwnFl2Cqps8bNb3SKvVXyNoQLk&shapeFormat=raw&latLngCollection=' + latitude + "," + longitude;
    //requesting the API for data through this url
    var mountainIcon = '<i class="fas fa-mountain"></i>'; //using a mountain icon from FontAwesome to display along with elevation
    fetch(request) //fetching the data from the API

    .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })
    
    .then(function(response) {

        document.getElementById(id2).innerHTML += '<span class="elevationText">' + mountainIcon + response.elevationProfile[0].height + 'm' + '</span>';
    //writing everything into the declared id2
    }).catch(function(error) {
        console.error(error);
    });
}


/*--------------------------------------------------------------------------- HEADER CLOCK & DATE ----------------------------------------------------------------------------*/


function showTime(){ //general function to show the time in the upper left corner
    var date = new Date(Date.now());
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
        
    var time = h + ":" + m + ":" + s;
    document.getElementById("header1").innerHTML = time;
    setTimeout(showTime, 1000);
}

function showDate(){ //general function to show the date in the upper right corner
    var date = new Date(Date.now());
    var day = date.getDate(); // 1 - 31
    var month = date.getMonth() +1; // 1 - 12
    var year = date.getFullYear() +49; //displaying the year 2068, in which the ITS will come back to earth

    day = (day < 10) ? "0" + day : day;
    month = (month < 10) ? "0" + month : month;

    var fullDate = day + "/" + month + "/" + year;
    document.getElementById("header3").innerHTML = fullDate;
}


/*-------------------------------------------------------------------------- LOADING API FUNCTIONS --------------------------------------------------------------------------*/
//calling all functions
getWeatherData('Cape Canaveral, us','art1','art4');
getWeatherData('Baikonur, kz','art2','art5');
getWeatherData('White Sands, us','art3','art6');

window.onload = function() {
    showTime();
    showDate();
};
