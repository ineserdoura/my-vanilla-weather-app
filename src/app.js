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
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours >= 6 || hours < 12) {
    return `Good morning 😊`;
  }
  if (hours >= 12 || hours < 18) {
    return `Good afternoon 😎`;
  }
  if (hours >= 18 || hours < 20) {
    return `Good evening 😌`;
  } else {
    return `Good night 😴`;
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
}

let apiKey = "9261c308257e6cb61b3c077acec2b0f7";
let city = "Porto";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
