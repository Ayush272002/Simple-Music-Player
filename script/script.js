const music = document.querySelector("audio");
const play = document.getElementById("play");
const img = document.querySelector("img");
const dur = document.getElementById("duration");
const progress = document.getElementById("progress");
const current_time = document.getElementById("current_time");

let isPlaying = false;
let currentRotation = 0;
let lastTimestamp = 0;

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
  // music duration update
  const { currentTime, duration } = event.target;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  // current time update
  let min_current = Math.floor(currentTime / 60);
  let sec_current = Math.floor(currentTime % 60);
  if (sec_current < 10) sec_current = `0${sec_current}`;
  current_time.textContent = `${min_current}:${sec_current}`;
});

//add control for progress bar
const progress_div = document.getElementById("progress_div");
progress_div.addEventListener("click", (event) => {
    const { duration } = music;
    let move_progress = (event.offsetX / event.target.clientWidth) * duration;
    // console.log(move_progress);

    music.currentTime = move_progress
})

// next song function
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

// Initial load
loadSong(songs[songIndex]);
