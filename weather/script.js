const apiKey = "c2b7e732eb5529162423eee88120f08e"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const weatherInfo = document.getElementById("weatherInfo");

// Function to fetch weather data
async function getWeather(city) {
    // Trim the city input to remove extra spaces
    city = city.trim();
    
    if (!city) {
        weatherInfo.innerHTML = `<p>⚠️ Please enter a city name.</p>`;
        return;
    }

    // Show loading state
    weatherInfo.innerHTML = `<p>Loading...</p>`;

    try {
        const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            weatherInfo.innerHTML = `<p>❌ City not found. Try again.</p>`;
            return;
        } else if (data.cod === "401") {
            weatherInfo.innerHTML = `<p>🚨 Invalid API key. Please check your key.</p>`;
            return;
        }

        // Round temperature to 1 decimal place
        const temp = Math.round(data.main.temp * 10) / 10;

        // Display weather details with better formatting
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <div class="weather-details">
                <p class="temperature">${temp}°C</p>
                <p class="description">${data.weather[0].description}</p>
                <div class="weather-item">
                    <p>🌬 Wind Speed</p>
                    <p>${data.wind.speed} m/s</p>
                </div>
                <div class="weather-item">
                    <p>💧 Humidity</p>
                    <p>${data.main.humidity}%</p>
                </div>
            </div>
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p>🚨 Network error. Please try again.</p>`;
        console.error('Error fetching weather:', error);
    }
}

// Event listener for search button
searchButton.addEventListener("click", () => getWeather(searchBox.value));

// Allow pressing "Enter" to search
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getWeather(searchBox.value);
});

// Clear input on focus (optional quality of life improvement)
searchBox.addEventListener("focus", () => {
    searchBox.value = "";
});