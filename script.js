const form = document.querySelector("form");
const searchInput = document.querySelector("input");
const degreeOutput = document.querySelector(".degree");
const dateTimeOutput = document.querySelector(".date-time");
const timezone = document.querySelector(".timezone");
const units = document.querySelector("select");
const icon = document.querySelector(".icon");

const fahrenheitToCelsius = (fahrenheit) =>
  Math.round(((fahrenheit - 32) * 5) / 9);

const fetchData = async (query) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=GKEGTUTHM4XYV8WCUT7W7TLNT`,
    );

    const weatherData = await response.json();
    console.log(weatherData);
    console.log(weatherData.currentConditions.icon);

    const dateObj = new Date(weatherData.days[0].datetime + "T00:00:00Z");

    return [
      units.value === "fah"
        ? `${Math.round(weatherData.currentConditions.temp)} (°F)`
        : `${fahrenheitToCelsius(weatherData.currentConditions.temp)} (°C)`,
      dateObj.toDateString(),
      weatherData.address,
      weatherData.currentConditions.icon,
    ];
  } catch (error) {
    console.error(error);
    timezone.textContent = "Something went wrong!";
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const outputs = await fetchData(searchInput.value);
  degreeOutput.textContent = outputs[0];
  dateTimeOutput.textContent = outputs[1];
  timezone.textContent = outputs[2];
  icon.src = `${outputs[3].includes("partly-cloudy") ? "assets/images/icon-partly-cloudy.webp" : outputs[3].includes("snow") ? "assets/images/icon-snow.webp" : outputs[3].includes("storm") ? "assets/images/icon-storm.webp" : outputs[3].includes("cloudy") ? "assets/images/icon-overcast.webp" : outputs[3].includes("rain") ? "assets/images/icon-drizzle.webp" : outputs[3].includes("fog") ? "assets/images/icon-fog.webp" : "assets/images/icon-sunny.webp"}`;
});
