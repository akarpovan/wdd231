import { API_KEY } from "./config.js";
import { API_BASE_URL } from "./config.js";
import { addToFavorites, showNotification } from "./favorites-utils.js";

let galleryImages = [];

function getDateString(daysAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-CA');
}

function formatDate(dateString) {
    try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString; // Si hay error, devolver la fecha original
    }
}


async function getGalleryImages() {
    const galleryContainer = document.getElementById('gallery-container');
    const errorDivGalelry = document.getElementById('gallery-error');

    galleryContainer.innerHTML = '<div class="gallery-load">Loading space images...</div>';
    errorDivGalelry.textContent = '';

    try {
        const endDate = getDateString(1);
        const startDate = getDateString(15); //15 items or 15 days

        const url = `${API_BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
        console.log('fetching from:', url);

        const response = await fetch(url);

        const data = await response.json();
        console.log('data received:', data);

        galleryImages = data;

        displayGalleryImages(galleryImages);

    }
    catch (error) {
        console.log('Error fetch data', error);
    }
}

function displayGalleryImages(images) {
    const container = document.getElementById('gallery-container');

    if (!images || images.lenght === 0) {
        container.innerHTML = '<div>No images found</div>';
        return;
    }

    container.innerHTML = images.map((image, index) => `
    <div class="images-card">
        <img src="${image.url || image.hdurl}" alt="${image.title}" loading="lazy">
        <h4>${image.title}</h4>
        <p class="date"><span class="bold">Date: </span> ${formatDate(image.date)}</p>
        <div class="card-buttons">
            <button class="view-button" data-index = "${index}"> View Details </button>
            <button class="favorite-button" data-inde= "${index}"> Add to favorite </button>
        </div>
     </div>   
     `).join('');

    addButtonListeners(images);

}


document.addEventListener('DOMContentLoaded', () => {
    getGalleryImages();
});