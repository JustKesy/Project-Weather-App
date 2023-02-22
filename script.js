let cityName = document.querySelector("#search-box");
cityName.value = "bajina basta";

let tempUnit = [...document.querySelectorAll("#unit-mesure")];
let submitBtn = document.querySelector('button[type="submit"]');

tempUnit.forEach((unit) => {
  unit.addEventListener("change", () => {
    console.log(unit.value);
    return (selectedUnit = unit.value);
  });
});

let selectedUnit = "metric";

let weatherData;
let cityNameData;
let temp;
let feelsLikeTemp;
let pressure;
let weatherDescription;
let windSpeed;

async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=3250ef26a3e988b227b3eff768815792&units=${selectedUnit}`,
    { mode: "cors" }
  );
  weatherData = await response.json();
}

function organizeData() {
  cityNameData = weatherData.name;
  temp = weatherData.main.temp;
  feelsLikeTemp = weatherData.main.feels_like;
  pressure = weatherData.main.pressure;
  weatherDescription = weatherData.weather[0].description;
  windSpeed = weatherData.wind.speed;
  console.log({
    cityNameData,
    temp,
    feelsLikeTemp,
    pressure,
    weatherDescription,
    windSpeed,
  });
}

getWeather().then(() => {
  console.log(weatherData);
  organizeData();
});

submitBtn.addEventListener("click", () => {
  getWeather().then(() => {
    console.log(weatherData);
    organizeData();
  });
});
