/* my appid key  */

let appID = "appid=edf705e3020c7eb275d6596cf76f80e8";
let weatherCall = "http://api.openweathermap.org/data/2.5/weather?";
let city = "q=perth"

let testPromise = new Promise(function(resolve,reject)
{
    fetch(weatherCall + city + "&" + appID);
    resolve();
    reject(error);
});

testPromise.then(
    function(value){ console.log(value)}
    ,function(error) {console.log(error)}
    );
