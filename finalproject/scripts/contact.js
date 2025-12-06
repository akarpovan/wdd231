function iniFormContact() {
    const form = document.querySelector('.contact-action');

    if (form) {
        form.addEventListener('submit', function (event) {
            // Validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.length < 2) {
                alert('Please enter your full name (at least 2 characters)');
                event.preventDefault();
                return;
            }

            if (message.length < 10) {
                alert('Please enter a message with at least 10 characters');
                event.preventDefault();
                return;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', iniFormContact);