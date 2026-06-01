const weatherForm = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#cityInput");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("#error");
const weatherResult = document.querySelector("#weatherResult");
const historyList = document.querySelector("#historyList");

let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

function showLoading() {
  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");
  weatherResult.classList.add("hidden");
}

function showError(message) {
  loading.classList.add("hidden");
  weatherResult.classList.add("hidden");
  errorBox.classList.remove("hidden");
  errorBox.textContent = message;
}

function showWeather(city, weather) {
  loading.classList.add("hidden");
  errorBox.classList.add("hidden");
  weatherResult.classList.remove("hidden");

  weatherResult.textContent = "";

  const title = document.createElement("h2");
  title.textContent = city;

  const icon = document.createElement("img");
  icon.src = weather.weatherIconUrl[0].value;
  icon.alt = weather.weatherDesc[0].value;

  const temp = document.createElement("p");
  temp.textContent = "Nhiệt độ: " + weather.temp_C + "°C";

  const humidity = document.createElement("p");
  humidity.textContent = "Độ ẩm: " + weather.humidity + "%";

  const desc = document.createElement("p");
  desc.textContent = "Mô tả: " + weather.weatherDesc[0].value;

  weatherResult.appendChild(title);
  weatherResult.appendChild(icon);
  weatherResult.appendChild(temp);
  weatherResult.appendChild(humidity);
  weatherResult.appendChild(desc);
}

async function getWeather(city) {
  try {
    showLoading();

    const url = "https://wttr.in/" + encodeURIComponent(city) + "?format=j1";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Không lấy được dữ liệu thời tiết");
    }

    const data = await response.json();

    if (!data.current_condition || data.current_condition.length === 0) {
      throw new Error("Không tìm thấy thành phố");
    }

    showWeather(city, data.current_condition[0]);
    saveHistory(city);
  } catch (error) {
    showError("Lỗi: " + error.message);
  }
}

function saveHistory(city) {
  city = city.trim();

  searchHistory = searchHistory.filter(
    (item) => item.toLowerCase() !== city.toLowerCase(),
  );
  searchHistory.unshift(city);
  searchHistory = searchHistory.slice(0, 5);

  localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
  renderHistory();
}

function renderHistory() {
  historyList.textContent = "";

  for (let i = 0; i < searchHistory.length; i++) {
    const item = document.createElement("span");
    item.classList.add("history-item");
    item.textContent = searchHistory[i];

    item.addEventListener("click", function () {
      cityInput.value = searchHistory[i];
      getWeather(searchHistory[i]);
    });

    historyList.appendChild(item);
  }
}

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    showError("Vui lòng nhập tên thành phố");
    return;
  }

  getWeather(city);
});

renderHistory();
