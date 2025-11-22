// Display application details from URL parameters
function displayApplicationDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const detailsContainer = document.getElementById('applicationDetails');

    // Check if we have URL parameters
    if (urlParams.toString() === '') {
        // Fallback to localStorage if no URL parameters
        const applicationData = localStorage.getItem('membershipApplication');
        if (applicationData) {
            const data = JSON.parse(applicationData);
            displayData(data, detailsContainer);
            localStorage.removeItem('membershipApplication');
        } else {
            detailsContainer.innerHTML = '<p>No application data found.</p>';
        }
        return;
    }

    // Get data from URL parameters
    const data = {
        firstName: urlParams.get('firstName') || '',
        lastName: urlParams.get('lastName') || '',
        email: urlParams.get('email') || '',
        mobile: urlParams.get('mobile') || '',
        orgName: urlParams.get('orgName') || '',
        orgTitle: urlParams.get('orgTitle') || '',
        membership: urlParams.get('membership') || '',
        description: urlParams.get('description') || '',
        timestamp: urlParams.get('timestamp') || new Date().toISOString()
    };

    displayData(data, detailsContainer);
}

// Helper function to display the data
function displayData(data, container) {
    // Format timestamp
    const timestamp = new Date(data.timestamp);
    const formattedDate = timestamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Get membership level name
    const membershipLevels = {
        np: 'NP Membership',
        bronze: 'Bronze Membership',
        silver: 'Silver Membership',
        gold: 'Gold Membership'
    };

    container.innerHTML = `
        <div class="detail-item">
            <strong>Name:</strong> ${data.firstName} ${data.lastName}
        </div>
        <div class="detail-item">
            <strong>Email:</strong> ${data.email}
        </div>
        <div class="detail-item">
            <strong>Mobile:</strong> ${data.mobile}
        </div>
        <div class="detail-item">
            <strong>Organization:</strong> ${data.orgName}
        </div>
        ${data.orgTitle ? `<div class="detail-item">
            <strong>Title:</strong> ${data.orgTitle}
        </div>` : ''}
        <div class="detail-item">
            <strong>Membership Level:</strong> ${membershipLevels[data.membership] || data.membership}
        </div>
        ${data.description ? `<div class="detail-item">
            <strong>Business Description:</strong> ${data.description}
        </div>` : ''}
        <div class="detail-item">
            <strong>Application Date:</strong> ${formattedDate}
        </div>
    `;
}

// Initialize thank you page
document.addEventListener('DOMContentLoaded', function () {
    displayApplicationDetails();
});