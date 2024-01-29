let yourLocationBtn = document.querySelector(".location-type .your-location");
let searchLocationBtn = document.querySelector(".location-type .search-location");
let displayContainer = document.querySelector(".display-container");
let searchBar = document.querySelector(".search-bar");
let searchInput = document.querySelector(".search-bar .search");
let searchIcon = document.querySelector(".search-bar .search-icon");
let waitingLoader = document.querySelector(".waiting-loader");
let weatherDisplay = document.querySelector(".weather-display");
let cityName = document.querySelector(".weather-display .city-name");
let condition = document.querySelector(".city-weather .condition");
let conditionImg = document.querySelector(".city-weather .condition-img img");
let temp = document.querySelector(".temp-display .temp");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let clouds = document.querySelector("#clouds");
let errorMsg = document.querySelector(".error-msg");

let longitude;
let latitude;
let city;
let apiKey = "d853c9988cf1462ca5f101643242501";


// default action when the pages loads/reloads
searchBar.classList.add("in-active");
weatherDisplay.classList.add("in-active");
errorMsg.classList.add("in-active");

searchBar.style.display = "none";

function getCoordinates(){
   if ("geolocation" in navigator) {
      // Geolocation is supported
      // Your code to get the location goes here

      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Success callback
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          getWeatherDetailsByCoordinates();
       
         //   console.log("Latitude: " + latitude + ", Longitude: " + longitude);
        },
        function (error) {
          // Error callback
          //   console.error("Error getting location: " + error.message);
          // loader is in-active
          waitingLoader.classList.remove("active");
          waitingLoader.classList.add("in-active");

          // error msg is active
          errorMsg.classList.remove("in-active");
          errorMsg.classList.add("active");
         }
       );
       
    } 
    else {
      // Geolocation is not supported
      // console.error("Geolocation is not supported by this browser.");
      // loader is in-active
      waitingLoader.classList.remove("active");
      waitingLoader.classList.add("in-active");

      // error msg is active
      errorMsg.classList.remove("in-active");
      errorMsg.classList.add("active");
    }
    
}

getCoordinates();

async function getWeatherDetailsByCoordinates(){
  try{
    // fetch api call
    let res = await fetch(`http://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=${apiKey}`);
    let data = await res.json();

    console.log(data);

    // data added to dom elements
    cityName.textContent = data.location.name;

    condition.textContent = data.current.condition.text;
    conditionImg.setAttribute("src", `${data.current.condition.icon}`);

    temp.textContent = data.current.temp_c;

    windSpeed.textContent = data.current.wind_kph;
    humidity.textContent = data.current.humidity;
    clouds.textContent = data.current.cloud;

    // loader is in-active
    waitingLoader.classList.remove("active");
    waitingLoader.classList.add("in-active");
    
    // weather display is active
    weatherDisplay.classList.remove("in-active");
    weatherDisplay.classList.add("active");
  }
  catch(err)
  {
    // loader is in-active
    waitingLoader.classList.remove("active");
    waitingLoader.classList.add("in-active");

    // error msg is active
    errorMsg.classList.remove("in-active");
    errorMsg.classList.add("active");
  } 

}


// your location weather details
yourLocationBtn.addEventListener("click", ()=>{

  searchLocationBtn.style.backgroundColor = "transparent";
  yourLocationBtn.style.backgroundColor = "rgba(255, 255, 255, 0.25)";

  searchBar.style.display = "none";

  searchBar.classList.remove("active");
  searchBar.classList.add("in-active");

  waitingLoader.classList.remove("in-active");
  waitingLoader.classList.add("active");

  weatherDisplay.classList.remove("active");
  weatherDisplay.classList.add("in-active");

  errorMsg.classList.remove("active");
  errorMsg.classList.add("in-active");

  searchInput.value = "";
  city = "";

  getCoordinates();
});


// search location weather details
searchLocationBtn.addEventListener("click", ()=>{

  searchLocationBtn.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
  yourLocationBtn.style.backgroundColor = "transparent";

  searchBar.style.display = "flex";

  searchBar.classList.remove("in-active");
  searchBar.classList.add("active");

  // loader is in-active
  waitingLoader.classList.remove("active");
  waitingLoader.classList.add("in-active");

  // weather display is active
  weatherDisplay.classList.remove("active");
  weatherDisplay.classList.add("in-active");

  // error msg in-active
  errorMsg.classList.remove("active");
  errorMsg.classList.add("in-active");
});

searchInput.addEventListener("change", ()=>{
  city = searchInput.value;
})

searchIcon.addEventListener("click", ()=>{
  // loader is active
  waitingLoader.classList.remove("in-active");
  waitingLoader.classList.add("active");

  // error msg in-active
  errorMsg.classList.remove("active");
  errorMsg.classList.add("in-active");

  // weather display is active
  weatherDisplay.classList.remove("active");
  weatherDisplay.classList.add("in-active");

  getWeatherDetailsByCity();
})

async function getWeatherDetailsByCity(){
  try{
    // fetch api call
    let res = await fetch(`http://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`);
    let data = await res.json();

    console.log(data);

    // data added to dom elements
    cityName.textContent = data.location.name;

    condition.textContent = data.current.condition.text;
    conditionImg.setAttribute("src", `${data.current.condition.icon}`);

    temp.textContent = data.current.temp_c;

    windSpeed.textContent = data.current.wind_kph;
    humidity.textContent = data.current.humidity;
    clouds.textContent = data.current.cloud;

    // loader is in-active
    waitingLoader.classList.remove("active");
    waitingLoader.classList.add("in-active");
    
    // weather display is active
    weatherDisplay.classList.remove("in-active");
    weatherDisplay.classList.add("active");
  }
  catch(err)
  {
    // loader is in-active
    waitingLoader.classList.remove("active");
    waitingLoader.classList.add("in-active");

    // error msg is active
    errorMsg.classList.remove("in-active");
    errorMsg.classList.add("active");
  }
}