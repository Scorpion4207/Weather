import { API_INFO } from "./api.js";

const { SERVER_URL, API_KEY } = API_INFO;

export function fetchCity(name, request) {
  const url = `${SERVER_URL}${request}?q=${name}&units=metric&appid=${API_KEY}&lang=ru`;
  return fetch(url).then((response) => {
    if (response.status === 404) {
      throw new Error("Ресурс не найден");
    }
    if (!response.ok) {
      throw new Error("Город не найден");
    }
    return response.json();
  });
}
