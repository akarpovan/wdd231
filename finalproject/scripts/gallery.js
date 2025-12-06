import { API_KEY } from './config.js';
import { API_BASE_URL } from './config.js';
import { addToFavorites, showNotification } from './favorites-utils.js';

//json
/*{
    "date": "2025-12-03",
    "explanation": "Descripción detallada...",
    "hdurl": "https://apod.nasa.gov/apod/image/2512/...",
    "media_type": "image",
    "service_version": "v1",
    "title": "Título de la imagen",
    "url": "https://apod.nasa.gov/apod/image/2512/..."
  }*/

// global variable for images
let galleryImages = [];

// Filter images
function filterImages() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category').value;

    console.log('Filtering images:', {
        searchTerm,
        category,
        totalImages: galleryImages.length
    });

    const filteredImages = galleryImages.filter(image => {
        const matchesSearch = image.title.toLowerCase().includes(searchTerm) ||
            (image.explanation && image.explanation.toLowerCase().includes(searchTerm));
        const matchesCategory = category === 'all' ||
            (image.category && image.category === category);

        return matchesSearch && matchesCategory;
    });

    console.log('Filtered images count:', filteredImages.length);
    displayGalleryImages(filteredImages);
}


// ----- SpaceImages ---------------
function getDateString(daysAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-CA');
}

async function getGalleryImages() {
    const galelryContainer = document.getElementById('gallery-container');
    const errorDivGallery = document.getElementById('gallery-error');

    // Mostrar gallery-load div
    galelryContainer.innerHTML = '<div class="gallery-load">Loading space images...</div>';
    errorDivGallery.textContent = '';

    try {
        const endDate = getDateString(1);
        const startDate = getDateString(15);//15 items or 15 days

        const url = `${API_BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

        console.log('Fetching from:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Data received:', data);
        console.log('Number of images:', data.length);

        const imagesArray = Object.values(data);

        // Assign categories based on keywords
        imagesArray.forEach(image => {
            image.category = assignCategory(image);
        });

        galleryImages = imagesArray;
        console.log('Images stored in galleryImages:', galleryImages.length);

        displayGalleryImages(galleryImages);
    } catch (error) {
        console.error('Error fetching space images:', error);
        console.error('Error stack:', error.stack);
        errorDivGallery.textContent = `Error: ${error.message}`;
    }
}

function assignCategory(image) {
    const title = image.title.toLowerCase();
    const explanation = image.explanation ? image.explanation.toLowerCase() : '';
    const text = title + ' ' + explanation;

    // words for each category
    const keywords = {
        'planet': ['planet', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'],
        'galaxy': ['galaxy', 'andromeda', 'milky way', 'spiral', 'elliptical'],
        'nebula': ['nebula', 'orion', 'crab', 'eagle', 'helix'],
        'star': ['star', 'sun', 'stellar', 'supernova', 'nova', 'constellation']
    };

    // search
    let foundCategory = 'other'; // for default

    // All categories
    const categories = Object.keys(keywords); // ['planet', 'galaxy', 'nebula', 'star']

    // Review each category
    for (let i = 0; i < categories.length; i++) {
        const categoryName = categories[i];
        const wordList = keywords[categoryName];

        // Review each word in this category
        for (let j = 0; j < wordList.length; j++) {
            const keyword = wordList[j];

            // Review if text have this word
            if (text.includes(keyword)) {
                foundCategory = categoryName;
                break;
            }
        }

        if (foundCategory !== 'other') {
            break;
        }
    }

    return foundCategory;
}

function displayGalleryImages(images) {
    const container = document.getElementById('gallery-container');

    if (!images || images.length === 0) {
        container.innerHTML = '<div class="no-results">No images found</div>';
        return;
    }

    container.innerHTML = images.map((image, index) => `
        <div class="images-card">
            <img src="${image.url || image.hdurl}" alt="${image.title}" loading="lazy">
            <h4>${image.title}</h4>
            <p class="date"><span class="bold">Date:</span> ${formatDate(image.date)}</p>
            <p class="category"><span class="bold">Category:</span> ${image.category}</p>
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
            if (images[index]) {
                openImageModal(images[index]);
            }
        });
    });

    // Favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            if (images[index]) {
                addToFavorites(images[index]);
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Filter events
    document.getElementById('search-input').addEventListener('input', filterImages);
    document.getElementById('category').addEventListener('change', filterImages);

    //load images
    getGalleryImages();

    //button for close modal
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
});