//Hamburger menu button
const navButton = document.querySelector('#ham-btn');

//Navigation
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', function () {

    // home
    const menuHomeLink = document.querySelector("#menu-home");
    menuHomeLink.addEventListener('click', () => {
        titleElement.textContent = 'HOME';
    });

    //chamber
    const menuChamberLink = document.querySelector("#menu-chamber");
    menuChamberLink.addEventListener('click', () => {
        titleElement.textContent = 'CHAMBER PROJECT';
    });

    //final
    const menuFinalLink = document.querySelector("#menu-final");
    menuFinalLink.addEventListener('click', () => {
        titleElement.textContent = 'FINAL PROJECT';
    });

});