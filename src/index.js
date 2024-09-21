function actionSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#weather-app-city");
  city.innerHTML = searchInput.value;
}

//Process form submission
let searchForCityForm = document.querySelector("#search-for-city-form");
searchForCityForm.addEventListener("submit", actionSubmit);
