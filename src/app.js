// Display Elements

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#temperature-description");
  let minElement = document.querySelector("#temp-min");
  let maxElement = document.querySelector("#temp-max");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let cloudsElement = document.querySelector("#clouds");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  cloudsElement.innerHTML = Math.round(response.data.clouds.all);
}

let apiKey = "9261c308257e6cb61b3c077acec2b0f7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Porto&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
