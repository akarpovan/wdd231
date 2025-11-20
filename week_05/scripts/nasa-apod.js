import { API_KEY } from './config.js';

async function fetchAPOD(date = '') {
    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('apod-container').innerHTML = '';
    document.getElementById('error').textContent = '';

    try {
        const dateParam = date ? `&date=${date}` : '';
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${dateParam}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from NASA API');
        }

        const data = await response.json();
        displayAPOD(data);
    } catch (error) {
        console.error('Error fetching NASA APOD:', error);
        document.getElementById('error').textContent = 'Error loading data. Please try again.';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function displayAPOD(data) {
    const container = document.getElementById('apod-container');

    container.innerHTML = `
        <div class="apod-card">
            <h2>${data.title}</h2>
            <p class="date">${formatDate(data.date)}</p>
            ${data.media_type === 'image'
            ? `<img src="${data.url}" alt="${data.title}" loading="lazy">`
            : `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`
        }
            <p class="explanation">${data.explanation}</p>
            ${data.copyright ? `<p class="copyright">Image Credit: © ${data.copyright}</p>` : ''}
            ${data.hdurl ? `<a href="${data.hdurl}" target="_blank" rel="noopener">🔍 View HD Image</a>` : ''}
        </div>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}

function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date-input').max = today;
    document.getElementById('date-input').value = today;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setMaxDate();
    fetchAPOD();

    // Date selector event listener
    document.getElementById('date-input')?.addEventListener('change', (e) => {
        fetchAPOD(e.target.value);
    });
});