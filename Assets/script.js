/* my appid key  */

const appID = "&appid=edf705e3020c7eb275d6596cf76f80e8";
const weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastCall = "https://api.openweathermap.org/data/2.5/onecall?";
const wUnits = "&units=metric";
const iconURL = "http://openweathermap.org/img/wn/";

const currentTemp = document.getElementById("curTemp");
const highlow = document.getElementById("highLow");
const currentWind = document.getElementById("curWind");
const currentHumidity = document.getElementById("curHumidity");
const currentIcon = document.getElementById("curIcon");
const currentDesc = document.getElementById("curDesc");
const citiesList = document.getElementById("citiesList");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("btnSearch")
const foreCards = document.getElementsByClassName("forecastCard");

let seachText;

searchBtn.addEventListener("click", function() {
    searchText = searchBox.value;
    if (searchText != "")
    {
        contactWeatherAPI(weatherCall,searchText,wUnits,appID);
    }
});

function contactWeatherAPI(endPoint, city, units, appID)
{

let tempeture;
let windSpeed;
let humidity;
let weatherIcon;
let desc,lat,long,low,high,avIndex;

// using the baseline promise syntax. 
//Also played around with ASYNC and AWAIT which works just as well.

fetch(endPoint + city  + units + appID)
    .then(function response(data) {

        if(!data.ok) //404 error or similar page fail
        {
            throw new Error; // go to catch 
        }
        return data.json();
    })
    .then(function process(pData) {

        console.log(pData)
        /* daily report setup */

        tempeture = pData.main.temp;
        low = pData.main.temp_min;
        high = pData.main.temp_max;
        windSpeed = pData.wind.speed;
        humidity = pData.main.humidity;
        lat = "lat=" + pData.coord.lat + "&";
        long = "lon=" + pData.coord.lon;
        desc = pData.weather[0].description;
        weatherIcon = iconURL + pData.weather[0].icon + "@2x.png";
        tempeture = tempeture.toFixed(1);
        low = low.toFixed(1);
        high = high.toFixed(1);

        /*daily weather report created here before i realized the one call only takes lat and lon */

        currentIcon.setAttribute("src",weatherIcon);
        currentDesc.innerHTML = desc;
        currentTemp.innerHTML = tempeture + "°" + "<span class='curC'>C</span>";
        highlow.innerHTML = "L: " + low + "°" + "<span class='curC'>C</span>" + " H: " + high + "°" +  "<span class='curC'>C</span>";
        currentWind.innerHTML = "Wind Speed: " + windSpeed + "  meter/sec";
        currentHumidity.innerHTML = "Humidity: " + humidity + "%";

        contactForecastAPI(forecastCall,lat,long,wUnits,appID);
    })
    .catch(function error(error)
    {
        alert("Unable to retrieve weather report. Check your spelling and try again...");
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
let childrenData;
let dateTime = new Date();
let low,high;

// using the baseline promise syntax. 
//Also played around with ASYNC and AWAIT which works just as well.

fetch(endPoint + lat + long + units + appID)
    .then(function response(data) {
        return data.json();
    })
    .then(function process(pData) {

        /* forecast setup */

        for (i = 1; i < 6; i++)
        {
        tempeture = pData.daily[i].temp.day
        high = pData.daily[i].temp.max;
        low = high = pData.daily[i].temp.max;
        tempeture = tempeture.toFixed(1);
        low = low.toFixed(1);
        high = high.toFixed(1);
        windSpeed = pData.daily[i].wind_speed;
        humidity = pData.daily[i].humidity; 
        desc = pData.daily[i].weather[0].description;
        weatherIcon = iconURL + pData.daily[i].weather[0].icon + "@2x.png";
        childrenData = foreCards[i-1].children;
        childrenData[0].textContent = dateTime.getDate() + i + "/" + dateTime.getMonth() ;
        childrenData[1].innerHTML = tempeture + "°" + "<span class='curC'>C</span>";
        childrenData[2].innerHTML = "L: " + low + "°" + "<span class='curC'>C</span>" + " H: " + high + "°" +  "<span class='curC'>C</span>";
        childrenData[3].setAttribute("src", weatherIcon);
        childrenData[4].textContent = desc;
        childrenData[5].textContent = "Wind Speed: " + windSpeed + "  meter/sec";
        childrenData[6].textContent = "Humidity: " + humidity + "%";
        }
        writeElement(searchBox.value)
    });
}

contactWeatherAPI(weatherCall,"Perth",wUnits,appID);

function writeElement(textToWrite)
{
  var listEl = document.createElement("li");
  listEl.appendChild(document.createTextNode(textToWrite));
  citiesList.appendChild(listEl);
}

