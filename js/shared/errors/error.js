import { ELEMENT_DOM } from "../appConstants/constants.js";

const { SHOW_CITY } = ELEMENT_DOM;

const ERROR_MESSAGE = {
  SLOTS: "Нет свобоных слотов под избранные города, удалите какой нибудь город",
  NAME_CITY: "Найдите город для добавления в список избранных",
  SAME_NAME_CITY: "Этот город уже является избранным",
};

export const cityNameError = (arrFavorite) => {
  if ([...arrFavorite].length > 4) {
    throw new Error(ERROR_MESSAGE.SLOTS);
  }
  if (SHOW_CITY.textContent === "") {
    throw new Error(ERROR_MESSAGE.NAME_CITY);
  }
};

export const errorIsSameNameCities = (arrFavorite) => {
  if (arrFavorite.has(SHOW_CITY.textContent) === true) {
    throw new Error(ERROR_MESSAGE.SAME_NAME_CITY);
  }
};
