import { API_KEY } from './config.js';
import { API_BASE_URL } from './config.js';

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
function formatDate(dateString) {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
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

        console.log('📡 Fetching from:', url);

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
    const imagesContainer = document.getElementById('images-container');

    if (!images || images.length === 0) {
        imagesContainer.innerHTML = '<p>No images available</p>';
        return;
    }

    let html = '';
    for (let i = 0; i < images.length; i++) {
        const image = images[i];

        const imageTitle = '';
        const imageExplanation = '';
        const imageCopyright = '';

        // Limpiar título
        if (image.title) {
            image.title = image.title.replace(/[^\p{L}\p{N}\s.,!?:-]/gu, '');
            let imageTitle = image.title.replace(/[^\p{L}\p{N}\s.,!?:-]/gu, '');
        }

        // Limpiar explicación
        if (image.explanation) {
            image.explanation = image.explanation.replace(/[^\p{L}\p{N}\s.,!?:;()\-'"]/gu, '');
            let imageExplanation = image.explanation.replace(/[^\p{L}\p{N}\s.,!?:;()\-'"]/gu, '');
        }

        // Limpiar copyright
        if (image.copyright) {
            image.copyright = image.copyright.replace(/\n/g, ' ').trim();
            let imageCopyright = image.copyright.replace(/\n/g, ' ').trim();
        }

        //For local storage
        const imageData = {
            url: image.url,
            title: image.title,
            date: image.date,
            explanation: image.explanation,
            hdurl: image.hdurl || image.url
        };

        html += `
        <div class="images-card">
            <img src="${image.url}" alt="${image.title}">
            <h3>${image.title}</h3>
            <p><strong>Date: </strong> ${formatDate(image.date)}</p>
            <!-- BOTÓN VIEW DETAILS -->
            <button onclick="openImageModal(
                '${imageTitle}', 
                '${image.date}', 
                '${imageExplanation}', 
                '${image.hdurl || image.url}'
            )">
                🔍 View Details
            </button>
            <!-- BOTÓN ADD TO FAVORITES -->
            <!--button onclick="addToFavorites(${JSON.stringify(imageData).replace(/"/g, "'")})" 
                    class="favorite-button"-->
            <button onclick="addToFavorites(${JSON.stringify(imageData).replace(/"/g, "'")})" 
                    class="favorite-button">        
                ❤️ Add to Favorites
            </button>
        </div>
        `;
    }

    imagesContainer.innerHTML = html;
}

function addToFavorites(imageData) {
    try {
        // Converti string to json
        if (typeof imageData === 'string') {
            imageData = JSON.parse(imageData.replace(/'/g, '"'));
        }

        console.log("Add to favorites:", imageData.title);

        // Actual favorites from localStorage
        let actualFavorites = JSON.parse(localStorage.getItem('nasaFavorites')) || [];

        // Verify if image yet in Favorites
        const isAlreadyFavorite = favorites.some(fav =>
            fav.url === imageData.url && fav.date === imageData.date
        );

        if (isAlreadyFavorite) {
            alert('This image is already in your favorites!');
            return;
        }

        // Add new image to Favorites
        favorites.push({
            url: imageData.url,
            title: imageData.title,
            date: imageData.date,
            explanation: imageData.explanation,
            hdurl: imageData.hdurl,
            addedDate: new Date().toISOString() // Date when to added
        });

        // Save in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));

        // Message of confirmation
        showFavoriteNotification(`${imageData.title} added to favorites!`);

        console.log("Favoritos actualizados:", favorites.length);

    } catch (error) {
        console.error('Error adding to favorites:', error);
        alert('Error adding to favorites. Please try again.');
    }
}

// Función para mostrar notificación
function showFavoriteNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notificacion';
    notification.textContent = message;

    // Agregar al body
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

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