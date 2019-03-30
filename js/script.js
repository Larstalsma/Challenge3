/*------------------------------------------------------------------------------ WEATHER API -------------------------------------------------------------------------------*/

function getWeatherData(city, id, id2) {

    var url = "https://api.openweathermap.org/data/2.5/weather";
    var apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2";

    var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;
    
    fetch(request)
    
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

function tempIcon(degC) {
  if (degC < 0)
    return '<i class="fas fa-thermometer-empty"></i> ';
  if (degC < 10)
    return '<i class="fas fa-thermometer-quarter"></i> ';
  if (degC < 20)
    return '<i class="fas fa-thermometer-half"></i> ';
  if (degC < 30)
    return '<i class="fas fa-thermometer-three-quarters"></i> ';

return '<i class="fas fa-thermometer-full"></i> ';
}

function onWeatherSucces(response, id, id2) {

    var type = '<img class="weatherIcon" src="images/'+response.weather[0].icon+'.png" />';
    var windSpeed = response.wind.speed;
    var degC = Math.floor(response.main.temp - 273.15);
    var temperatureIcon = tempIcon(degC);
    var windIcon = '<i class="fas fa-wind"></i>';

    var weatherBox = document.getElementById(id);
    weatherBox.innerHTML += type + "<br />" + '<span class="degC">' + temperatureIcon + degC + "&#176;C <br />" + '</span>' + '<span class="windSpeed">' + windIcon + windSpeed + " m/s" + '</span>';
    getElevationData(response.coord.lat,response.coord.lon, id2);
}

function onWeatherError(error, id) {
    console.error('Request failed', error);
    var weatherBox = document.getElementById(id);
    weatherBox.className = 'hidden'; 
}


/*------------------------------------------------------------------------------ ELEVATION API ------------------------------------------------------------------------------*/


function getElevationData(latitude, longitude, id2) {
    var request = 'https://open.mapquestapi.com/elevation/v1/profile?key=uV4sKUUwnFl2Cqps8bNb3SKvVXyNoQLk&shapeFormat=raw&latLngCollection=' + latitude + "," + longitude;
    var mountainIcon = '<i class="fas fa-mountain"></i>';
    fetch(request)

    .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })
    
    .then(function(response) {

        document.getElementById(id2).innerHTML += '<span class="elevationText">' + mountainIcon + response.elevationProfile[0].height + 'm' + '</span>';
    }).catch(function(error) {
        console.error(error);
    });
}


/*--------------------------------------------------------------------------- HEADER CLOCK & DATE ----------------------------------------------------------------------------*/


function showTime(){
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

function showDate(){
    var date = new Date(Date.now());
    var day = date.getDate(); // 1 - 31
    var month = date.getMonth() +1; // 1 - 12
    var year = date.getFullYear() +49;

    day = (day < 10) ? "0" + day : day;
    month = (month < 10) ? "0" + month : month;

    var fullDate = day + "/" + month + "/" + year;
    document.getElementById("header3").innerHTML = fullDate;
}


/*-------------------------------------------------------------------------- LOADING API FUNCTIONS --------------------------------------------------------------------------*/

getWeatherData('Cape Canaveral, us','art1','art4');
getWeatherData('Baikonur, kz','art2','art5');
getWeatherData('White Sands, us','art3','art6');

window.onload = function() {
    showTime();
    showDate();
};
