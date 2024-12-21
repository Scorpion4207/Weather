import { format } from "date-fns";
import { ELEMENT_FAVORITE } from "../favorite/elements.js";

const { FAVOURITES_CITY } = ELEMENT_FAVORITE;

export const createElements = (name) => {
  const newLi = document.createElement("li");
  const newDiv = document.createElement("div");
  const newBtn = document.createElement("button");
  newLi.classList.add("favourites__city-item");
  newDiv.classList.add("favourites__city-name");
  newBtn.classList.add("favourites__city-btnClouse");
  newDiv.textContent = name;
  newLi.prepend(newDiv, newBtn);
  FAVOURITES_CITY.prepend(newLi);
};

export function showTime(data, elementUi, timezone) {
  const date = format(
    new Date(data * 1000).getTime() -
      -new Date(timezone * 1000) +
      new Date().getTimezoneOffset() * 60 * 1000,
    "HH:mm"
  );
  return (elementUi.textContent = date);
}

export const inFifteenMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
