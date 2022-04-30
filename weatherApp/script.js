"use strict";
let state = {
  urlCurrent:
    "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",
  urlForecast:
    "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=",
  urlIcon: "https://openweathermap.org/img/w/", // sufix .png
};

async function getCurrentData() {
  let location = document.querySelector("input[name=location-input]").value;
  let locationTrimmed = location.trim();
  let loader = document.querySelector(".lds-ring");
  let warning = document.querySelector(".warning");
  let letters = /^[A-Za-z-]+$/;
  loader.classList.toggle("hidden");
  if (!location) {
    warning.classList.remove("hidden");
    loader.classList.toggle("hidden");
    warning.value = "Location cannot be empty !";
    setTimeout(function () {
      warning.classList.add("hidden");
    }, 3000);
    return;
  }
  if (!locationTrimmed.match(letters)) {
    warning.classList.remove("hidden");
    loader.classList.toggle("hidden");
    warning.value = "Only alphabetical characters allowed !";
    location = "";
    setTimeout(function () {
      warning.classList.add("hidden");
    }, 3000);
    return;
  } else {
    let responseCurrent = await fetch(
      state.urlCurrent + `${locationTrimmed.toLowerCase()}`
    );
    if (responseCurrent.status === 404) {
      warning.classList.remove("hidden");
      loader.classList.toggle("hidden");
      warning.value = `Location "${locationTrimmed}", not found !`;
      location = "";
      setTimeout(function () {
        warning.classList.add("hidden");
      }, 3000);
      return;
    } else {
      state.current = await responseCurrent.json();
      state.icon = await fetch(
        state.urlIcon + `${state.current.weather[0].icon}` + ".png"
      );
      loader.classList.toggle("hidden");
      populateCurrent();
      getForecastedData();
    }
  }
}

async function getForecastedData() {
  let location = document.querySelector("input[name=location-input]");
  let locationTrimmed = location.value.trim();
  if (!locationTrimmed) {
    return;
  } else {
    let responseForecast = await fetch(
      state.urlForecast + `${locationTrimmed.toLowerCase()}`
    );
    state.forecast = await responseForecast.json();
  }
  populateDailyForecast();
  location.value = "";
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

function populateDailyForecast() {
  let elem = document.querySelector(".forecastDaily");
  let list = state.forecast.list;
  let str = "";
  for (let i = 0; i < 12; i++) {
    let date = new Date(list[i].dt * 1000);
    let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    let icon = list[i].weather[0].icon;
    console.log(icon);
    console.log(`${dayOfWeek}, ${date.getDate()}/${date.getMonth() + 1}`);
    str += `
        <div class="forecastElemDaily">
            <div class="date">${dayOfWeek}, ${date.getDate()}/${
      date.getMonth() + 1
    }
            </div>
            <div class="hour">${date.getHours()}:${
      date.getMinutes() + "0"
    }</div>
        <div class="icon-temp">
            <img src = "${state.urlIcon + icon}.png"/>
            <div class="temp">${Math.trunc(list[i].main.temp)} °C</div>
        </div>
        </div>
    `;
    elem.innerHTML = str;
    document.querySelector(".forecastDaily").classList.remove("hidden");
  }
}

// de adaugat conditii si la input (forecast)
