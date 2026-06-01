const refreshBtn = document.querySelector("#refreshBtn");
const globalLoading = document.querySelector("#globalLoading");
const loadTime = document.querySelector("#loadTime");

const widgets = [
  document.querySelector("#widget-users .widget-content"),
  document.querySelector("#widget-weather .widget-content"),
  document.querySelector("#widget-country .widget-content"),
  document.querySelector("#widget-dogs .widget-content"),
];

function showGlobalLoading() {
  globalLoading.classList.remove("hidden");
}

function hideGlobalLoading() {
  globalLoading.classList.add("hidden");
}

function setWidgetLoading() {
  for (let i = 0; i < widgets.length; i++) {
    widgets[i].textContent = "Loading...";
  }
}

function renderWidget(index, data) {
  const widget = widgets[index];
  widget.textContent = "";

  if (index === 0) {
    const p1 = document.createElement("p");
    p1.textContent = "Total users: " + data.length;

    const p2 = document.createElement("p");
    p2.textContent = "First user: " + data[0].name;

    const p3 = document.createElement("p");
    p3.textContent = "Email: " + data[0].email;

    widget.appendChild(p1);
    widget.appendChild(p2);
    widget.appendChild(p3);
  }

  if (index === 1) {
    const p1 = document.createElement("p");
    p1.textContent = "Temperature: " + data.current_weather.temperature + "°C";

    const p2 = document.createElement("p");
    p2.textContent = "Wind speed: " + data.current_weather.windspeed + " km/h";

    widget.appendChild(p1);
    widget.appendChild(p2);
  }

  if (index === 2) {
    const country = data[0];

    const p1 = document.createElement("p");
    p1.textContent = "Country: " + country.name.common;

    const p2 = document.createElement("p");
    p2.textContent = "Capital: " + country.capital[0];

    const p3 = document.createElement("p");
    p3.textContent = "Population: " + country.population.toLocaleString();

    widget.appendChild(p1);
    widget.appendChild(p2);
    widget.appendChild(p3);
  }

  if (index === 3) {
    const dogGrid = document.createElement("div");
    dogGrid.classList.add("dog-grid");

    for (let i = 0; i < data.message.length; i++) {
      const img = document.createElement("img");
      img.src = data.message[i];
      img.alt = "Dog image";
      dogGrid.appendChild(img);
    }

    widget.appendChild(dogGrid);
  }
}

function renderWidgetError(index, message) {
  const widget = widgets[index];
  widget.textContent = "";

  const p = document.createElement("p");
  p.classList.add("error");
  p.textContent = "Error: " + message;

  widget.appendChild(p);
}

async function loadDashboard() {
  const startTime = Date.now();

  showGlobalLoading();
  setWidgetLoading();
  loadTime.textContent = "";

  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => {
      if (!r.ok) throw new Error("Users API failed");
      return r.json();
    }),

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true",
    ).then((r) => {
      if (!r.ok) throw new Error("Weather API failed");
      return r.json();
    }),

    fetch("https://restcountries.com/v3.1/name/vietnam").then((r) => {
      if (!r.ok) throw new Error("Country API failed");
      return r.json();
    }),

    fetch("https://dog.ceo/api/breeds/image/random/4").then((r) => {
      if (!r.ok) throw new Error("Dog API failed");
      return r.json();
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      renderWidget(index, result.value);
    } else {
      renderWidgetError(index, result.reason.message);
    }
  });

  hideGlobalLoading();

  loadTime.textContent = "Data loaded in " + (Date.now() - startTime) + " ms";
  console.log("Loaded in " + (Date.now() - startTime) + "ms");
}

refreshBtn.addEventListener("click", loadDashboard);

loadDashboard();
