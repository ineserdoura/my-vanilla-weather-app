// Display current date and time

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let getOrdinal = function (n) {
    let s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  let year = now.getFullYear();
  return `${formatDay(timestamp)} <br/>${month}, ${getOrdinal(
    date
  )} ${year} <br/> <small>Last updated ${formatHours(timestamp)}</small>`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}`;
}

//Greet user

function greetUser(timestamp) {
  let now = new Date(timestamp);
  let hoursElement = now.getHours();
  if (hoursElement >= 6 && hoursElement < 12) {
    return `Good morning!`;
  }
  if (hoursElement >= 12 && hoursElement < 18) {
    return `Good afternoon!`;
  } else {
    return `Good evening!`;
  }
}

// Display elements

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#temperature-description");
  let minElement = document.querySelector("#temp-min");
  let maxElement = document.querySelector("#temp-max");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let cloudsElement = document.querySelector("#clouds");
  let dateElement = document.querySelector("#current-date");
  let greetElement = document.querySelector("#greetingUser");
  let iconElement = document.querySelector("#icon");

  now = response.data.dt * 1000;
  celsiusTemperature = Math.round(response.data.main.temp);
  minCelsiusTemperature = Math.round(response.data.main.temp_min);
  maxCelsiusTemperature = Math.round(response.data.main.temp_max);
  realFeelCelsius = Math.round(response.data.main.feels_like);

  temperatureElement.innerHTML = celsiusTemperature;
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  minElement.innerHTML = minCelsiusTemperature;
  maxElement.innerHTML = maxCelsiusTemperature;
  feelsLikeElement.innerHTML = realFeelCelsius;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  cloudsElement.innerHTML = Math.round(response.data.clouds.all);
  dateElement.innerHTML = formatDate(now);
  greetElement.innerHTML = greetUser(now);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
// Display forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
        <div class="col-2">
            <h5>
            ${formatDay(forecast.dt * 1000)}
            ${formatHours(forecast.dt * 1000)}
            </h5>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <small>${forecast.weather[0].main}</small>
            <div> 
            <span class="week-max">${Math.round(forecast.main.temp_max)}°</span>
            <span class="week-min">${Math.round(forecast.main.temp_min)}°</span>
            </div>
          </div>`;
  }
}

// Convert Units

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);

  let minTemperatureElement = document.querySelector("#temp-min");
  minTemperatureElement.innerHTML = Math.round(
    (minCelsiusTemperature * 9) / 5 + 32
  );

  let maxTemperatureElement = document.querySelector("#temp-max");
  maxTemperatureElement.innerHTML = Math.round(
    (maxCelsiusTemperature * 9) / 5 + 32
  );

  let realFeelElement = document.querySelector("#feels-like");
  realFeelElement.innerHTML = Math.round((realFeelCelsius * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = celsiusTemperature;

  let minTemperatureElement = document.querySelector("#temp-min");
  minTemperatureElement.innerHTML = minCelsiusTemperature;

  let maxTemperatureElement = document.querySelector("#temp-max");
  maxTemperatureElement.innerHTML = maxCelsiusTemperature;

  let realFeelElement = document.querySelector("#feels-like");
  realFeelElement.innerHTML = realFeelCelsius;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

// Search engine

function searchCity(city) {
  let apiKey = "9261c308257e6cb61b3c077acec2b0f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Current position

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9261c308257e6cb61b3c077acec2b0f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#search-location");
button.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;
let minCelsiusTemperature = null;
let maxCelsiusTemperature = null;
let realFeelCelsius = null;

searchCity("Porto");
