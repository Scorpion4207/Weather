export const ELEMENT_UI = {
  FORM: document.getElementById("form"),
  SHOW_CITY: document.getElementById("showCity"),
  SEARCH_CITY: document.getElementById("searchCity"),
  TEMPETATURE: document.getElementById("temperature"),
  IMG: document.getElementById("img"),
  FEELS_LIKE: document.getElementById('feelsLike__temperature'),
  FAVOURITES_CITY: document.getElementById("favouritesCity"),
  ARRAY_FAVOURITES_CITY: document.querySelectorAll('#favouritesCity'),
  FAVOURITES_BTN: document.getElementById("favouritesBtn"),
  SUNSET: document.getElementById('sunset'),
  SUNRISE: document.getElementById('sunrise'),
  SCHEDULES:document.querySelectorAll('.degree-indicator__temperature-schedule'),
  SCHEDULE_TEMP:document.querySelectorAll('.schedule-temperature'),
  SCHEDULE_FEELS_LIKE:document.querySelectorAll('.schedule-feels-like'),
  SCHEDULE_ICON:document.querySelectorAll('.schedule__icon'),
  SCHEDULE_TIMES:document.querySelectorAll('.temperature-schedule-time'),
};

export const ELEMENT_URL = {
  API_KEY: "e11980e221fe6c46d4a61d25c357da65",
  SERVER_URL: "https://api.openweathermap.org/data/2.5/",
};

export const WEATHER_FAVOURITES = [];

export const createElements = (name) =>{
  const newLi = document.createElement('li')
  const newDiv = document.createElement('div')
  const newBtn = document.createElement("button")
  newLi.classList.add('favourites__city-item') 
  newDiv.classList.add('favourites__city-name')
  newBtn.classList.add('favourites__city-btnClouse')
  newDiv.textContent = name
  newLi.prepend(newDiv, newBtn)
  ELEMENT_UI.FAVOURITES_CITY.prepend(newLi)
}
