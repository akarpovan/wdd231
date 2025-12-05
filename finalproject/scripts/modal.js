//global functions
/*function openImageModal(title, date, explanation, hdurl) {
    console.log("Abriendo modal:", title);

    const modal = document.getElementById('imagesModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h3><strong>Title:</strong> ${title}</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Explanation:</strong> ${explanation}</p>
        <a href="${hdurl}" target="_blank">
            🔍 View HD Image
        </a>
    `;

    modal.showModal();
}*/

function openImageModal(image) {
    console.log("Abriendo modal:", image.title);

    const modal = document.getElementById('imagesModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h3><strong>Title:</strong> ${image.title}</h3>
        <p><strong>Date:</strong> ${formatDate(image.date)}</p>
        <p><strong>Explanation:</strong> ${image.explanation}</p>
        <a href="${image.hdurl}" target="_blank">
            🔍 View HD Image
        </a>
    `;

    modal.showModal();
}

function closeImageModal() {
    document.getElementById('imagesModal').close();
}

function formatDate(dateString) {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}