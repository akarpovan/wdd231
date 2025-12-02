document.addEventListener('DOMContentLoaded', function () {
    mobileMenu();
    activeMenu();
});

// Función simple para el menú móvil
function mobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navigation');

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
    const navLinks = document.querySelectorAll('.navigation a');

    navLinks.forEach(link => {
        link.classList.remove('active');

        // Si el enlace coincide con la página actual, marcarlo como activo
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}