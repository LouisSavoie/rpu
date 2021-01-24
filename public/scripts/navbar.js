// Selection of HTML objects
const burger = document.querySelector('.burger i');
const nav = document.querySelector('nav');
const header = document.querySelector('header');

// Toggle Function
function toggleNav() {
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-times');
    nav.classList.toggle('nav-active');
    header.classList.toggle('header-active');
};

// Toggling upon click event
burger.addEventListener('click', function() {
    toggleNav();
});