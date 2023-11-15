// Элементы управления
const SEARCH_BUTTON = document.querySelector("#search-button");
const SEARCH_CITY_INPUT = document.querySelector("#city-input");

// Контейнеры для отображения
const LOADING_TEXT = document.querySelector("#load");
const WEATHER_INFO_CONTAINER = document.querySelector(
  "#weather-info-container"
);

// Тексты с информацией
const WEATHER_CITY = document.querySelector("#weather-city");
const WEATHER_ICON = document.querySelector("#weather-icon");
const DEGREE = document.querySelector("#degree");

const APP_ID = "72bbdf1b10168e5e2dc5ec7ceedf1f49";

// Создадим функцию createWeatherCard, которая будет принимать в себя в кажестве аргумента
// данные о погоде в случае успешного ответа с сервера
const createWeaterCard = (weatherData) => {
  WEATHER_CITY.textContent = weatherData.name;
  DEGREE.textContent = Math.round(weatherData.main.temp - 273.15)  + "°";
  // Добавление иконки
  WEATHER_ICON.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  // Делаем индикатор загрузки невидимым, а WEATHER_INFO_CONTAINER блок видимым
  LOADING_TEXT.style.display = "none";
  WEATHER_INFO_CONTAINER.style.display = "flex";
};

// Создадим асинхронную функцию searchWeatherForCity, которая будет делать наш запрос
// на openweatherapp и показазывать блок с погодой или с ошибкой, в зависимости от результата выполнения запроса
async function searchWeatherForCity() {
  // Получаем данные с инпута SEARCH_CITY_INPUT и убираем пробелы
  const CITY_NAME = SEARCH_CITY_INPUT.value.trim();
  console.log(CITY_NAME);

  // Создаем URL для запроса на openweathermap, прокинув CITY_NAME, APP_ID
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${APP_ID}`;

  if (CITY_NAME.length === 0) {
    return alert("Please enter a city name");
  }
  LOADING_TEXT.style.display = "flex";
  WEATHER_INFO_CONTAINER.style.display = "none";
  try {
    const response = await fetch(URL);
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      throw Object.assign(new Error("Request failed"), {
        response: result,
      });
    }
    // Передаем функции createWeatherCard наш result, чтобы создать и показываем карточку с погодой
    createWeaterCard(result);
  } catch (error) {
    console.log(error);
    console.log(error.response);
    // тут нужно будет написать код по работе с ошибками и их отображениямт на экране

    const ERROR = 'API Error';
    createWeaterCard(ERROR);
  }
}

// Вызываем метод addEventListener для того, чтобы на click вызвать функцию searchWeatherForCity
SEARCH_BUTTON.addEventListener("click", searchWeatherForCity);
