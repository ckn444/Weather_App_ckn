//Get city data from form event and pass it to getCityData function
function actionSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getCityData(searchInput.value);
}

//Retrieve the submitted city's data from the API and pass it to the showTempurature function
function getCityData(city) {
  let apiKey = "073da528da745of5bbcaae543e06t78e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(showWeather);
}

//Use the provided city data to populate city and current weather
function showWeather(response) {
  console.log(response.data); //test only
  let city = document.querySelector("#weather-app-city");
  let temp = document.querySelector("#current-temp");
  let description = document.querySelector("#description");

  city.innerHTML = response.data.city;
  temp.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition.description;
}

//Process form submission
let searchForCityForm = document.querySelector("#search-for-city-form");
searchForCityForm.addEventListener("submit", actionSubmit);
