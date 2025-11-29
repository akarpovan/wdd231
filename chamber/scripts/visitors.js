// Current date in milliseconds
const currentDate = Date.now();

// Last visit from localStorage
const lastVisit = localStorage.getItem('lastVisit');

// Variable for message
let message = '';

// Check if first visit
if (!lastVisit) {
    // Message for FIRST VISIT
    message = 'Welcome! Let us know if you have any questions.';
} else {
    // RETURNING VISITOR
    // Calculate days between visits
    const timeDiff = currentDate - parseInt(lastVisit);
    const daysBetween = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // 1000 milisegundos = 1 segundo
    // 60 segundos = 1 minuto
    // 60 minutos = 1 hora
    // 24 horas = 1 día
    // Por lo tanto: 1000 × 60 × 60 × 24 = 86,400,000 milisegundos en un día

    if (daysBetween < 1) {
        // SAME DAY
        message = 'Back so soon! Awesome!';
    } else {
        // MULTIPLE DAYS
        const dayWord = daysBetween === 1 ? 'day' : 'days';
        message = `You last visited ${daysBetween} ${dayWord} ago.`;
    }
}

// Display the message
document.getElementById('visitMessage').textContent = message;

// Save current date for next visit
localStorage.setItem('lastVisit', currentDate.toString());


//To simulate a visit 3 days ago, I will paste this code into the browser console using F12.
/*const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
localStorage.setItem('lastVisit', threeDaysAgo.toString());
location.reload();*/

//Reset to try again
/*localStorage.removeItem('lastVisit');
   location.reload();*/