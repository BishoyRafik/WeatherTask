//---> https://api.weatherapi.com/v1/current.json?key=5d7648e60fcf453abdb225647231008&q=auto:ip (The Api link using current Ip location)
//---> https://api.weatherapi.com/v1/forecast.json?key=5d7648e60fcf453abdb225647231008&q=auto:ip&days=3 (The Api link using current Ip location for 3 days)
// to search we need to make a variable from the input to be the value of q in the api link

var search = document.getElementById('searchCity');
var forecast;
var Fday;
var Days = [];
var SerLocation;
async function getWeather() {
    var request = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=5d7648e60fcf453abdb225647231008&q=auto:ip&days=3`
    );
    request = await request.json();
    forecast = request;
    Fday = request.forecast.forecastday;
    Days = Fday;
    console.log(forecast);
    console.log("days", Days);
    displayResult();
    search.addEventListener('keyup', function(){
        searchLoc();
    })
}
async function searchLoc(){
    SerLocation = search.value;
    var request = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=5d7648e60fcf453abdb225647231008&q=${SerLocation}&days=3`
    );
    request = await request.json();
    forecast = request;
    Fday = request.forecast.forecastday;
    Days = Fday;
    console.log(SerLocation);
    console.log(Days);
    displayResult();
}
function displayResult() {
    container = `        
    <div class="col-lg-4 col-md-6">
    <div class="card">
        <div class="card-header text-white d-flex justify-content-between">
            <div class="day text-capitalize">
                ${new Date(Days[0].date).toLocaleDateString("en-us", {
        weekday: "long",
    })}
            </div>
            <div class="date text-capitalize">
                ${Days[0].date}
            </div>
        </div>
        <div class="list-group list-group-flush text-white p-3">
            <div class="city">
                ${forecast.location.name}
            </div>
            <div class="content d-flex align-content-center">
                <h1 class="">${forecast.current.temp_c}<sup>o</sup>C</h1>
                <div class="w-25">
                    <img src=${forecast.current.condition.icon
        } class="w-100" alt="">
                </div>
            </div>
            <p class="text-info">${forecast.current.condition.text}</p>
            <ul class="weather-icons list-group list-unstyled d-flex flex-row flex-wrap align-items-center justify-content-start">
                <li class="list-group-item border-0">
                    <img src="weatherIMGS/icon-umberella@2x.png" alt="">
                    <span>${Days[0].day.daily_chance_of_rain}%</span>
                </li>
                <li class="list-group-item border-0">
                    <img src="weatherIMGS/icon-wind@2x.png" alt="">
                    <span>${forecast.current.wind_kph} km/h</span>
                </li>
                <li class="list-group-item border-0">
                    <img src="weatherIMGS/icon-compass@2x.png" alt="">
                    <span class="text-capitalize">${forecast.current.wind_dir
        }</span>
                </li>
            </ul>
        </div>
    </div>
    </div>`;
    for (let i = 1; i < Days.length; i++) {
        container += `
        <div class="col-lg-4 col-md-6">
        <div class="card">
            <div class="card-header text-white d-flex justify-content-center">
            <div class="day text-capitalize">
            ${new Date(Days[i].date).toLocaleDateString("en-us", {
            weekday: "long",
        })}
            </div>
            </div>
            <div class="list-group list-group-flush text-white p-3">
                <div class="content d-flex flex-column text-center align-content-center">
                    <div class="">
                        <img src=${Days[i].day.condition.icon} class="" alt="">
                    </div>
                    <h2>${Days[i].day.maxtemp_c}<sup>o</sup>C</h2>
                    <h5 class="text-white-50">${Days[i].day.mintemp_c
            }<sup>o</sup></h5>
                </div>
                <p class="text-info text-center fs-6">${Days[i].day.condition.text
            }</p>
            </div>
        </div>
    </div>
        `;
    }
    document.getElementById("forecasting").innerHTML = container;
}
function clearData(){
    search.value = '';
    getWeather();
}
search.addEventListener('keyup', function(){
    if (search.value == ''){
        getWeather();
    }
})
getWeather();