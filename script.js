<script>
    let player;
    let videoList = [
        "4rs8B3KG8eE", // Main Video
        "patvsyqr3Bw", // Suggested Video 1
        "59ewVQBS4Zg", // Suggested Video 2
        "kf_irnQWOU8", // Suggested Video 3
        "X0KbKzkfCO4", // Suggested Video 4
        "72AdszbWSjY"  // Suggested Video 5
    ];
    let currentVideoIndex = 0;

    // Function to create the YouTube player
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('videoPlayer', {
            height: '450',
            width: '100%',
            videoId: videoList[currentVideoIndex],
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            playNextVideo();
        }
    }

    function playNextVideo() {
        if (currentVideoIndex < videoList.length - 1) {
            currentVideoIndex++;
            player.loadVideoById(videoList[currentVideoIndex]);
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

    // Ensure the loading screen is hidden when the page initially loads
    document.addEventListener("DOMContentLoaded", () => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');

        // Event listeners for suggested video items
        document.querySelectorAll('.video-item').forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                currentVideoIndex = videoList.indexOf(videoId);
                player.loadVideoById(videoId);
            });
        });
    });

    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const loadingScreen = document.getElementById('loadingScreen');

            // Show loading screen
            loadingScreen.classList.remove('hidden');

            // Wait for a short time before switching sections
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

                // Hide loading screen
                loadingScreen.classList.add('hidden');
            }, 500); // Adjust timing as needed
        });
    });
</script>
