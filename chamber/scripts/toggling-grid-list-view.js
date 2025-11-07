/*const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");*/

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

/*gridbutton.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}*/

/*******************************************************************************************/

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// Function to fetch members data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Error to fetch members data.');
        }
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

// Function to display members
function displayMembers(members, viewType = 'grid') {
    display.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const section = document.createElement('section');

        // Format address
        const fullAddress = `${member.address.street}, ${member.address.city}`;

        if (viewType === 'list') {
            // Vista LISTA - solo texto tipo tabla zebra
            section.innerHTML = `
                <h3>${member.name}</h3>
                <p>${fullAddress}</p>
                <p>${member.phonenumber}</p>
                <a href="${member.websiteurl}" target="_blank" class="website-link">${member.websiteurl}</a>
            `;
        } else {
            // Vista GRID - con imágenes
            section.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.logourl}" alt="${member.name} Logo" class="company-logo" />
                <p>${fullAddress}</p>
                <p>${member.phonenumber}</p>
                <img src="${member.imageurl}" alt="${member.name}" class="main-image" />
                <a href="${member.websiteurl}" target="_blank" class="plain-url">${member.websiteurl}</a>
                <p>Membership Level: ${member.membershiplevel}</p>
            `;
        }

        display.appendChild(section);
    });

    //<a href="${member.websiteurl}" target="_blank" class="website-link">${member.websiteurl}</a>

    // Set the correct view class
    if (viewType === 'grid') {
        display.classList.add('grid');
        display.classList.remove('list');
    } else {
        display.classList.add('list');
        display.classList.remove('grid');
    }
}

// Event listeners for buttons
gridbutton.addEventListener("click", () => {
    displayMembers(currentMembers, 'grid');
});

listbutton.addEventListener("click", () => {
    displayMembers(currentMembers, 'list');
});

// Initialize and load members
let currentMembers = [];

async function initializePage() {
    currentMembers = await fetchMembers();
    if (currentMembers.length > 0) {
        displayMembers(currentMembers, 'grid'); // Default to grid view
    } else {
        display.innerHTML = '<p>No members found.</p>';
    }
}

// Start the page
initializePage();