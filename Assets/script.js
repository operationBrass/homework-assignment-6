/* my appid key  */

let appID = "&appid=edf705e3020c7eb275d6596cf76f80e8";
const weatherCall = "http://api.openweathermap.org/data/2.5/weather?q=";
let city = "perth";
let tempeture;
let lat;


async function contactWeatherAPI(city)
{

try 
{
    let report = await fetch(weatherCall + city + "&" + appID);
    return await report.json();

} 

catch (error)
{
    console.log(error);
}


}

async function createWeather()
{
    let test = await contactWeatherAPI("canberra");
    let divShow = document.getElementById("show");
    divShow.innerHTML = JSON.stringify(test.coord.lat)
}

createWeather();