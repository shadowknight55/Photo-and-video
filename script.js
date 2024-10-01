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

        const themeSelect = document.getElementById('theme');
        const themes = ['light', 'dark', 'blue', 'nature', 'space', 'retro'];
        themeSelect.innerHTML = ''; // Clear previous options

        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
            themeSelect.appendChild(option);
        });

        // Set the current theme in the select box
        themeSelect.value = savedTheme;
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

    // Navigation button functionality
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
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
            imageContainer.style.display = 'none'; 
        });
    });

    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Image link copied to clipboard!');
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

