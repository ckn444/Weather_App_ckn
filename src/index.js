//format day and time
function formatDate(date) {
  let day = date.getDay();
  //format minutes so that even if it is between minute 1 and 9 it will show as 2 digits
  let formattedMinute = String(date.getMinutes()).padStart(2, "0");
  let currentTimeValue = `${date.getHours()}:${formattedMinute}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDayValue = days[day];
  return `${currentDayValue} at ${currentTimeValue}`;
}

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
  let degrees = document.querySelector("#degrees");
  let description = document.querySelector("#description");
  let humidityHeading = document.querySelector("#humidity-heading");
  let humidity = document.querySelector("#humidity");
  let windHeading = document.querySelector("#wind-heading");
  let windSpeed = document.querySelector("#wind-speed");
  let dateTime = new Date(response.data.time * 1000);
  let currentTime = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  temp.innerHTML = Math.round(response.data.temperature.current);
  degrees.innerHTML = `°C`;
  description.innerHTML = response.data.condition.description;
  humidityHeading.innerHTML = `Humidity: `;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} km/hr`;
  windHeading.innerHTML = `Wind: `;
  currentTime.innerHTML = formatDate(dateTime);
  icon.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="current-temp-icon"
              />`;

  getForecastData(response.data.city);
}

//forecast section processing
//Note: due to the timestamp on the retrieved data being fixed to 1am, there is a point in time where the forecast day is the same as the current day.
//I have changed the assignment to ensure that the first day of the forecast is always "tomorrow"

function formatDay(dayIndex) {
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  console.log(`this is the day index ${dayIndex}`);

  let day = days[dayIndex];

  return day;
}

function getForecastData(city) {
  let apiKey = "073da528da745of5bbcaae543e06t78e";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);

  let forecastHtml = "";
  let currentDate = new Date();
  let currentDayIndex = currentDate.getDay();
  console.log(currentDayIndex);

  for (let i = currentDayIndex + 1; i < currentDayIndex + 6; i++) {
    console.log(i);
    console.log(response.data.daily[i].temperature.maximum);
    forecastHtml =
      forecastHtml +
      `
         <div class="weather-forecast-day">
           <div class="weather-forecast-date">${formatDay(i)}</div>
           <div>
           <img class="weather-forecast-icon" src="${
             response.data.daily[i].condition.icon_url
           }"/></div>
           <div class="weather-forecast-temps">
             <div class="weather-forecast-temp">
               <strong>${Math.round(
                 response.data.daily[i].temperature.maximum
               )}°</strong>
             </div>
             <div class="weather-forecast-temp">${Math.round(
               response.data.daily[i].temperature.minimum
             )}°</div>
           </div>
         </div>`;
  }
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

//Process form submission
let searchForCityForm = document.querySelector("#search-for-city-form");
searchForCityForm.addEventListener("submit", actionSubmit);
