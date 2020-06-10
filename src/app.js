// Display current date

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} <br/>${month}, ${getOrdinal(
    date
  )} ${year} <br/> <small>Last updated ${hours}:${minutes}</small>`;
}

//Greet user

function greetUser(timestamp) {
  let name = prompt("Hello! Can you tell me your name?");
  let now = new Date(timestamp);
  let hoursElement = now.getHours();
  if (hoursElement >= 6 && hoursElement < 12) {
    return `Good morning ${name}!`;
  }
  if (hoursElement >= 12 && hoursElement < 18) {
    return `Good afternoon ${name}!`;
  }
  if (hoursElement >= 18 && hoursElement < 20) {
    return `Good evening ${name}!`;
  } else {
    return `Good night ${name}!`;
  }
}

// Update quote

function updtadeQuote(response) {
  let description = response;

  if (description === "Thunderstorm") {
    return `Someone is angry up there ⚡️`;
  }
  if (description === "Drizzle") {
    return `Don't forget your umbrella ☔️`;
  }
  if (description === "Rain") {
    return `Don't forget your umbrella ☔️`;
  }
  if (description === "Snow") {
    return `Do you want to build a snowman? ☃️`;
  }
  if (description === "Clear" && hour < 20) {
    return `The sun is shinning today 😎`;
  }
  if (description === "Clear" && hour >= 20) {
    return `The moon is shinning tonight 🌕`;
  }
  if (description === "Clouds" && hour < 20) {
    return `The sun is a little shy today 🌤`;
  }
  if (description === "Clouds" && hour >= 20) {
    return `The moon is a little shy today 🌛`;
  } else {
    return `What's happening in your city? 🤷🏽‍♀️`;
  }
}

let now = new Date();
let hour = now.getHours();

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
  let quoteElement = document.querySelector("#quote");

  now = response.data.dt * 1000;
  celsiusTemperature = Math.round(response.data.main.temp);
  minCelsiusTemperature = Math.round(response.data.main.temp_min);
  maxCelsiusTemperature = Math.round(response.data.main.temp_max);
  realFeelCelsius = Math.round(response.data.main.feels_like);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  cloudsElement.innerHTML = Math.round(response.data.clouds.all);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  greetElement.innerHTML = greetUser(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  quoteElement.innerHTML = updtadeQuote(response.data.weather[0].main);
}

// Search form

function searchCity(city) {
  let apiKey = "9261c308257e6cb61b3c077acec2b0f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

searchCity("Porto");

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
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#search-location");
button.addEventListener("click", getCurrentPosition);

// Convert Units

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = fahrenheitTemp;

  let minTemperature = Math.round((minCelsiusTemperature * 9) / 5 + 32);
  let minTemperatureElement = document.querySelector("#temp-min");
  minTemperatureElement.innerHTML = minTemperature;

  let maxTemperature = Math.round((maxCelsiusTemperature * 9) / 5 + 32);
  let maxTemperatureElement = document.querySelector("#temp-max");
  maxTemperatureElement.innerHTML = maxTemperature;

  let realFeelTemperature = Math.round((realFeelCelsius * 9) / 5 + 32);
  let realFeelElement = document.querySelector("#feels-like");
  realFeelElement.innerHTML = realFeelTemperature;
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

let celsiusTemperature = null;
let minCelsiusTemperature = null;
let maxCelsiusTemperature = null;
let realFeelCelsius = null;
