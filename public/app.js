const degreeSection = document.querySelector(".degree-section");
const temperatureDegree = document.querySelector(".temperature-degree");
const temperatureDegreeSpan = document.querySelector(".temperature-degree-span");
const locationTimezone = document.querySelector(".location-timezone");
const tempertureDescription = document.querySelector(".temperture-description");
const searchTab = document.querySelector(".search-tab");
const inputTab = document.querySelector(".input-tab");
const locationImg = document.querySelector(".icon");
const showError = document.querySelector(".error");


window.addEventListener("load", () => {
  let lon;
  let lat;
  const successCallback = (position) => {
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88dbaa22eb1fd3133ddfddd1b4374587`;
    fetch(api)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        weather(data);
        window.celcius = Math.floor(data.main.temp - 273);
        window.fahrenhite = Math.floor(((data.main.temp - 273) * 9) / 5 + 32);
      });
  };
  const errorCallback = (error)=>{
    errorhandler(error);
  }
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});

searchTab.addEventListener("click", () => {
  const cityapi = `https://api.openweathermap.org/data/2.5/weather?q=${inputTab.value}&appid=88dbaa22eb1fd3133ddfddd1b4374587`;
  fetch(cityapi)
    .then((response) => {
      if (response.ok) {
        return response.json();  
      }
      else{
        cityerror();
        return;
      }
    })
    .then((data) => {
      weather(data);
      showError.innerHTML = `<h3></h3>`;
      window.celcius = Math.floor(data.main.temp - 273);
      window.fahrenhite = Math.floor(((data.main.temp - 273) * 9) / 5 + 32);
      inputTab.value = "";
    });
});
function errorhandler(error) {
  showError.style.display = "block";
  showError.innerHTML = `<h3>${error.message}</h3>`;
}
function weather(data) {
  locationTimezone.textContent = data.name;
  locationImg.innerHTML = `<img src="./icons/${data.weather[0].icon}.png"></img>`;
  temperatureDegree.textContent = Math.floor(data.main.temp - 273);
  temperatureDegreeSpan.textContent = "°C";
  tempertureDescription.textContent = data.weather[0].description;
}
degreeSection.addEventListener("click", () => {
  if (temperatureDegreeSpan.textContent === "°F") {
    temperatureDegree.textContent = celcius;
    temperatureDegreeSpan.textContent = "°C";
  } else {
    temperatureDegree.textContent = fahrenhite;
    temperatureDegreeSpan.textContent = "°F";
  }
});
function cityerror(){
  locationTimezone.textContent = "Location not found";
  locationImg.innerHTML = `<img src="./icons/unknown.png"></img>`;
  temperatureDegree.textContent = "--";
  temperatureDegreeSpan.textContent = "°C";
  tempertureDescription.textContent = "------";
  inputTab.value = "";
  showError.innerHTML = `<h3></h3>`;
}