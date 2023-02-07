function formatDate(date) {
    let hours = date.getHours();
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function displayForecast(day){
    let forecastElement = document.querySelector("#forecast");
    
  let days = ["Tue","Wed", "Thu", "Fri", "Sat","Sun"];
    let forecastHTML = '<div class="row">';
    days.forEach(function (day) {
        forecastHTML =
          forecastHTML +
          `
        
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
              src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/snow-day.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> -1° </span>
              <span class="weather-forecast-temperature-min"> -7° </span>
            </div>
          </div>
        
      `;
      });
      forecastHTML = forecastHTML + '</div>';
      forecastElement.innerHTML = forecastHTML;
      console.log(forecastHTML);
    }

    function getForecast(day){
        let apiKey = "6b90e2769b18e1d42f6624e571408827";
        let apiUrl = 'api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}';
      axios.get(apiUrl).then(displayForecast);
     }
   

    function displayWeatherCondition(response) {
        document.querySelector("#temperature").innerHTML = Math.round(
          response.data.main.temp
        );
        let h1 = document.querySelector("h1");
        h1.innerHTML = response.data.name;
      }

     
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
  
    celsiusTemperature = response.data.main.temp;
  
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }

  function searchCity(city) {
    let apiKey = "245f58a84dfebb440d09df1770eb1047";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search").value;
    searchCity(city);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(search);
  }
  
  function showTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let city = response.data.name;
    let weather = response.data.weather[0].description;
  
    let degrees = document.querySelector("#current-temperature");
    degrees.innerHTML = `${temperature}°C`;
    let location = document.querySelector("#current-location");
    location.innerHTML = `${city}`;
    let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;
    
  }
  
  
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
  }
  
  
  function currentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "245f58a84dfebb440d09df1770eb1047";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    let units = "metrics";
  }
  let dateElement = document.querySelector("#current-time");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  
  
  function handleSubmitCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search").value;
    searchCity(city);
  }
  
  
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  //let currentLocation = document.querySelector("#current-location");
  //location.addEventListener(getCurrentLocation);
  
  searchCity("Kyiv");
  displayForecast();