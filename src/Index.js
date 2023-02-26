let currentDate = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMin = date.getMinutes();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} <em><br>${currentHour}:${currentMin}</em></br>`;

  return formattedDate;
}

let title = document.querySelector(`#title`);
title.innerHTML = formatDate(currentDate);

function cityFormValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let city = `${cityInput.value}`;
  let apiKey = "da356f86114d4368e53d5acadf7e4e28";
  let units = "metric";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl2).then(cityFormTemp);

  function cityFormTemp(response) {
    let h4 = document.querySelector("h4");
    let temp1 = document.querySelector("#temp1");
    let temperature2 = Math.round(response.data.main.temp);
    h4.innerHTML = `Today in ${response.data.name}`;
    temp1.innerHTML = `${temperature2}°C`;
  }
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityFormValues);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  function retrievePosition(position) {
    let apiKey = "da356f86114d4368e53d5acadf7e4e28";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(Url).then(showWeather);
  }
  function showWeather(response) {
    let h4 = document.querySelector("h4");
    let temp1 = document.querySelector("#temp1");
    let temperature = Math.round(response.data.main.temp);
    h4.innerHTML = `Today in ${response.data.name}`;
    temp1.innerHTML = `${temperature}°C`;
  }
}
let currentLoc = document.querySelector("#geoButton");
currentLoc.addEventListener("click", currentLocation);
//it should display the name of the city on the result page and the current temperature of the city.
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
