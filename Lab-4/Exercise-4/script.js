
let cache = null;

const displayInUI = (data) => {
  const divContainer = document.querySelector("#display-data");

  divContainer.style.display = "block";
  divContainer.innerHTML = `
        <h3> ${(data.place).charAt(0).toUpperCase() + (data.place).slice(1)}</h3>
        <p><strong>Condition:</strong> ${data.condition}</p>
        <p><strong>Current Temp:</strong> ${data.tempNow}°C</p>
        <p><strong>High/Low:</strong> ${data.tempMax}°C / ${data.tempMin}°C</p>
        <p><strong>Humidity:</strong> ${data.humidity}%</p>
    `;
};

async function handleAPIcall(inputValue) {
  const spinner = document.querySelector("#spinner");
  const errorMsg = document.querySelector("#error-msg");
  const displayDiv = document.querySelector("#display-data");

  errorMsg.style.display = "none";
  displayDiv.style.display = "none";

  if (
    cache &&
    cache.cityName.toLowerCase() === inputValue.toLowerCase()
  ) {
    console.log("Loaded from local cache!");
    displayInUI(cache.weatherData);
    return;
  }

  spinner.style.display = "block";

  try {
    const API_KEY = "GQFHEFC5UE95LFBG9D3SB9LKA";
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}/today?unitGroup=metric&include=current&key=${API_KEY}&contentType=json`;

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(
        response.status === 400
          ? "Invalid city name. Please try again."
          : "Server Error.",
      );
    }

    const data = await response.json();
    const usefulData = {
      place: data["resolvedAddress"],
      tempMax: data["days"][0]["tempmax"],
      tempMin: data["days"][0]["tempmin"],
      tempNow: data["currentConditions"]["temp"],
      humidity: data["currentConditions"]["humidity"],
      condition: data["currentConditions"]["conditions"],
    };

    cache = {
      cityName: inputValue,
      weatherData: usefulData,
    };

    displayInUI(usefulData);
  } catch (error) {
    errorMsg.innerText =
      error.message === "Failed to fetch"
        ? "Network error. Check your connection."
        : error.message;
    errorMsg.style.display = "block";
  } finally {
    spinner.style.display = "none";
  }
}

document.querySelector("#search-btn").addEventListener("click", (evt) => {
  evt.preventDefault();
  const inputValue = document.querySelector("#city").value.trim();

  if (inputValue !== "") {
    handleAPIcall(inputValue);
  } else {
    document.querySelector("#error-msg").innerText =
      "Please enter a city name.";
    document.querySelector("#error-msg").style.display = "block";
  }
});
