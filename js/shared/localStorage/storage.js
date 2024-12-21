import { showWeatherOfCity } from "../weather/showWeather.js";
import { showScheduleOfCity } from "../schedule/showSchedule.js";
import Cookies from "js-cookie";

export function getFavoriteCity() {
  const rowCity = JSON.parse(localStorage.getItem("favorite"));
  return rowCity !== null ? new Set(rowCity) : new Set([]);
}

export function getCurrentCity() {
  const current = Cookies.get("current") ?? 'Новосибирск';
  showWeatherOfCity(current);
  showScheduleOfCity(current);
}

export function setFavoriteCity(arrFavorite) {
  localStorage.setItem("favorite", JSON.stringify([...arrFavorite]));
}
