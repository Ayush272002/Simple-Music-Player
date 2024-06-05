const music = document.querySelector("audio");
const play = document.getElementById("play");
const img = document.querySelector("img");
const dur = document.getElementById("duration");
const progress_slider = document.getElementById("progress");
const current_time = document.getElementById("current_time");

let isPlaying = false;
let currentRotation = 0;
let lastTimestamp = 0;
let isDragging = false;

// Reset button style function
let resetTimeoutId = null;

function resetButtonStyle(button) {
  if (resetTimeoutId) {
    clearTimeout(resetTimeoutId);
  }

  if (button.classList.contains("main_button")) {
    // If the button is the play/pause button
    button.style.backgroundColor = "#111"; 
    button.style.color = "#f6f6f6"; 
    resetTimeoutId = setTimeout(() => {
      button.style.backgroundColor = "#111"; 
      button.style.color = "#f6f6f6"; 
      resetTimeoutId = null;
    }, 500);
  } else {
    // If the button is not the play/pause button
    button.style.color = "gray"; 
    resetTimeoutId = setTimeout(() => {
      button.style.color = "#111111"; 
      resetTimeoutId = null;
    }, 500);
  }
}

const rotateImage = (timestamp) => {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const elapsed = timestamp - lastTimestamp;
  currentRotation += (elapsed / 3000) * 360; // 3000ms for one full rotation
  img.style.transform = `rotate(${currentRotation % 360}deg)`;
  lastTimestamp = timestamp;

  if (isPlaying) {
    requestAnimationFrame(rotateImage);
  }
};

const playMusic = () => {
  if (music.paused) {
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    isPlaying = true;
    lastTimestamp = 0; // reset timestamp for new animation frame
    requestAnimationFrame(rotateImage);
  } else {
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    isPlaying = false;
  }
};

play.addEventListener("click", playMusic);
play.addEventListener("touchstart", () => {
  resetButtonStyle(play);
});

// changing music data
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const songs = [
  {
    name: "music1",
    title: "Mockingbird",
    artist: "Eminem",
  },
  {
    name: "music2",
    title: "Best of Me",
    artist: "Neffex",
  },
  {
    name: "music3",
    title: "Despacito",
    artist: "Luis Fonsi",
  },
  {
    name: "music4",
    title: "Skyfall",
    artist: "Adele",
  },
];

const loadSong = (song) => {
  title.textContent = song.title;
  artist.textContent = song.artist;
  music.src = `music/${song.name}_audio.mp3`;
  img.src = `images/${song.name}_img.jpg`;
  // Wait for metadata to load to set duration
  music.addEventListener("loadedmetadata", () => {
    const duration = music.duration;
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if (sec_duration < 10) sec_duration = `0${sec_duration}`;
    dur.textContent = `${min_duration}:${sec_duration}`;
    // Set initial slider value and current time
    progress_slider.value = 0;
    current_time.textContent = `0:00`;
    // Set the initial background of the slider
    progress_slider.style.background = `linear-gradient(to right, #000 0%, #fff 0%)`;
  });
};

let songIndex = 0;

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

// progress js
music.addEventListener("timeupdate", (event) => {
  if (isDragging) return; // Don't update the slider if dragging
  // music duration update
  const { currentTime, duration } = event.target;
  let progress_time = (currentTime / duration) * 100;
  progress_slider.value = progress_time;

  // Update the progress bar color
  progress_slider.style.background = `linear-gradient(to right, #000 ${progress_time}%, #fff ${progress_time}%)`;

  // current time update
  let min_current = Math.floor(currentTime / 60);
  let sec_current = Math.floor(currentTime % 60);
  if (sec_current < 10) sec_current = `0${sec_current}`;
  current_time.textContent = `${min_current}:${sec_current}`;
});

// Handle dragging start for mouse and touch
progress_slider.addEventListener("mousedown", () => {
  isDragging = true;
});
progress_slider.addEventListener("touchstart", () => {
  isDragging = true;
});

// Handle dragging move for mouse and touch
progress_slider.addEventListener("input", (event) => {
  const { value } = event.target;
  const { duration } = music;
  current_time.textContent = formatTime((value / 100) * duration); // Update current time dynamically
  // Update the progress bar color instantly
  progress_slider.style.background = `linear-gradient(to right, #000 ${value}%, #fff ${value}%)`;
});

// Handle dragging end for mouse and touch
progress_slider.addEventListener("mouseup", (event) => {
  const { value } = event.target;
  const { duration } = music;
  music.currentTime = (value / 100) * duration;
  if (isPlaying) {
    music.play();
  }
  isDragging = false;
});
progress_slider.addEventListener("touchend", (event) => {
  const { value } = event.target;
  const { duration } = music;
  music.currentTime = (value / 100) * duration;
  if (isPlaying) {
    music.play();
  }
  isDragging = false;
});

// next song function
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
next.addEventListener("touchstart", () => {
  resetButtonStyle(next);
});

prev.addEventListener("click", prevSong);
prev.addEventListener("touchstart", () => {
  resetButtonStyle(prev);
});

// Function to format time in mm:ss format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

// Initial load
loadSong(songs[songIndex]);