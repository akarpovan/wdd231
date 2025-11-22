// Display application details
function displayApplicationDetails() {
    const applicationData = localStorage.getItem('membershipApplication');
    const detailsContainer = document.getElementById('applicationDetails');

    if (!applicationData) {
        detailsContainer.innerHTML = '<p>No application data found.</p>';
        return;
    }

    const data = JSON.parse(applicationData);

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

    detailsContainer.innerHTML = `
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
            <strong>Membership Level:</strong> ${membershipLevels[data.membership]}
        </div>
        ${data.description ? `<div class="detail-item">
            <strong>Business Description:</strong> ${data.description}
        </div>` : ''}
        <div class="detail-item">
            <strong>Application Date:</strong> ${formattedDate}
        </div>
    `;

    // Clear the stored data
    localStorage.removeItem('membershipApplication');
}

// Initialize thank you page
document.addEventListener('DOMContentLoaded', function () {
    displayApplicationDetails();
});