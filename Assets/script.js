/* my appid key  */

const appID = "&appid=edf705e3020c7eb275d6596cf76f80e8";
const weatherCall = "http://api.openweathermap.org/data/2.5/weather?q=";
const wUnits = "&units=metric"
const iconURL = "http://openweathermap.org/img/wn/";

const currentTemp = document.getElementById("curTemp");
const currentWind = document.getElementById("curWind");
const currentHumidity = document.getElementById("curHumidity");
const currentIcon = document.getElementById("curIcon");
const currentDesc = document.getElementById("curDesc");


function contactWeatherAPI(city)
{

let tempeture;
let windSpeed;
let humidity;
let avIndex; // not sure how to find yet
let weatherIcon;
let desc;

// using the baseline promise syntax. 
//Also played around with ASYNC and AWAIT which works just as well.

fetch(weatherCall + city  + wUnits + appID)
    .then(function response(data) {
        return data.json();
    })
    .then(function process(pData) {

        console.log(pData);
        tempeture = pData.main.temp;
        windSpeed = pData.wind.speed;
        humidity = pData.main.humidity;
        desc = pData.weather[0].description;
        weatherIcon = iconURL + pData.weather[0].icon + "@2x.png";
        tempeture = tempeture.toFixed(1);

        currentIcon.setAttribute("src",weatherIcon);
        currentDesc.innerHTML = desc;
        currentTemp.innerHTML = tempeture + "°" + "<span class='curC'>C</span>";
        currentWind.innerHTML = "Wind Speed: " + windSpeed + "  meter/sec";
        currentHumidity.innerHTML = "Humidity: " + humidity + "%";

    });
}

contactWeatherAPI("perth");

