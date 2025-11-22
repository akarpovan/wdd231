// Variable global para almacenar los beneficios
let membershipBenefits = {};

// Initialize page
function initJoinPage() {
    fetchLevelsData();
    setForm();
    setModals();
    setTimestamp();
}

/* Levels */
async function fetchLevelsData() {
    try {
        const response = await fetch('data/levels.json');
        const data = await response.json();

        // Extraer los niveles del array
        membershipBenefits = data.levels[0];

    } catch (error) {
        console.error('Error fetching levels data:', error);
    }
}

function setTimestamp() {
    const now = new Date();
    document.getElementById('timestamp').value = now.toISOString();
}

// Form handling
function setForm() {
    const form = document.getElementById('joinForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Store in localStorage for thankyou page
            localStorage.setItem('membershipApplication', JSON.stringify(data));

            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        }
    });
}

// Form validation
function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');
    const orgName = document.getElementById('orgName');
    const membership = document.getElementById('membership');

    let isValid = true;

    // Reset previous errors
    clearErrors();

    // Required field validation
    if (!firstName.value.trim()) {
        showError(firstName, 'First name is required');
        isValid = false;
    }

    if (!lastName.value.trim()) {
        showError(lastName, 'Last name is required');
        isValid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email, 'Valid email is required');
        isValid = false;
    }

    if (!mobile.value.trim()) {
        showError(mobile, 'Mobile number is required');
        isValid = false;
    }

    if (!orgName.value.trim()) {
        showError(orgName, 'Organization name is required');
        isValid = false;
    }

    if (!membership.value) {
        showError(membership, 'Please select a membership level');
        isValid = false;
    }

    // Organization title pattern validation
    const orgTitle = document.getElementById('orgTitle');
    if (orgTitle.value && !/^[A-Za-z\s\-]{7,}$/.test(orgTitle.value)) {
        showError(orgTitle, 'Title must be at least 7 characters with only letters, spaces, and hyphens');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(field, message) {
    field.classList.add('input-error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const fields = document.querySelectorAll('.form-group input, .form-group select');
    fields.forEach(field => {
        field.classList.remove('input-error');
    });

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

// Modal functionality
function setModals() {
    const modal = document.getElementById('membershipModal');
    const closeBtn = document.getElementById('closeModal');

    // Obtener referencias a los botones por sus IDs
    const npBtn = document.getElementById('npBtn');
    const bronzeBtn = document.getElementById('bronzeBtn');
    const silverBtn = document.getElementById('silverBtn');
    const goldBtn = document.getElementById('goldBtn');

    // Asignar event listeners a cada botón
    if (npBtn) {
        npBtn.addEventListener('click', function () {
            openModal('np');
        });
    }

    if (bronzeBtn) {
        bronzeBtn.addEventListener('click', function () {
            openModal('bronze');
        });
    }

    if (silverBtn) {
        silverBtn.addEventListener('click', function () {
            openModal('silver');
        });
    }

    if (goldBtn) {
        goldBtn.addEventListener('click', function () {
            openModal('gold');
        });
    }

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.open) {
            modal.close();
        }
    });
}

function openModal(level) {
    const modal = document.getElementById('membershipModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const benefits = membershipBenefits[level];

    if (benefits) {
        modalTitle.textContent = benefits.title;
        modalBody.innerHTML = `
            <p><strong>Cost:</strong> ${benefits.cost}</p>
            <h3>Benefits:</h3>
            <ul>
                ${benefits.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        `;

        modal.showModal();
    } else {
        console.error('Membership level not found:', level);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initJoinPage);