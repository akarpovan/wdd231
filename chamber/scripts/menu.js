document.addEventListener('DOMContentLoaded', function () {
    startApp();
});

function startApp() {
    // PRIMERO: Configurar el menú hamburguesa (crítico para todas las páginas)
    mobileMenu();
}

// ============
// MOBILE MENU 
// ============

function mobileMenu() {
    // Usar delegación de eventos a nivel de documento
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('menu-toggle') || e.target.closest('.menu-toggle')) {
            e.preventDefault();
            e.stopPropagation();

            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (menuToggle && navMenu) {
                navMenu.classList.toggle('active');
                menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            }
        }
    });
}
