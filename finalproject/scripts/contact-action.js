function capitalizar(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function displayContactFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    const frmData = document.getElementById('frm-data');

    if (!urlParams.toString() || !frmData) return;

    const subjectMap = {
        'sel-quest': 'General Question',
        'sel-sug': 'Feature Suggestion',
        'sel-bug': 'Report a Bug',
        'sel-other': 'Other'
    };

    const keyMap = {
        'sel-subject': 'Subject',
        'name': 'Full Name',
        'email': 'Email Address'
    };

    // Construir items de lista
    const listItems = [];

    for (let [key, value] of urlParams) {
        if (!value) continue;

        const displayKey = keyMap[key] || capitalizar(key.replace(/-/g, ' '));

        const displayValue = key === "sel-subject"
            ? subjectMap[value] || value
            : value;

        listItems.push(`<li><strong>${displayKey}:</strong> ${displayValue}</li>`);
    }

    if (listItems.length > 0) {
        frmData.innerHTML = `
            <ul>${listItems.join('')}</ul>
        `;
    }
}

document.addEventListener('DOMContentLoaded', displayContactFormData);