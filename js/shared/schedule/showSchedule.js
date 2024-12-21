import { ELEMENT_SCHEDULE } from "./elements.js";
import { ELEMENT_DOM } from "../appConstants/constants.js";
import { fetchCity } from "../api/requests.js";
import { showTime } from "../utilits/utilit.js";

const { SEARCH_CITY } = ELEMENT_DOM;

const {
  SCHEDULES,
  SCHEDULE_TEMP,
  SCHEDULE_FEELS_LIKE,
  SCHEDULE_ICON,
  SCHEDULE_TIMES,
} = ELEMENT_SCHEDULE;

export async function showScheduleOfCity(name = SEARCH_CITY.value) {
  try {
    const data = await fetchCity(name, "forecast");
    SCHEDULES.forEach((item, index) => {
      showTime(data.list[index].dt, SCHEDULE_TIMES[index], data.city.timezone);
      SCHEDULE_TEMP[index].textContent = Math.round(data.list[index].main.temp);
      SCHEDULE_FEELS_LIKE[index].textContent = Math.round(
        data.list[index].main.feels_like
      );
      SCHEDULE_ICON[
        index
      ].src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`;
    });
  } catch (error) {
    console.log(error);
  }
}
