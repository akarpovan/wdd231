// Arrays
/*const cseCourses = [
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
});*/

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function displayCourses(filter = 'all') {
    const container = document.getElementById('coursesContainer');
    const creditsElement = document.getElementById('totalCredits');

    let filteredCourses = courses;

    if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    } else if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    }

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsElement.textContent = `Total Credits: ${totalCredits}`;

    container.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `course-item ${course.completed ? 'completed' : 'pending'}`;

        courseElement.innerHTML = `
            <div class="course-header">
                 <button class="course-btn" data-course-number="${course.number}">
                    ${course.subject} ${course.number}
                </button>
                <!--h3>${course.subject} ${course.number}</h3-->
                <span class="status ${course.completed ? 'completed-badge' : 'pending-badge'}">
                    ${course.completed ? 'Completed' : 'Pending'}
                </span>
            </div>
            <h4>${course.title}</h4>
            <p class="credits">${course.credits} credits</p>
            <p class="description">${course.description}</p>
            <div class="technologies">
                ${course.technology.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;

        container.appendChild(courseElement);
    });

    // Event listeners for a buttons of cuorses
    addCourseButtonListeners();
}

function addCourseButtonListeners() {
    const courseButtons = document.querySelectorAll('.course-btn');

    courseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const courseNumber = parseInt(this.getAttribute('data-course-number'));
            displayCourseDetails(courseNumber);
        });
    });
}

function filterButtons() {
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

function displayCourseDetails(courseNumber) {
    // Encontrar el curso por número
    const course = courses.find(c => c.number === courseNumber);

    if (!course) return;

    const courseDetails = document.getElementById('course-details');
    courseDetails.innerHTML = `
        <div class="modal-header">
            <h2>${course.subject} ${course.number}</h2>
            <button id="closeModal" class="close-btn">❌</button>
        </div>
        <div class="modal-content">
            <h3>${course.title}</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Certificate:</strong> ${course.certificate}</p>
            <p><strong>Status:</strong> ${course.completed ? 'Completed' : 'Pending'}</p>
            <p><strong>Description:</strong> ${course.description}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        </div>
    `;

    courseDetails.showModal();

    // Agregar event listener para cerrar el modal
    document.getElementById('closeModal').addEventListener("click", () => {
        courseDetails.close();
    });

    // Cerrar modal al hacer click fuera
    courseDetails.addEventListener('click', (e) => {
        if (e.target === courseDetails) {
            courseDetails.close();
        }
    });
}

/*function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}*/

/*courseDiv.addEventListener('click', () => {
    displayCourseDetails(course);
});*/

// Inicialize
document.addEventListener('DOMContentLoaded', function () {
    displayCourses('all');
    filterButtons();
});