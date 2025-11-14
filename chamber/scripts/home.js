// API Configuration from OpenWeatherMap
const WEATHER_API_KEY = '36781a4ce53d1cb48a6a5976d1fc3e33';
// Lima coordinates
const LAT = '-12.08';
const LON = '-77.05';

// Fetch weather data from OpenWeatherMap
async function fetchWeatherData() {
    try {
        // Current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${WEATHER_API_KEY}`
        );

        //units=imperial para obtener temperaturas en Fahrenheit
        //https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.64&units=imperial&appid=36781a4ce53d1cb48a6a5976d1fc3e33
        //units=metric para Celsius.
        //https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.64&units=metric&appid=36781a4ce53d1cb48a6a5976d1fc3e33

        const currentData = await currentResponse.json();

        // 3-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${WEATHER_API_KEY}`
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

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase();

    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase();

    currentWeatherDiv.innerHTML = `
        <div class="weather-item">
            <div class="weather-icon"><img id="current-weather-icon" src="" alt=""></div>
            <div class="weather-temp">${Math.round(data.main.temp)}°F</div>
            <!--div class="weather-desc">${data.weather[0].description}</div-->
        </div>
        <div class="weather-details">
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
            <p><strong>High:</strong> ${Math.round(data.main.temp_max)}°F</p>
            <p><strong>Low:</strong> ${Math.round(data.main.temp_min)}°F</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Feels like:</strong> ${Math.round(data.main.feels_like)}°F</p>
            <p><strong>Sunrise:</strong> ${sunriseTime}</p>
            <p><strong>Sunset:</strong> ${sunsetTime}</p>
        </div>
    `;

    const currentWeatherIcon = document.querySelector('#current-weather-icon');
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    currentWeatherIcon.setAttribute('src', iconsrc);
    currentWeatherIcon.setAttribute('alt', desc);
}

function displayWeatherForecast(data) {
    const forecastDiv = document.getElementById('weather-forecast');
    const dailyForecasts = getDailyForecasts(data.list);

    let forecastHTML = '';
    dailyForecasts.forEach((day, index) => {
        const dayLabel = index === 0 ? 'Today' : day.date;
        forecastHTML += `
            <div class="forecast-day">
                <div><strong>${dayLabel}</strong></div>
                <img src="https://openweathermap.org/img/w/${day.icon}.png" 
                     alt="${day.description}">
                <div>${Math.round(day.temp)}°F</div>
                <div style="text-transform: capitalize;">${day.description}</div>
            </div>
        `;
    });

    forecastDiv.innerHTML = forecastHTML;
}

function getDailyForecasts(forecastList) {
    const dailyForecasts = [];
    const uniqueDays = new Set();

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);

        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateString = date.toDateString(); // Para comparación única

        // Se guardan solo días únicos y máximo 3 días
        if (!uniqueDays.has(dateString) && dailyForecasts.length < 3) {
            uniqueDays.add(dateString);
            dailyForecasts.push({
                date: weekday, // "Monday", "Tuesday", etc.
                temp: item.main.temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon // Código del icono
            });
        }
    });

    return dailyForecasts;
}

async function fetchMemberSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        displaySpotlights(data.members); //Array of members

    } catch (error) {
        console.error('Error fetching member data:', error);
        document.getElementById('spotlights-container').innerHTML = '<p>Unable to load member spotlights</p>';
    }
}

//(1=member, 2=silver, 3=gold)
function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights-container');

    const qualifiedMembers = members.filter(member =>
        //member.membershiplevel === 'Gold' || member.membershiplevel === 'Silver'
        member.membershiplevel === 3 || member.membershiplevel === 2
    );

    // Select random members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, Math.min(3, Math.floor(Math.random() * 2) + 2));

    let spotlightsHTML = '';

    selectedMembers.forEach(member => {

        let level = '';
        if (member.membershiplevel === 3) {
            level = 'Gold Member';
        }
        else if (member.membershiplevel === 2) {
            level = 'Silver Member';
        }
        else {
            level = 'Member';
        }

        spotlightsHTML += `
             <div class="spotlight-card">
                <div class="spotlight-header">
                    <h4>${member.name}</h4>
                    <div><span class="membership-badge ${level.toLowerCase()}">${level}</span></div>
                </div>
                <div class="spotlight-content">
                    <img src="${member.logourl}" alt="${member.name} logo" class="spotlight-logo">
                        <div class="spotlight-info">
                            <p><strong>STREET:</strong> ${member.address.street}</p>
                            <p><strong>CITY:</strong> ${member.address.city}</p>
                            <p><strong>PHONE:</strong> ${member.phonenumber}</p>
                            <p><strong>URL:</strong> <a href="${member.websiteurl}" target="_blank">${member.websiteurl}</a></p>
                        </div>
                </div>
            </div>
        `;
    });

    spotlightsContainer.innerHTML = spotlightsHTML;
}

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