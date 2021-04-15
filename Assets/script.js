/* my appid key  */

let appID = "&appid=edf705e3020c7eb275d6596cf76f80e8";
const weatherCall = "http://api.openweathermap.org/data/2.5/weather?q=";
let city = "perth";
let tempeture;``
let lat;


function contactWeatherAPI(city)
{

fetch(weatherCall + city + "&" + appID)
    .then(function response(data) {
        return data.json();
    })
    .then(function process(pData) {
        let i = document.getElementById("curTemp");
        i.textContent = "Todays Weather is : " + pData.weather.description + " and " + pData.main.temp + " celcius";
    });
}

contactWeatherAPI("Canberra");

