const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progressBar");
const playPauseButton = document.getElementById("playPause");
const progressContainer = document.getElementById("progressContainer");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const audioInfo = document.getElementById("audioInfo");
let currentRow = null;

const bookSelect = document.getElementById("bookSelect");

// Event listener for book dropdown
bookSelect.addEventListener("change", function() {
    const selectedBook = this.value;
    displayBookContent(selectedBook);
});

function displayBookContent(book) {
    switch (book) {
        case "book1":
            document.querySelector("h3:nth-of-type(3)").textContent = "The Book of Beginnings";
            document.querySelector("h3:nth-of-type(4)").textContent = "అతిప్రారంభ గ్రంథము";
            // You can add more content specific to Book 1 here
            break;
        case "book2":
            document.querySelector("h3:nth-of-type(3)").textContent = "The Book of Life";
            document.querySelector("h3:nth-of-type(4)").textContent = "జీవిత గ్రంథము";
            // You can add more content specific to Book 2 here
            break;
        case "book3":
            document.querySelector("h3:nth-of-type(3)").textContent = "The Book of Knowledge";
            document.querySelector("h3:nth-of-type(4)").textContent = "జ్ఞాన గ్రంథము";
            // You can add more content specific to Book 3 here
            break;
    }
}

document.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        if (currentRow) currentRow.classList.remove("highlight");
        const row = this.closest("tr");
        row.classList.add("highlight");
        currentRow = row;
        audioPlayer.src = row.dataset.audio;
        audioInfo.textContent = `${row.dataset.canto} - ${row.dataset.section}`;
        audioPlayer.play();
        playPauseButton.textContent = "⏸ Pause";
    });
});

playPauseButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = "⏸ Pause";
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = "▶ Play";
    }
});

audioPlayer.addEventListener("timeupdate", () => {
    progressBar.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 + "%";
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

progressContainer.addEventListener("click", (e) => {
    const percent = e.offsetX / progressContainer.offsetWidth;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}