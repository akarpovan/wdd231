import { API_KEY } from './config.js';
import { API_BASE_URL } from './config.js';
import { addToFavorites, showNotification } from './favorites-utils.js';

// ----- HeroImage ---------------
function setMaxDate() {
    const dateInput = document.getElementById('date-input');
    const today = new Date().toLocaleDateString('en-CA');
    dateInput.max = today;
    dateInput.value = today;
}

async function getHeroImage(date = '') {
    const heroContainer = document.getElementById('hero-container');
    const errorDivHero = document.getElementById('hero-error');

    // Mostrar hero-load div
    heroContainer.innerHTML = '<div class="hero-load" id="hero-load">Loading space image...</div>';
    errorDivHero.textContent = '';

    try {
        const dateParam = date ? `&date=${date}` : '';
        const url = `${API_BASE_URL}?api_key=${API_KEY}${dateParam}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from NASA API');
        }

        const data = await response.json();
        displayHeroImage(data);
    } catch (error) {
        console.error('Error fetching NASA Hero Image:', error);
        errorDivHero.textContent = 'Error loading data. Please try again.';
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

// ----- SpaceImages ---------------
function getDateString(daysAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-CA');
}

async function getSpaceImages() {
    const imagesContainer = document.getElementById('images-container');
    const errorDivImages = document.getElementById('images-error');

    // Mostrar hero-load div
    imagesContainer.innerHTML = '<div class="images-load">Loading space images...</div>';
    errorDivImages.textContent = '';

    try {
        const endDate = getDateString(1);
        const startDate = getDateString(3);

        const url = `${API_BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

        console.log('Fetching from:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Data received:', data);
        console.log('Length:', data.length);

        displaySpaceImages(data);
    } catch (error) {
        console.error('Error fetching space images:', error);
        console.error('Error stack:', error.stack);
        errorDivImages.textContent = `Error: ${error.message}`;
    }
}

function displaySpaceImages(images) {
    const container = document.getElementById('images-container');

    container.innerHTML = images.map((image, index) => `
        <div class="images-card">
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <h4>${image.title}</h4>
            <p class="date"><span class="bold">Date:</span> ${formatDate(image.date)}</p>
            <div class="card-buttons">
                <button class="view-button" data-index="${index}">
                    🔍 View Details
                </button>
                <button class="favorite-button" data-index="${index}">
                    ❤️ Add to Favorites
                </button>
            </div>
        </div>
    `).join('');

    // Agregar event listeners
    addButtonListeners(images);
}

function addButtonListeners(images) {
    // View buttons
    const viewButtons = document.querySelectorAll('.view-button');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            openImageModal(images[index]);
        });
    });

    // Favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            addToFavorites(images[index]);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setMaxDate();
    getHeroImage();
    getSpaceImages();

    // Date selector event listener
    document.getElementById('date-input')?.addEventListener('change', (e) => {
        getHeroImage(e.target.value);
    });

    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
});