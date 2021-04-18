/* my appid key  */

const appID = "&appid=edf705e3020c7eb275d6596cf76f80e8";
const weatherCall = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastCall = "https://api.openweathermap.org/data/2.5/onecall?";
const wUnits = "&units=metric";
const iconURL = "http://openweathermap.org/img/wn/";

const citiesList = document.getElementById("citiesList");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("btnSearch");
const resetBtn = document.getElementById("btnReset");
const foreCards = document.getElementsByClassName("forecastCard");

let searchText;
let cities = [];

searchBtn.addEventListener("click", function() {
    searchText = searchBox.value;
    if (searchText != "")
    {
        contactWeatherAPI(weatherCall,searchText,wUnits,appID);
    }
});

function contactWeatherAPI(endPoint, city, units, appID)
{

let lat,long;

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

     
        lat = "lat=" + pData.coord.lat + "&";
        long = "lon=" + pData.coord.lon;

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

        console.log(pData);

        for (i = 0; i < foreCards.length; i++)
        {
       
            tempeture = pData.daily[i].temp.day
            high = pData.daily[i].temp.max;
            low = high = pData.daily[i].temp.max;
            windSpeed = pData.daily[i].wind_speed * 3.6;
            tempeture = tempeture.toFixed(1);
            low = low.toFixed(1);
            high = high.toFixed(1);
            windSpeed = windSpeed.toFixed(1);
            humidity = pData.daily[i].humidity; 
            desc = pData.daily[i].weather[0].description;
            weatherIcon = iconURL + pData.daily[i].weather[0].icon + "@2x.png";

        childrenData = foreCards[i].children;
        childrenData[0].textContent = dateTime.getDate() + i + "/" + dateTime.getMonth() ;
        childrenData[1].innerHTML = tempeture + "°" + "<span class='curC'>C</span>";
        childrenData[2].innerHTML = "L: " + low + "°" + "<span class='curC'>C</span>" + " H: " + high + "°" +  "<span class='curC'>C</span>";
        childrenData[3].setAttribute("src", weatherIcon);
        childrenData[4].textContent = desc;
        childrenData[5].textContent = "Wind Speed: " + windSpeed + "  km/h";
        childrenData[6].textContent = "Humidity: " + humidity + "%";

        }
    })
    .catch(function error(error)
    {
        alert("Unable to retrieve weather report. Check your spelling and try again...");
    });
}

contactWeatherAPI(weatherCall,"Perth",wUnits,appID);

function writeElement(textToWrite)
{
  var listEl = document.createElement("li");
  listEl.appendChild(document.createTextNode(textToWrite));
  citiesList.appendChild(listEl);
  saveHistory(textToWrite);
}

  resetBtn.addEventListener("click", function(){
    localStorage.clear()
    // As long as <ul> has a child node, remove it
    while (citiesList.hasChildNodes()) {  
    citiesList.removeChild(citiesList.firstChild);
    }
  });

  // writing from local 

  function retrieveHistory()
  {
    let cityBoard = JSON.parse( localStorage.getItem('cities') );

    if(cityBoard!= null)
  {
    for (i=0; i<cityBoard.length; i++)
    {
      writeElement(cityBoard[i])
    }
  }

}

function saveHistory(city)
{

if(cities === null)
  {
    cities = [];
  }

  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}

retrieveHistory();