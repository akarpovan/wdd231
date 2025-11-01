// Arrays
const cseCourses = [
    "CSE 110",
    "CSE 111",
    "CSE 210"
];

const wddCourses = [
    "WDD 130",
    "WDD 131",
    "WDD 231"
];

function displayCourses(filter = 'all') {
    const container = document.getElementById('coursesContainer');
    let coursesToShow = [];

    if (filter === 'all') {
        coursesToShow = [...cseCourses, ...wddCourses];
    } else if (filter === 'cse') {
        coursesToShow = cseCourses;
    } else if (filter === 'wdd') {
        coursesToShow = wddCourses;
    }

    container.innerHTML = '';

    coursesToShow.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course-item';
        courseElement.textContent = course;
        container.appendChild(courseElement);
    });
}

function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.id;
            displayCourses(filter);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    displayCourses('all'); // start with all courses
    setupFilterButtons();
});