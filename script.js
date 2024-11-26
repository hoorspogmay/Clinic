
document.getElementById('clientForm').addEventListener('submit', function(e) {
    e.preventDefault();  

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;


    const clientId = generateClientId(name);

    document.getElementById('clientId').textContent = clientId;

 
    console.log({ name, email, phone, clientId });
});

function generateClientId(name) {
    const date = new Date();
    const timestamp = date.getTime(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Random number between 0-999
    return `${name.substring(0, 3).toUpperCase()}-${timestamp}-${randomNum}`;
}

// Array to store session data
let sessions = [];

// Function to handle form submission
document.getElementById('sessionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const sessionTime = document.getElementById('sessionTime').value;
    const clientId = generateClientId(clientName); 

    // Add session data to sessions array
    sessions.push({
        clientName,
        clientId,
        sessionTime,
    });

    // Clear form inputs after submission
    document.getElementById('sessionForm').reset();

    // Display sessions on the page
    displaySessions();
});

// Function to display scheduled sessions
function displaySessions() {
    const sessionDetailsList = document.getElementById('sessionDetailsList');
    sessionDetailsList.innerHTML = ''; // Clear previous list

    sessions.forEach((session, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${session.clientName} - Session at ${session.sessionTime}`;
        sessionDetailsList.appendChild(li);

        // Check if the session is about to happen
        checkSession(session);
    });
}


function generateClientId(name) {
    const date = new Date();
    const timestamp = date.getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${name.substring(0, 3).toUpperCase()}-${timestamp}-${randomNum}`;
}


function checkSession(session) {
    const currentTime = new Date();
    const sessionDateTime = new Date(session.sessionTime);


    const timeDifference = sessionDateTime - currentTime;


    if (timeDifference > 0 && timeDifference <= 10 * 60 * 1000) {
        sendAutoMessage(session);
    }
}


function sendAutoMessage(session) {
    console.log(`Sending auto message to ${session.clientName} (Client ID: ${session.clientId})`);
    alert(`Reminder: Your session with Dr. is at ${session.sessionTime}. Please be on time.`);
}

setInterval(() => {
    sessions.forEach((session) => {
        checkSession(session);
    });
}, 60000);

function goBack() {
    window.history.back();
}
