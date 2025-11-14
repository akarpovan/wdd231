document.addEventListener('DOMContentLoaded', function () {
    startApp();
    initHomePage();
});

function startApp() {
    mobileMenu();
    //menuTitle();
    menuActive();
}

function mobileMenu() {
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

/*function menuTitle() {
    const titleElement = document.querySelector('main h1');
    if (!titleElement) return;

    const currentPage = window.location.pathname;

    if (currentPage.includes('directory.html')) {
        titleElement.textContent = 'DIRECTORY';
    } else if (currentPage.includes('join.html')) {
        titleElement.textContent = 'JOIN';
    } else if (currentPage.includes('discover.html')) {
        titleElement.textContent = 'DISCOVER';
    } else {
        titleElement.textContent = 'HOME';
    }
}*/

function menuActive() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        // Remover clase active de todos
        link.classList.remove('active');

        // Agregar clase active si el href coincide con la página actual
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

/*function menuActive() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Remover clase active de todos los enlaces
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Agregar clase active al enlace correspondiente
    if (currentPage.includes('directory.html')) {
        document.querySelector('.nav-menu a[href="directory.html"]').classList.add('active');
    } else if (currentPage.includes('join.html')) {
        document.querySelector('.nav-menu a[href="join.html"]').classList.add('active');
    } else if (currentPage.includes('discover.html')) {
        document.querySelector('.nav-menu a[href="discover.html"]').classList.add('active');
    } else {
        document.querySelector('.nav-menu a[href="index.html"]').classList.add('active');
    }
}*/