import {
  ELEMENT_UI,
  ELEMENT_URL,
  createElements,
  WEATHER_FAVOURITES,
} from "./element.js";
import { cityNameError, errorIsSameNameCities } from "./error.js";

function fetchCity(name, request) {
  const url = `${ELEMENT_URL.SERVER_URL}${request}?q=${name}&units=metric&appid=${ELEMENT_URL.API_KEY}&lang=ru`;
  return fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Город не найден");
    }
  });
}

function showTime(data, elementUi){
  const date = new Date(data * 1000);
  const hours = String(date.getHours()).length === 1 ? "0" + date.getHours(): date.getHours() ;
  const minutes = String(date.getMinutes()).length === 1 ? "0" + date.getMinutes():  date.getMinutes() ;
  return elementUi.textContent = hours + ':' + minutes
}

function showWeatherOfCity(name = ELEMENT_UI.SEARCH_CITY.value) {
  fetchCity(name, 'weather')
    .then((data) => {
      ELEMENT_UI.SHOW_CITY.textContent = data.name;
      ELEMENT_UI.TEMPETATURE.textContent = Math.round(data.main.temp);
      ELEMENT_UI.IMG.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      ELEMENT_UI.FEELS_LIKE.textContent = Math.round(data.main.feels_like) ;
      showTime(data.sys.sunrise, ELEMENT_UI.SUNRISE);
      showTime(data.sys.sunset, ELEMENT_UI.SUNSET);
    })
    .catch((error) => alert(error));
}

function showScheduleOfCity(name = ELEMENT_UI.SEARCH_CITY.value){
  fetchCity(name, 'forecast')
  .then((data) => {
    for(let i = 0; i < ELEMENT_UI.SCHEDULES.length; i++){
      showTime(data.list[i].dt, ELEMENT_UI.SCHEDULE_TIMES[i])
      ELEMENT_UI.SCHEDULE_TEMP[i].textContent = Math.round(data.list[i].main.temp) 
      ELEMENT_UI.SCHEDULE_FEELS_LIKE[i].textContent = Math.round(data.list[i].main.feels_like) 
      ELEMENT_UI.SCHEDULE_ICON[i].src =`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png` 
    }
  })
}


function addFavouriteCities() {
  try {
    cityNameError();
    const nameToCheck = WEATHER_FAVOURITES.find(
      (names) => names.NAME_CITY_FAVOURITE === ELEMENT_UI.SHOW_CITY.textContent
    );
    errorIsSameNameCities(nameToCheck);
    WEATHER_FAVOURITES.unshift({
      NAME_CITY_FAVOURITE: ELEMENT_UI.SHOW_CITY.textContent,
    });
    createFavoritesItem();
  } catch (error) {
    return alert(error);
  }
}

function deleteFavouriteCities() {
  ELEMENT_UI.ARRAY_FAVOURITES_CITY.forEach((close) => {
    close.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("favourites__city-btnClouse")) {
        target.parentNode.classList.add("delete");
        const name = document.querySelector(".delete").textContent;
        const index = WEATHER_FAVOURITES.findIndex(
          (names) => names.NAME_CITY_FAVOURITE === name
        );
        WEATHER_FAVOURITES.splice(index, 1);
        createFavoritesItem();
      }
    });
  });
}

function useFavouriteCities() {
  ELEMENT_UI.ARRAY_FAVOURITES_CITY.forEach((uses) => {
    uses.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("favourites__city-name")) {
        target.parentNode.classList.add("use");
        const name = document.querySelector(".use").textContent;
        showWeatherOfCity(name);
        showScheduleOfCity(name);
        createFavoritesItem();
      }
    });
  });
}

function createFavoritesItem() {
  ELEMENT_UI.FAVOURITES_CITY.innerHTML = "";
  WEATHER_FAVOURITES.forEach((favourites) => {
    createElements(favourites.NAME_CITY_FAVOURITE);
  });
}

ELEMENT_UI.FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  showWeatherOfCity();
  showScheduleOfCity();
  deleteFavouriteCities();
  useFavouriteCities();
  ELEMENT_UI.SEARCH_CITY.value = "";
});

ELEMENT_UI.FAVOURITES_BTN.addEventListener("click", addFavouriteCities);
