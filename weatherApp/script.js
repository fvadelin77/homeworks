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
  //   let letters = /^[A-Za-z-]+$/;

  loader.classList.toggle("hidden");
  if (!location) {
    warning.classList.remove("hidden");
    loader.classList.toggle("hidden");
    warning.value = "Location cannot be empty !";
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
      await getForecastedData();
    }
  }
  populateCurrent();
}

function populateCurrent() {
  getDateTime();
  getSecondaryData();
  let locationInput = document.querySelector("input[name=location-input]");
  let forecast = document.querySelector(".forecast");
  let cr = state.current;
  console.log(cr);
  let crWeather = cr.weather[0];
  let location = document.querySelector(".location-icon");
  let celsius = document.querySelector(".celsius");
  let time = document.querySelector(".time");
  let min = document.querySelector(".min-temp");
  location.innerHTML = `
    <div class = "location">${cr.name}, ${cr.sys.country}</div>
    <img src = "${state.urlIcon + crWeather.icon}.png"/>
    <div class="descr">${crWeather.description}</div>
    `;
  celsius.innerHTML = `${Math.round(cr.main.temp)}°C`;
  min.innerHTML = `Min / Max temp.: ${Math.round(
    cr.main.temp_min
  )}°C / ${Math.round(cr.main.temp_max)}°C`;
  time.innerHTML = state.timeDayOfWeek;
  document.querySelector(".current-info").classList.remove("hidden");

  // Daily forecast
  let elem = document.querySelector(".forecastDaily");
  let list = state.forecast.list;
  let str = "";
  for (let i = 0; i < 9; i++) {
    let date = new Date(list[i].dt * 1000);
    let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    let icon = list[i].weather[0].icon;

    str += `
            <div class="forecastElemDaily">
            <div class="date-hour">
            <div class="date">${dayOfWeek}, ${date.getDate()}/${
      date.getMonth() + 1
    }
            </div>
            <div class="hour">${date.getHours()}:${
      date.getMinutes() + "0"
    }</div>
            </div>
            <div class="icon-temp">
            <img src = "${state.urlIcon + icon}.png"/>
            <div class="temp">${Math.round(list[i].main.temp)} °C</div>
            </div>
            ${
              list[i].rain === undefined
                ? ""
                : `<div class="rainProb">Rain: ${Math.round(
                    list[i].pop * 100
                  )}%</div>`
            }
                </div>
                `;
  }
  elem.innerHTML = str;
  locationInput.value = "";
  elem.classList.remove("hidden");
  forecast.classList.add("hidden");
}

function getDateTime() {
  let date = new Date(state.current.dt * 1000);
  let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  let time = `${date.getHours()}:${date.getMinutes()}`;
  state.timeDayOfWeek = `${dayOfWeek}, ${time}`;
}

function getSecondaryData() {
  // state.current.main.pressure
  let pressure = document.querySelector(".pressure");
  let rain = document.querySelector(".rain");
  let wind = document.querySelector(".wind");
  let windRaw = state.current.wind.speed * 3.6;
  let windFormated = windRaw.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  //   if (!state.current.rain) {
  //     precip.innerHTML = "Rain 1h: 0 mm/km²";
  //   } else {
  //     precip.innerHTML = `Rain (1h): ${state.current.rain["1h"]} mm/km²`;
  //   }
  pressure.innerHTML = `Pressure: ${state.current.main.pressure} hPa`;
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

function populateForecast() {
  let elem = document.querySelector(".forecast");
  let warning = document.querySelector(".warning");
  let str = "";
  //   let dateInitial = new Date(list[0].dt * 1000);
  //   let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
  if (state.current === undefined) {
    warning.classList.remove("hidden");
    warning.value = 'Get "Current weather" first';
    setTimeout(function () {
      warning.classList.add("hidden");
    }, 3000);
    return;
  }
  let list = state.forecast.list;
  for (let i = 0; i < list.length; i++) {
    let date = new Date(list[i].dt * 1000);
    let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    let icon = list[i].weather[0].icon;
    str += `
    <div class="forecastElem">
    <div class="date-hour">
    <div class="date">${dayOfWeek}, ${date.getDate()}/${date.getMonth() + 1}
    </div>
    <div class="hour">${date.getHours()}:${date.getMinutes() + "0"}</div>
    </div>
    <div><i>${list[i].weather[0].description}</i></div>
    <div class="icon-temp">
    ${
      list[i].rain === undefined
        ? ""
        : `<div class="rainProb">${Math.round(list[i].pop * 100)}%</div>`
    }
        <img src = "${state.urlIcon + icon}.png"/>
        <div class="temp">${Math.round(list[i].main.temp)} °C</div>
            </div>
            </div>
            `;
  }
  console.log(state.forecast);
  elem.innerHTML = str;
  document.querySelector(".forecast").classList.remove("hidden");
}

async function getForecastedData() {
  let location = state.current.name;
  if (!location) {
    return;
  } else {
    let responseForecast = await fetch(state.urlForecast + `${location}`);
    state.forecast = await responseForecast.json();
  }
}

// function isLooseEquals (val1,val2) {
// if (val1 === val2) {
//   return true;
// }
// if (
//   (val1 === null || val1 === undefined) &&
//   (val2 === null || val2 === undefined)
// ) {
// }
// }

// retrive data
