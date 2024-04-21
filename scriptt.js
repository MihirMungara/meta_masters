function searchVideos() {
    const searchQuery = document.getElementById('searchInput').value;
    const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual YouTube API key
    const maxResults = 3; // Number of videos to display

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchQuery}&part=snippet&maxResults=${maxResults}&type=video`)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
}

function displayVideos(videos) {
    const videosSection = document.getElementById('videosSection');
    videosSection.innerHTML = '';

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;

        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <h3>${videoTitle}</h3>
        `;

        videosSection.appendChild(videoElement);
    });
}
