import { ELEMENT_UI, WEATHER_FAVOURITES } from "./element.js";

const ERROR_MESSAGE = {
  SLOTS: "Нет свобоных слотов под избранные города, удалите какой нибудь город",
  NAME_CITY: "Найдите город для добавления в список избранных",
  SAME_NAME_CITY: "Этот город уже является избранным",
}

export const cityNameError = () => {
    if(WEATHER_FAVOURITES.length > 4){
        throw new Error(ERROR_MESSAGE.SLOTS);
    }
    if(ELEMENT_UI.SHOW_CITY.textContent === ""){
      throw new Error(ERROR_MESSAGE.NAME_CITY);
    }
}

export const errorIsSameNameCities = (name) => {
  if(name !== undefined){
    throw new Error(ERROR_MESSAGE.SAME_NAME_CITY);
  }
}