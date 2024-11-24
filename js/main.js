import {
  ELEMENT_UI,
  ELEMENT_URL,
  createElements,
  WEATHER_FAVOURITES,
} from "./element.js";
import { cityNameError, errorIsSameNameCities } from "./error.js";

function fetchCityWeather(name = 'Москва') {
  const url = `${ELEMENT_URL.SERVER_URL}?q=${name}&units=metric&appid=${ELEMENT_URL.API_KEY}&lang=ru`;
  return fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Город не найден");
    }
  });
}



function showWeatherOfCity(name = ELEMENT_UI.SEARCH_CITY.value) {
  fetchCityWeather(name)
    .then((data) => {
      ELEMENT_UI.SHOW_CITY.textContent = data.name;
      ELEMENT_UI.TEMPETATURE.textContent = Math.round(data.main.temp);
      ELEMENT_UI.IMG.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    })
    .catch((error) => alert(error));
}

showWeatherOfCity('Москва')


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
  deleteFavouriteCities();
  useFavouriteCities();
  ELEMENT_UI.SEARCH_CITY.value = "";
});

ELEMENT_UI.FAVOURITES_BTN.addEventListener("click", addFavouriteCities);
