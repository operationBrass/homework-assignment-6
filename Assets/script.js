/* my appid key  */

const appID = "&appid=edf705e3020c7eb275d6596cf76f80e8";
const weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastCall = "https://api.openweathermap.org/data/2.5/onecall?";
const wUnits = "&units=metric";
const iconURL = "http://openweathermap.org/img/wn/";

const currentTemp = document.getElementById("curTemp");
const currentWind = document.getElementById("curWind");
const currentHumidity = document.getElementById("curHumidity");
const currentIcon = document.getElementById("curIcon");
const currentDesc = document.getElementById("curDesc");

const forTemp = document.getElementById("forTemp");
const forWind = document.getElementById("forWind");
const forHumidity = document.getElementById("forHumidity");
const forIcon = document.getElementById("forIcon");
const forDesc = document.getElementById("forDesc");


function contactWeatherAPI(endPoint, city, units, appID)
{

let tempeture;
let windSpeed;
let humidity;
let weatherIcon;
let desc,lat,long,avIndex;

// using the baseline promise syntax. 
//Also played around with ASYNC and AWAIT which works just as well.

fetch(endPoint + city  + units + appID)
    .then(function response(data) {
        return data.json();
    })
    .then(function process(pData) {

        console.log(pData)
        /* daily report setup */

        tempeture = pData.main.temp;
        windSpeed = pData.wind.speed;
        humidity = pData.main.humidity;
        lat = "lat=" + pData.coord.lat + "&";
        long = "lon=" + pData.coord.lon;
        desc = pData.weather[0].description;
        weatherIcon = iconURL + pData.weather[0].icon + "@2x.png";
        tempeture = tempeture.toFixed(1);

        /*daily weather report */

        currentIcon.setAttribute("src",weatherIcon);
        currentDesc.innerHTML = desc;
        currentTemp.innerHTML = tempeture + "°" + "<span class='curC'>C</span>";
        currentWind.innerHTML = "Wind Speed: " + windSpeed + "  meter/sec";
        currentHumidity.innerHTML = "Humidity: " + humidity + "%";

        contactForecastAPI(forecastCall,lat,long,wUnits,appID)


    });
}

function contactForecastAPI(endPoint,lat,long, units, appID,)
{

let tempeture;
let windSpeed;
let humidity;
let avIndex; // not sure how to find yet
let weatherIcon;
let desc;

// using the baseline promise syntax. 
//Also played around with ASYNC and AWAIT which works just as well.

fetch(endPoint + lat + long + units + appID)
    .then(function response(data) {
        return data.json();
    })
    .then(function process(pData) {

        console.log(pData)
        /* forecast setup */

        for (i = 1; i < 6; i++)
        {
        tempeture = pData.daily[i].temp.day;
        windSpeed = pData.daily[i].wind_speed;
        humidity = pData.daily[i].humidity;
        desc = pData.daily[i].weather[0].description;
        weatherIcon = iconURL + pData.daily[i].weather[0].icon + "@2x.png";
        tempeture = tempeture.toFixed(1);

        /*daily forecast report */

        forIcon.setAttribute("src",weatherIcon);
        forDesc.innerHTML = desc;
        forTemp.innerHTML = tempeture + "°" + "<span class='curC'>C</span>";
        forWind.innerHTML = "Wind Speed: " + windSpeed + "  meter/sec";
        forHumidity.innerHTML = "Humidity: " + humidity + "%";
        }
    });
}


contactWeatherAPI(weatherCall,"Perth",wUnits,appID);

