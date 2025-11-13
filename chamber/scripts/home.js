// API Configuration
const WEATHER_API_KEY = 'your_api_key_here'; // You need to get this from OpenWeatherMap
const LAT = '-12.0464'; // Lima coordinates
const LON = '-77.0428';

// Fetch weather data from OpenWeatherMap
async function fetchWeatherData() {
    try {
        // Current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`
        );
        const currentData = await currentResponse.json();

        // 3-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayWeatherForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('current-weather').innerHTML = '<p>Unable to load weather data</p>';
        document.getElementById('weather-forecast').innerHTML = '<p>Unable to load forecast</p>';
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');

    currentWeatherDiv.innerHTML = `
        <div class="weather-item">
            <div class="weather-icon">🌡️</div>
            <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
            <div class="weather-desc">${data.weather[0].description}</div>
        </div>
        <div class="weather-details">
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Feels like:</strong> ${Math.round(data.main.feels_like)}°C</p>
        </div>
    `;
}

// Display 3-day weather forecast
function displayWeatherForecast(data) {
    const forecastDiv = document.getElementById('weather-forecast');
    const dailyForecasts = getDailyForecasts(data.list);

    let forecastHTML = '';
    dailyForecasts.forEach(day => {
        forecastHTML += `
            <div class="forecast-day">
                <div><strong>${day.date}</strong></div>
                <div>${Math.round(day.temp)}°C</div>
                <div>${day.description}</div>
            </div>
        `;
    });

    forecastDiv.innerHTML = forecastHTML;
}

// Helper function to get daily forecasts (next 3 days)
function getDailyForecasts(forecastList) {
    const dailyForecasts = [];
    const today = new Date().toDateString();

    // Get unique days (skip today)
    const uniqueDays = new Set();

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        if (date.toDateString() !== today && !uniqueDays.has(dateString) && dailyForecasts.length < 3) {
            uniqueDays.add(dateString);
            dailyForecasts.push({
                date: dateString,
                temp: item.main.temp,
                description: item.weather[0].description
            });
        }
    });

    return dailyForecasts;
}

// Fetch and display member spotlights
async function fetchMemberSpotlights() {
    try {
        const response = await fetch('data/members.json'); // Update path to your JSON file
        const members = await response.json();

        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        document.getElementById('spotlights-container').innerHTML = '<p>Unable to load member spotlights</p>';
    }
}

// Display random gold/silver member spotlights
function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights-container');

    // Filter gold and silver members
    const qualifiedMembers = members.filter(member =>
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );

    // Select 2-3 random members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, Math.min(3, Math.floor(Math.random() * 2) + 2));

    let spotlightsHTML = '';

    selectedMembers.forEach(member => {
        spotlightsHTML += `
            <div class="spotlight-card">
                <img src="${member.image}" alt="${member.name} Logo" class="spotlight-logo" onerror="this.src='images/placeholder-logo.png'">
                <h4>${member.name}</h4>
                <div class="spotlight-info">
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank" class="plain-url">Visit Website</a></p>
                </div>
                <span class="membership-badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel} Member</span>
            </div>
        `;
    });

    spotlightsContainer.innerHTML = spotlightsHTML;
}

// Initialize home page features
function initHomePage() {
    // Only run on home page
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        return;
    }

    fetchWeatherData();
    fetchMemberSpotlights();
}

// Add this to your existing menu.js or call it from DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    initHomePage();
});