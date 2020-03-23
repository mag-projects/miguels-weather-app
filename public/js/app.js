const locationInput = document.querySelector("#location-input");
const locationSearch = document.querySelector("#location-search");

// Weather Card
const $weatherTitle = document.querySelector("#weather-title");
const $weatherCard = document.querySelector("#weather-card");
const $lowTemp = document.querySelector("#low-temp");
const $highTemp = document.querySelector("#high-temp");
const $rainChance = document.querySelector("#rain-chance");
const $weatherSummary = document.querySelector("#weather-summary");
const $cardImage = document.querySelector("#card-image");

// Images
const weatherImages = {
    lightRain: "img/light-rain.svg",
    heavyRain: "img/heavy-rain.svg",
    clear: "img/clear.svg",
    heavySnow: "img/heavy-snow.svg"
};

$weatherCard.style.visibility = "hidden";

locationSearch.addEventListener("click", (e) => {
    e.preventDefault();
    const location = locationInput.value;
    console.log(location);

    fetch(`/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) console.log(error);
            console.log(data.location);
            console.log(data);
            // Adds location name to card title
            $weatherTitle.textContent = data.location;
            $lowTemp.textContent = `${Math.round(data.low)}°`;
            $highTemp.textContent = `${Math.round(data.high)}°`;
            $rainChance.textContent = `${Math.round(data.rainChance)}% chance of rain.`;
            $weatherSummary.textContent = `${data.summary}`;
            // Display weather card
            $weatherCard.style.visibility = "visible";

            // Add animation depending on weather
            if (data.summary.includes("Rain")) $cardImage.src = weatherImages.heavyRain;
            if (data.summary.includes("Light rain")) $cardImage.src = weatherImages.lightRain;
            else if (data.summary.includes("Clear")) $cardImage.src = weatherImages.clear;
            else if (data.summary.includes("Snow")) $cardImage.src = weatherImages.heavySnow;
        });
    });


});
