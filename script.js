let searchName = document.querySelector("#search-box");
searchName.value = "London";

let tempUnit = [...document.querySelectorAll("#unit-mesure")];
let submitBtn = document.querySelector('button[type="submit"]');

tempUnit.forEach((unit) => {
  unit.addEventListener("change", () => {
    return (selectedUnit = unit.value);
  });
});

let selectedUnit = "metric";

let weatherData;
let cityNameData = document.querySelector(".location-name");
let temp = document.querySelector(".temp");
let feelsLikeTemp = document.querySelector(".feelsLike");
let pressure = document.querySelector(".presure");
let weatherDescription = document.querySelector(".description");
let windSpeed = document.querySelector(".wind");

async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchName.value}&appid=3250ef26a3e988b227b3eff768815792&units=${selectedUnit}`,
    { mode: "cors" }
  );
  weatherData = await response.json();
}

function organizeData() {
  cityNameData.textContent = weatherData.name;
  temp.textContent = `${weatherData.main.temp} ${mesure}`;
  feelsLikeTemp.textContent = `${weatherData.main.feels_like} ${mesure}`;
  pressure.textContent = weatherData.main.pressure + " mb";
  weatherDescription.textContent =
    weatherData.weather[0].description.toUpperCase();
  windSpeed.textContent = `${weatherData.wind.speed} ${speedUnit}`;
}

async function newInfo() {
  await getWeather();
  if (selectedUnit == "metric") {
    mesure = "°C";
    speedUnit = "m/s";
  } else {
    mesure = "°F";
    speedUnit = "mi/h";
  }
  organizeData();
}
newInfo();

submitBtn.addEventListener("click", newInfo);
