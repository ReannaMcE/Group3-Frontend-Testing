// Get the popup
var popup = document.getElementById('popup');

// Get the button that opens the popup
var btn = document.getElementById('popupButton');

// Get the <span> element that closes the popup
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the popup 
btn.onclick = function() {
    logout();
}

// When the user clicks on <span> (x), close the popup
span.onclick = function() {
    popup.style.display = 'none';
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}

// Logout function
async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin'
        });

        if (response.ok) {
            document.getElementById('popupMessage').innerText = 'You have been logged out successfully.';
            popup.style.display = 'block';
            setTimeout(() => {
                window.location.href = '/loginForm';
            }, 2000);
        } else {
            document.getElementById('popupMessage').innerText = 'Failed to log out.';
            popup.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('popupMessage').innerText = 'An error occurred.';
        popup.style.display = 'block';
    }
}