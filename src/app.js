let currentDate = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} <em><br>${currentTime}</em></br>`;

  return formattedDate;
}

function cityFormValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let city = `${cityInput.value}`;
  let apiKey = "89045e8b02ffo7bc061tb52f38ead08c";
  let apiUrl3 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  let apiUrl2 = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(cityFormTemp);
  axios.get(apiUrl3).then(showForecast2);

  function cityFormTemp(response) {
    let h4 = document.querySelector("h4");
    let temp1 = document.querySelector("#temp1");
    let temperature2 = Math.round(response.data.temperature.current);
    let cardText = document.querySelector("#card-text-prime");
    let currentIcon = document.querySelector("#today-img");
    currentIcon.setAttribute("src", response.data.condition.icon_url);
    currentIcon.setAttribute("alt", response.data.condition.icon);
    h4.innerHTML = `Today in ${response.data.city}`;
    temp1.innerHTML = `${temperature2}`;
    cardText.innerHTML = response.data.condition.description;
  }

  function formatDay(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  function showForecast2(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row-1-col-2 p-4">
    <div class="card-group">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 5) {
        forecastHTML =
          forecastHTML +
          `<div class="card">
          <img src="${
            forecastDay.condition.icon_url
          }" class="card-img-top" alt="${forecastDay.condition.icon}" />
            <div class="card-body">
              <h5 class="card-title">${formatDay(
                forecastDay.time
              )} <div class="temperature">
              <span class="weather-high"> ${Math.round(
                forecastDay.temperature.maximum
              )}°</span><span class="weather-low"> ${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
          </div>
          </h5>
          </br>
              <p class="card-text"> ${forecastDay.condition.description}</p>
              </br>
          </div>
          </div>`;
      }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  function retrievePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "89045e8b02ffo7bc061tb52f38ead08c";
    let Url2 = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    let Url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    axios.get(Url).then(showWeather);
    axios.get(Url2).then(showForecast);
  }
  function showWeather(response) {
    let h4 = document.querySelector("h4");
    let temp1 = document.querySelector("#temp1");
    let temperature = Math.round(response.data.temperature.current);
    let cardText = document.querySelector("#card-text-prime");
    let currentIcon = document.querySelector("#today-img");
    currentIcon.setAttribute("src", response.data.condition.icon_url);
    currentIcon.setAttribute("alt", response.data.condition.icon);
    h4.innerHTML = `Today in ${response.data.city}`;
    temp1.innerHTML = `${temperature}`;
    cardText.innerHTML = response.data.condition.description;
  }

  function formatDay(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  function showForecast(response) {
    let forecast = response.data.daily;
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row-1-col-2 p-4">
    <div class="card-group">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 5) {
        forecastHTML =
          forecastHTML +
          `<div class="card">
          <img src="${
            forecastDay.condition.icon_url
          }" class="card-img-top" alt="${forecastDay.condition.icon}" />
            <div class="card-body">
              <h5 class="card-title">${formatDay(
                forecastDay.time
              )} <div class="temperature">
              <span class="weather-high"> ${Math.round(
                forecastDay.temperature.maximum
              )}°</span><span class="weather-low"> ${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
          </div>
          </h5>
          </br>
              <p class="card-text"> ${forecastDay.condition.description}</p>
              </br>
          </div>
          </div>`;
      }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
}

let title = document.querySelector(`#title`);
title.innerHTML = formatDate(currentDate);
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityFormValues);
let currentLoc = document.querySelector("#geoButton");
currentLoc.addEventListener("click", currentLocation);
