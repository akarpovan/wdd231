// Copyright year like the current year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Last modified date
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;