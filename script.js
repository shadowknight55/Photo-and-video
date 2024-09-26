let player;
let videoList = [
    { id: "4rs8B3KG8eE", duration: 1680 }, // Main Video: 28 minutes
    { id: "patvsyqr3Bw", duration: 1837 }, // Suggested Video 1: 30 minutes 37 seconds
    { id: "59ewVQBS4Zg", duration: 1872 }, // Suggested Video 2: 31 minutes 22 seconds
    { id: "kf_irnQWOU8", duration: 5177 }, // Suggested Video 3: 1 hour 26 minutes 17 seconds
    { id: "X0KbKzkfCO4", duration: 827 },  // Suggested Video 4: 13 minutes 47 seconds
    { id: "72AdszbWSjY", duration: 34 }     // Suggested Video 5: 34 seconds
];
let currentVideoIndex = 0;
let timerInterval;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer', {
        height: '450',
        width: '100%',
        videoId: videoList[currentVideoIndex].id,
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    } else if (event.data === YT.PlayerState.PLAYING) {
        startTimer(); // Start timer when video is playing
    } else if (event.data === YT.PlayerState.PAUSED) {
        stopTimer(); // Stop timer when video is paused
    }
}

function startTimer() {
    stopTimer(); // Stop any existing timer
    let remainingTime = videoList[currentVideoIndex].duration;
    updateTimerDisplay(remainingTime);
    timerInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay(remainingTime);
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            playNextVideo();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay(0); // Reset timer display
}

function updateTimerDisplay(seconds) {
    const timerElement = document.getElementById('videoTimer');
    timerElement.textContent = `Time Remaining: ${formatTime(seconds)}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function playNextVideo() {
    if (currentVideoIndex < videoList.length - 1) {
        currentVideoIndex++;
        player.loadVideoById(videoList[currentVideoIndex].id);
        if (document.getElementById('autoplayToggle').checked) {
            enterFullScreen();
        }
    }
}

// Function to enter full screen
function enterFullScreen() {
    const iframe = document.getElementById('videoPlayer');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');

    // Video item event listeners
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', () => {
            const videoId = item.getAttribute('data-video-id');
            currentVideoIndex = videoList.findIndex(video => video.id === videoId);
            player.loadVideoById(videoId);
            startTimer();
            if (document.getElementById('autoplayToggle').checked) {
                enterFullScreen();
            }
        });
    });

    // Photo buttons event listeners
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert('You liked this photo!');
        });
    });

    document.querySelectorAll('.dislike-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert('You disliked this photo!');
        });
    });

    document.querySelectorAll('.hide-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.target.closest('.image-container').style.display = 'none';
        });
    });

    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert('Share this photo with your friends!');
        });
    });

    // Feedback submission
    document.getElementById('submitFeedback').addEventListener('click', () => {
        const feedbackType = document.getElementById('feedbackSelect').value;
        alert(`Feedback submitted: ${feedbackType}`);
    });
});

     