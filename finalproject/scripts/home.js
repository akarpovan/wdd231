import { API_KEY } from './config.js';

async function getHeroImage(date = '') {
    const heroContainer = document.getElementById('hero-container');
    const errorDiv = document.getElementById('error');

    // Mostrar loading
    heroContainer.innerHTML = '<div class="hero-load">Loading space image...</div>';
    errorDiv.textContent = '';

    try {
        const dateParam = date ? `&date=${date}` : '';
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${dateParam}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from NASA API');
        }

        const data = await response.json();
        displayHeroImage(data);
    } catch (error) {
        console.error('Error fetching NASA Hero Image:', error);
        errorDiv.textContent = 'Error loading data. Please try again.';
        heroContainer.innerHTML = '';
    }
}

function displayHeroImage(data) {
    const heroContainer = document.getElementById('hero-container');

    heroContainer.innerHTML = `
        <div class="hero-card">
            <h2><span class="bold-h2">Title:</span> ${data.title}</h2>
            <p class="date"><span class="bold">Date:</span> ${formatDate(data.date)}</p>
            <img src="${data.url}" alt="${data.title}" class="hero-image" loading="lazy">
            <p class="explanation"><span class="bold">Explanation:</span> ${data.explanation}</p>
            ${data.copyright ? `<p class="copyright"><span class="bold">Image Credit:</span> © ${data.copyright}</p>` : ''}
            ${data.hdurl ? `<a href="${data.hdurl}" target="_blank" rel="noopener">🔍 View HD Image</a>` : ''}
        </div>
    `;
}

function formatDate(dateString) {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function setMaxDate() {
    const dateInput = document.getElementById('date-input');
    const today = new Date().toLocaleDateString('en-CA');
    dateInput.max = dateInput.value = today;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setMaxDate();
    getHeroImage();

    // Date selector event listener
    document.getElementById('date-input')?.addEventListener('change', (e) => {
        getHeroImage(e.target.value);
    });
});