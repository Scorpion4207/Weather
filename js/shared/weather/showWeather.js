import { ELEMENT_WEATHER } from "./elements.js";
import { ELEMENT_DOM } from "../appConstants/constants.js";
import { fetchCity } from "../api/requests.js";
import { showTime, inFifteenMinutes } from "../utilits/utilit.js";
import Cookies from "js-cookie";

const { SHOW_CITY, SEARCH_CITY } = ELEMENT_DOM;
const { TEMPETATURE, IMG, FEELS_LIKE, SUNSET, SUNRISE } = ELEMENT_WEATHER;

export async function showWeatherOfCity(name = SEARCH_CITY.value) {
  try {
    const data = await fetchCity(name, "weather");
    SHOW_CITY.textContent = data.name;
    Cookies.set("current", SHOW_CITY.textContent, {
      expires: 9000,
    });
    TEMPETATURE.textContent = Math.round(data.main.temp) + "°";
    IMG.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    FEELS_LIKE.textContent = Math.round(data.main.feels_like);
    showTime(data.sys.sunrise, SUNRISE, data.timezone);
    showTime(data.sys.sunset, SUNSET, data.timezone);
  } catch (error) {
    alert(error);
  }
}
