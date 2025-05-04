function curentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function refreshWeather(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let descriptionWeather = document.querySelector("#description");
  descriptionWeather.innerHTML = response.data.condition.description;
  let humidityWeather = document.querySelector("#humidity");
  humidityWeather.innerHTML = response.data.temperature.humidity;
  let windWeather = document.querySelector("#wind");
  windWeather.innerHTML = response.data.wind.speed;
  let temperatureWeather = document.querySelector("#temperature");
  temperatureWeather.innerHTML = Math.round(response.data.temperature.current);
  let dateWeather = document.querySelector("#date");
  let fullDate = new Date(response.data.time * 1000);
  dateWeather.innerHTML = curentDate(fullDate);
  let iconWeather = document.querySelector("#icon");
  iconWeather.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon-temp" alt="" />`;
  getForecast(response.data.city);
}

function searchCity(city) {
  let apikey = "dboef2d023e8b54bffat4b762d81356c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function cityToSearch(event) {
  event.preventDefault();
  let newCity = document.querySelector("#input-element");
  searchCity(newCity.value);
}

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", cityToSearch);

searchCity("Lviv");

function getForecast(city) {
  let week = ["sun", "mon", "tue", "wed", "thu"];
  forecastHtml = "";
  week.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="text-center">
            <div class="text-muted">${day}</div>
            <img src="img/clear-sky-day.png" style="width: 88px" />
            <div><span class="color-data">26° 15°</span></div>
          </div>
          
`;
  });
  let forecastWeather = document.querySelector("#forecast");
  forecastWeather.innerHTML = forecastHtml;
}
