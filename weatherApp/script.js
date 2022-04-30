"use strict";
let state = {
  urlCurrent:
    "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",
  urlForecast:
    "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",
  urlIcon: "https://openweathermap.org/img/w/", // sufix .png
};

async function getCurrentData() {
  let location = document.querySelector("input[name=location-input]");
  let loader = document.querySelector(".lds-ring");
  let warning = document.querySelector(".warning");
  let letters = /^[A-Za-z]+$/;
  loader.classList.toggle("hidden");
  if (!location.value) {
    warning.classList.remove("hidden");
    loader.classList.toggle("hidden");
    warning.value = "Location cannot be empty !";
    setTimeout(function () {
      warning.classList.add("hidden");
    }, 3000);
    return;
  }
  if (!location.value.match(letters)) {
    warning.classList.remove("hidden");
    loader.classList.toggle("hidden");
    warning.value = "Only alphabetical characters allowed !";
    location.value = "";
    setTimeout(function () {
      warning.classList.add("hidden");
    }, 3000);
    return;
  } else {
    let responseCurrent = await fetch(
      state.urlCurrent + `${location.value.toLowerCase()}`
    );
    if (responseCurrent.status === 404) {
      warning.classList.remove("hidden");
      loader.classList.toggle("hidden");
      warning.value = `Location "${location.value}", not found !`;
      location.value = "";
      setTimeout(function () {
        warning.classList.add("hidden");
      }, 3000);
      return;
    }
    state.current = await responseCurrent.json();
    state.icon = await fetch(
      state.urlIcon + `${state.current.weather[0].icon}` + ".png"
    );
    loader.classList.toggle("hidden");
    console.log(state.current, state.icon);
    location.value = "";
    populateCurrent();
  }
}

async function getForecastedData() {
  let location = document.querySelector("input[name=location-input]");
  if (!location.value) {
    return;
  } else {
    let responseForecast = await fetch(
      state.urlForecast + `${location.value.toLowerCase()}`
    );
    state.forecast = await responseForecast.json();
  }
  console.log(state.forecast);
}

function populateCurrent() {
  getDateTime();
  getSecondaryData();
  let cr = state.current;
  let crWeather = cr.weather[0];
  let location = document.querySelector(".location-icon");
  let celsius = document.querySelector(".celsius");
  let min = document.querySelector(".min-temp");
  let time = document.querySelector(".time");
  location.innerHTML = `
    <div class = "location">${cr.name}, ${cr.sys.country}</div>
    <img src = "${state.urlIcon + crWeather.icon}.png"/>
  `;
  celsius.innerHTML = `${Math.trunc(cr.main.temp)}°C`;
  min.innerHTML = `Min / Max temp.: ${Math.trunc(
    cr.main.temp_min
  )}°C / ${Math.trunc(cr.main.temp_max)}°C`;
  time.innerHTML = state.timeDayOfWeek;
  document.querySelector(".current-info").classList.remove("hidden");
}

function getDateTime() {
  let date = new Date(state.current.dt * 1000);
  let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  let time = `${date.getHours()}:${date.getMinutes()}`;
  state.timeDayOfWeek = `${dayOfWeek}, ${time}`;
}

function getSecondaryData() {
  let precip = document.querySelector(".precip");
  let rain = document.querySelector(".rain");
  let wind = document.querySelector(".wind");
  let windRaw = state.current.wind.speed * 3.6;
  let windFormated = windRaw.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  if (!state.current.rain) {
    precip.innerHTML = "Rain 1h: 0 mm/km²";
  } else {
    precip.innerHTML = `Rain (1h): ${state.current.rain["1h"]} mm/km²`;
  }
  rain.innerHTML = `Humidity: ${state.current.main.humidity}%`;
  wind.innerHTML = `Wind: ${windFormated} km/h`;
  initMap();
}

// {
//     "coord": {
//         "lon": 24.7022,
//         "lat": 46.7742
//     },
//     "weather": [
//         {
//             "id": 500,
//             "main": "Rain",
//             "description": "light rain",
//             "icon": "10n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 11.85,
//         "feels_like": 11.36,
//         "temp_min": 11.51,
//         "temp_max": 11.85,
//         "pressure": 1019,
//         "humidity": 87,
//         "sea_level": 1019,
//         "grnd_level": 975
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 1.77,
//         "deg": 76,
//         "gust": 1.84
//     },
//     "rain": {
//         "1h": 0.21
//     },
//     "clouds": {
//         "all": 93
//     },
//     "dt": 1651096241,
//     "sys": {
//         "type": 2,
//         "id": 50402,
//         "country": "RO",
//         "sunrise": 1651115478,
//         "sunset": 1651166751
//     },
//     "timezone": 10800,
//     "id": 668997,
//     "name": "Reghin",
//     "cod": 200
// }

function initMap() {
  if (state.current === undefined) {
    return;
  } else {
    let mapProp = {
      center: new google.maps.LatLng(
        state.current.coord.lat,
        state.current.coord.lon
      ),
      zoom: 12,
      controlSize: 25,
      setCenter: { lat: state.current.coord.lat, lon: state.current.coord.lon },
    };
    let map = new google.maps.Map(document.getElementById("map"), mapProp);
  }
}
