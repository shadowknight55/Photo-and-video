document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');

    // Load theme from local storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;

    let isPasswordSet = false; // Track if the password has been set

    // Open profile form
    document.getElementById('profileToggle').addEventListener('click', () => {
        const profileContainer = document.getElementById('profileFormContainer');
        profileContainer.style.display = profileContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Open the theme selection modal
    document.getElementById('themeToggle').addEventListener('click', () => {
        const themeModal = document.getElementById('themeModal');
        themeModal.style.display = 'block';

        const themeSelect = document.getElementById('theme');
        themeSelect.innerHTML = `
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
            <option value="nature">Nature</option>
            <option value="space">Space</option>
            <option value="retro">Retro</option>
        `;
        themeSelect.value = savedTheme; // Set current theme in dropdown
    });

    // Close the modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('themeModal').style.display = 'none';
    });

    // Switch theme function
    function switchTheme(theme) {
        document.body.className = ''; // Clear all classes
        document.body.classList.add(theme); // Add the selected theme class
    }

    // Save the theme preference
    document.getElementById('themeForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedTheme = document.getElementById('theme').value;
        switchTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        document.getElementById('themeModal').style.display = 'none';
    });

    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation for username length
        if (username.length < 4) {
            document.getElementById('usernameError').textContent = "Username must be at least 4 characters long.";
            return;
        } else {
            document.getElementById('usernameError').textContent = "";
        }

        // Set password and mark it as set
        if (password) {
            isPasswordSet = true; // Password is set
            console.log(`Profile Created: ${username}, ${email}`);
            document.getElementById('profileForm').reset();
            document.getElementById('profileFormContainer').style.display = 'none'; // Hide profile form
        } else {
            alert("Please enter a password.");
        }
    });

    // Navigation button functionality
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            if (!isPasswordSet) {
                alert("You must enter a password to access this section.");
                return; // Prevent navigation if password is not set
            }
            const targetId = button.getAttribute('data-target');
            loadingScreen.classList.remove('hidden');

            setTimeout(() => {
                document.querySelectorAll('.container').forEach(container => {
                    if (container.id === targetId) {
                        container.classList.remove('hidden');
                        container.classList.add('show');
                    } else {
                        container.classList.add('hidden');
                        container.classList.remove('show');
                    }
                });

                loadingScreen.classList.add('hidden');
            }, 500);
        });
    });

    // Feedback form submission
    document.getElementById('feedbackForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const feedbackType = document.getElementById('feedbackType').value;
        const feedbackMessage = document.getElementById('feedbackMessage').value;
        console.log(`Feedback Submitted: ${feedbackType} - ${feedbackMessage}`);
        document.getElementById('feedbackForm').reset();
    });
});
