document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');

    // Load theme from local storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;

    // Open the theme selection modal
    document.getElementById('themeToggle').addEventListener('click', () => {
        const themeModal = document.getElementById('themeModal');
        themeModal.style.display = 'block';

        // Create theme options
        const themeSelect = document.getElementById('theme');
        const themes = ['light', 'dark', 'blue'];
           themeSelect.innerHTML = ''; // Clear previous options

        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
            themeSelect.appendChild(option);
        });
    });

    // Close the modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('themeModal').style.display = 'none';
    });

    // Save the theme preference
    document.getElementById('themeForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedTheme = document.getElementById('theme').value;
        document.body.className = selectedTheme; // Change theme
        localStorage.setItem('theme', selectedTheme); // Save to local storage
        document.getElementById('themeModal').style.display = 'none'; // Close the modal
    });

    // Navigation button functionality
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Show loading screen
            loadingScreen.classList.remove('hidden');

            // Wait for a short time before switching sections
            setTimeout(() => {
                document.querySelectorAll('.image-container').forEach(container => {
                    if (container.id === targetId) {
                        container.classList.remove('hidden');
                        container.classList.add('show');
                    } else {
                        container.classList.add('hidden');
                        container.classList.remove('show');
                    }
                });

                // Hide loading screen
                loadingScreen.classList.add('hidden');
            }, 500); // Adjust timing as needed
        });
    });

    // Like, dislike, hide, and share functionality
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dislikeBtn = btn.closest('.action-buttons').querySelector('.dislike-btn');
            btn.innerText = btn.innerText === '👍 Like' ? 'Liked' : '👍 Like';
            dislikeBtn.disabled = (btn.innerText === 'Liked');
        });
    });

    document.querySelectorAll('.dislike-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const likeBtn = btn.closest('.action-buttons').querySelector('.like-btn');
            btn.innerText = btn.innerText === '👎 Dislike' ? 'Disliked' : '👎 Dislike';
            likeBtn.disabled = (btn.innerText === 'Disliked');
        });
    });

    document.querySelectorAll('.hide-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const imageContainer = event.target.closest('.image-container');
            imageContainer.style.display = 'none'; // Hide the image
        });
    });

    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Image link copied to clipboard!'); // Replace with actual sharing logic
        });
    });

    // Feedback form submission
    document.getElementById('feedbackForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
        const feedbackType = document.getElementById('feedbackSelect').value; // Ensure you have this element
        const feedbackMessage = document.getElementById('feedbackMessage').value;
        console.log(`Feedback Submitted: ${feedbackType} - ${feedbackMessage}`);
        
        // Reset the form
        document.getElementById('feedbackForm').reset();
    });
});
