document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');

    // Load theme from local storage
    loadTheme();

    // Set up event listeners
    setupThemeToggle();
    setupModalClose();
    setupThemeForm();
    setupNavigationButtons();
    setupFeedbackForm();
    setupLikeDislikeButtons();
    setupHideButtons();
    setupShareButtons();
});

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
}

function setupThemeToggle() {
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.getElementById('themeModal').style.display = 'block';
    });
}

function setupModalClose() {
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('themeModal').style.display = 'none';
    });
}

function setupThemeForm() {
    document.getElementById('themeForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedTheme = document.getElementById('theme').value;
        document.body.className = selectedTheme; // Change theme
        localStorage.setItem('theme', selectedTheme); // Save to local storage
        document.getElementById('themeModal').style.display = 'none'; // Close the modal
    });
}

function setupNavigationButtons() {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            showLoadingScreen();
            switchSections(targetId);
        });
    });
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.remove('hidden');
}

function switchSections(targetId) {
    const loadingScreen = document.getElementById('loadingScreen');
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
}

function setupLikeDislikeButtons() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleLike(btn);
        });
    });

    document.querySelectorAll('.dislike-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleDislike(btn);
        });
    });
}

function toggleLike(btn) {
    const dislikeBtn = btn.closest('.action-buttons').querySelector('.dislike-btn');
    btn.innerText = btn.innerText === '👍 Like' ? 'Liked' : '👍 Like';
    dislikeBtn.disabled = (btn.innerText === 'Liked');
}

function toggleDislike(btn) {
    const likeBtn = btn.closest('.action-buttons').querySelector('.like-btn');
    btn.innerText = btn.innerText === '👎 Dislike' ? 'Disliked' : '👎 Dislike';
    likeBtn.disabled = (btn.innerText === 'Disliked');
}

function setupHideButtons() {
    document.querySelectorAll('.hide-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const imageContainer = event.target.closest('.image-container');
            imageContainer.style.display = 'none'; // Hide the image
        });
    });
}

function setupShareButtons() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Image link copied to clipboard!'); // Replace with actual sharing logic
        });
    });
}

function setupFeedbackForm() {
    document.getElementById('feedbackForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
        const feedbackType = document.getElementById('feedbackSelect').value; // Ensure you have this element
        const feedbackMessage = document.getElementById('feedbackMessage').value;
        console.log(`Feedback Submitted: ${feedbackType} - ${feedbackMessage}`);
        document.getElementById('feedbackForm').reset(); // Reset the form
    });
}
