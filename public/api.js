const app = document.querySelector(".weather-app");
const cityOutput = document.querySelector(".city");
const countryOutput = document.querySelector(".country");
const conditionOutput = document.querySelector(".condition");
const tempOutputC = document.querySelector(".temp-c");
const tempOutputF = document.querySelector(".temp-f");
const icon = document.querySelector(".icon");
const timeOutput = document.querySelector(".time");
const dateOutput = document.querySelector(".date");
const searchInput = document.querySelector("#check-city");
const form = document.forms[0];
let city;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});

async function getWeatherData() {
  if (!searchInput.value) {
    city = "London";
    return;
  }

  city = searchInput.value;

  try {
    const weather_url = `/weather/${city}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const current = weather_data.current;
    const location = weather_data.location;

    // Location

    cityOutput.textContent = city;
    countryOutput.textContent = location.country;

    // Weather condition

    conditionOutput.textContent = current.condition.text;
    icon.src = current.condition.icon;

    // Temp

    tempOutputC.innerHTML = current.temp_c + `&deg;C`;
    tempOutputF.innerHTML = current.temp_f + `&deg;F`;

    // Date & Time

    dateOutput.textContent = location.localtime.substring(0, 10);
    timeOutput.textContent = location.localtime.substring(11, 16);

    // Background based on condition code

    let conditionCode = current.condition.code;
    let isDay = current.is_day;
    let timeOfDay = "day";

    if (isDay === 0) {
      timeOfDay = "night";
    }

    if (conditionCode === 1000) {
      app.style.background = `url('./images/${timeOfDay}/clear.jpg')`;
      app.style.backgroundRepeat = "no-repeat";
      app.style.backgroundSize = "cover";
    } else if (
      conditionCode == 1003 ||
      conditionCode == 1006 ||
      conditionCode == 1009 ||
      conditionCode == 1030 ||
      conditionCode == 1069 ||
      conditionCode == 1087 ||
      conditionCode == 1135 ||
      conditionCode == 1273 ||
      conditionCode == 1276 ||
      conditionCode == 1279 ||
      conditionCode == 1282
    ) {
      app.style.background = `url('./images/${timeOfDay}/cloudy.jpg')`;
      app.style.backgroundRepeat = "no-repeat";
      app.style.backgroundSize = "cover";
    } else if (
      conditionCode == 1063 ||
      conditionCode == 1069 ||
      conditionCode == 1072 ||
      conditionCode == 1150 ||
      conditionCode == 1153 ||
      conditionCode == 1180 ||
      conditionCode == 1183 ||
      conditionCode == 1186 ||
      conditionCode == 1189 ||
      conditionCode == 1192 ||
      conditionCode == 1195 ||
      conditionCode == 1204 ||
      conditionCode == 1207 ||
      conditionCode == 1240 ||
      conditionCode == 1243 ||
      conditionCode == 1246 ||
      conditionCode == 1249 ||
      conditionCode == 1252
    ) {
      app.style.background = `url('./images/${timeOfDay}/rain.jpg')`;
      app.style.backgroundRepeat = "no-repeat";
      app.style.backgroundSize = "cover";
    } else {
      app.style.background = `url('./images/${timeOfDay}/snow.jpg')`;

      app.style.backgroundRepeat = "no-repeat";
      app.style.backgroundSize = "cover";
    }
  } catch (error) {
    cityOutput.textContent = "no results";
    countryOutput.textContent = "-/-";
    icon.src = "";
    conditionOutput.textContent = "-/-";
    tempOutputC.textContent = "-/-";
    tempOutputF.textContent = "-/-";
    dateOutput.textContent = "-/-";
    timeOutput.textContent = "-/-";
  }
}
