import { showNotification } from './favorites-utils.js';

// Display favorite images
function displayFavorites() {

    console.log('displayFavorites called');

    const favoritesContainer = document.getElementById('favorites-container');
    const emptyMessage = document.getElementById('empty-message');

    console.log('favoritesContainer:', favoritesContainer);
    console.log('emptyMessage:', emptyMessage);

    const favorites = JSON.parse(localStorage.getItem('nasaFavorites')) || [];

    if (favorites.length === 0) {
        if (emptyMessage) {
            emptyMessage.style.display = 'block';
        }
        if (favoritesContainer) {
            favoritesContainer.innerHTML = '';
        }
        return;
    }

    if (emptyMessage) {
        emptyMessage.style.display = 'none';
    }

    if (favoritesContainer) {
        favoritesContainer.innerHTML = favorites.map((image, index) => `
            <div class="images-card">
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <h4>${image.title}</h4>
                <p><strong>Date:</strong> ${formatDate(image.date)}</p>
                <p><strong>Category:</strong> ${image.category || 'Space'}</p>
                <div class="card-buttons">
                    <button class="view-favorite-button" data-index="${index}">
                        🔍 View Details
                    </button>
                    <button class="remove-button" data-index="${index}">
                        🗑️ Remove
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Agregar event listeners
    addButtonListeners();
}

function addButtonListeners(favorites) {
    // View buttons
    const viewFavoritesButtons = document.querySelectorAll('.view-favorite-button');
    viewFavoritesButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index || event.currentTarget.dataset.index);
            const favorites = JSON.parse(localStorage.getItem('nasaFavorites')) || [];
            if (favorites[index]) {
                openImageModal(favorites[index]);
            }
        });
    });

    // Remove buttons
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index || event.currentTarget.dataset.index);
            removeFromFavorites(index);  // ← Solo el índice
        });
    });
}

function removeFromFavorites(index) {
    // Obtener favoritos actuales
    const favorites = JSON.parse(localStorage.getItem('nasaFavorites')) || [];

    // Verificar que el índice sea válido
    if (index < 0 || index >= favorites.length) {
        console.error('Invalid index:', index);
        showNotification('Error: Invalid item', 'error');
        return;
    }

    // Obtener título para el mensaje de confirmación
    const imageTitle = favorites[index].title || 'this image';

    // User Confirmation
    if (confirm(`Are you sure you want to remove "${imageTitle}" from your favorites?`)) {
        // Remove 1 element at the index position
        favorites.splice(index, 1);

        // Save the new string in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));

        // Refresh display
        displayFavorites();

        // Show notification
        showNotification('Image removed from favorites', 'success');
    }
}

// Helper function para formatear fecha
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

// Ini favorites page
function iniFavorites() {
    console.log('setupFavorites called');

    // Verificar que estamos en la página de favoritos
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) {
        console.log('Not on favorites page, skipping setup');
        return;
    }

    displayFavorites();
}


// Start when DOM is loaded
//document.addEventListener('DOMContentLoaded', iniFavorites);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    iniFavorites();

    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
});


//For test
//localStorage.removeItem('nasaFavorites');
//console.log(JSON.parse(localStorage.getItem('nasaFavorites')));