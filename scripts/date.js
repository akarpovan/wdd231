// Copyright year
const currentYearFooter = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYearFooter;

// Last modified date
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;