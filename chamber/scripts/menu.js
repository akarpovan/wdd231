document.addEventListener('DOMContentLoaded', function () {
    mobileMenu();
    activeMenu();
    currentYear();
});

// Función simple para el menú móvil
function mobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Cambiar el ícono (☰ a ✕ y viceversa)
            if (navMenu.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });
    }
}

// Función para marcar la página activa en el menú
function activeMenu() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');

        // Si el enlace coincide con la página actual, marcarlo como activo
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

// Función para establecer el año actual en el footer
function currentYear() {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
}