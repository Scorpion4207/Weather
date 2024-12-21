import { getFavoriteCity, setFavoriteCity } from "../localStorage/storage.js";
import { ELEMENT_FAVORITE } from "./elements.js";
import { createElements, inFifteenMinutes } from "../utilits/utilit.js";
import { showWeatherOfCity } from "../weather/showWeather.js";
import { showScheduleOfCity } from "../schedule/showSchedule.js";
import { cityNameError, errorIsSameNameCities } from "../errors/error.js";
import Cookies from 'js-cookie'

const {FAVOURITES_CITY, ARRAY_FAVOURITES_CITY} = ELEMENT_FAVORITE

const favoriteCities = getFavoriteCity()

export function callAllFunctions(){
  deleteFavouriteCities()
  useFavouriteCities()
  renderFavoritesList()
}

export function addFavouriteCities(name) {
  try {
    cityNameError(favoriteCities)
    errorIsSameNameCities(favoriteCities)
    favoriteCities.add(name.textContent);
    renderFavoritesList();
  } catch (error) {
    return alert(error);
  }
}


function deleteFavouriteCities() {
    ARRAY_FAVOURITES_CITY.forEach((close) => {
    close.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("favourites__city-btnClouse")) {
        target.parentNode.classList.add("delete");
        const name = document.querySelector(".delete").textContent;
        favoriteCities.delete(name);
        renderFavoritesList();
      }
    });
  });
}

function useFavouriteCities() {
    ARRAY_FAVOURITES_CITY.forEach((uses) => {
    uses.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("favourites__city-name")) {
        target.parentNode.classList.add("use");
        const name = document.querySelector(".use").textContent;
        Cookies.set('current', name, { expires: inFifteenMinutes})
        showWeatherOfCity(name);
        showScheduleOfCity(name);
        renderFavoritesList();
      }
    });
  });
}

function renderFavoritesList() {
  FAVOURITES_CITY.innerHTML = "";
  favoriteCities.forEach((favourites) => {
    createElements(favourites);
  });
  setFavoriteCity(favoriteCities)
}

