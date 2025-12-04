// favorites-utils.js
export function addToFavorites(image) {
    try {
        const favorites = JSON.parse(localStorage.getItem('nasaFavorites')) || [];
        const exists = favorites.some(fav => fav.date === image.date);

        if (exists) {
            showNotification('This image is already in favorites!', 'warning');
            return;
        }

        favorites.push(image);
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        showNotification('❤️ Added to favorites!', 'success');

    } catch (error) {
        console.error('Error adding to favorites:', error);
        showNotification('Error adding to favorites', 'error');
    }
}

export function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}