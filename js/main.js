import { showWeatherOfCity } from "./shared/weather/showWeather.js";
import { showScheduleOfCity } from "./shared/schedule/showSchedule.js";
import { ELEMENT_DOM } from "./shared/appConstants/constants.js";
import {
  addFavouriteCities,
  callAllFunctions,
} from "./shared/favorite/favoriteList.js";
import { getCurrentCity } from "./shared/localStorage/storage.js";

const { FORM, SHOW_CITY, SEARCH_CITY, FAVOURITES_BTN } = ELEMENT_DOM;

callAllFunctions();
getCurrentCity();

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  showWeatherOfCity();
  showScheduleOfCity();
  SEARCH_CITY.value = "";
});

FAVOURITES_BTN.addEventListener("click", () => {
  addFavouriteCities(SHOW_CITY);
});
