# Simple Music Player

## Project Description
This is a simple music player web application built using HTML, CSS, and JavaScript. The application allows users to play, pause, and navigate through a list of songs with basic controls and a progress bar. The design is minimalistic and modern, featuring animations and a responsive layout.

## Project Structure
```
simple-music-player/
│
├── css/
│   └── style.css
│
├── images/
│   ├── favicon.svg
│   ├── music1_img.jpg
│   ├── music2_img.jpg
│   ├── music3_img.jpg
│   ├── music4_img.jpg
│
├── music/
│   ├── music1_audio.mp3
│   ├── music2_audio.mp3
│   ├── music3_audio.mp3
│   └── music4_audio.mp3
│
├── script/
│   └── script.js
│
└── index.html
```

## Features
- Play and pause music.
- Navigate to the next or previous song.
- Display the current song's title and artist.
- Display the song's album cover.
- Show the current playback time and total duration.
- Provide a progress bar to seek within the song.
- Responsive and modern design with animations.

## Getting Started

### Prerequisites
To run this project, you only need a web browser.

### Installation
1. Clone the repository or download the project files.
   ```sh
   git clone https://github.com/Ayush272002/Simple-Music-Player.git
   ```
2. Navigate to the project directory.
   ```sh
   cd simple-music-player
   ```

### Running the Application
1. Open the `index.html` file in your preferred web browser.
   ```sh
   open index.html
   ```

## File Descriptions

### index.html
This is the main HTML file that structures the music player. It includes links to the external CSS and JavaScript files.

### style.css
This file contains the CSS code for styling the music player. It defines the layout, colors, fonts, and animations used in the application.

### script.js
This JavaScript file manages the functionality of the music player, including play/pause controls, song navigation, progress bar updates, and animations.

### images/
This directory contains the album cover images for each song and a favicon for the webpage.

### music/
This directory contains the audio files for the songs that can be played in the music player.

## Usage
- **Play/Pause:** Click the play button to start playing music and the pause button to pause.
- **Next/Previous:** Click the next button to move to the next song or the previous button to move to the previous song.
- **Seek:** Use the progress bar to seek within the currently playing song.
- **Current Time and Duration:** The current time of the song is displayed on the left, and the total duration is displayed on the right of the progress bar.

## Customization
To customize the music player:
1. **Add New Songs:**
   - Add new audio files to the `music/` directory.
   - Add corresponding album cover images to the `images/` directory.
   - Update the `songs` array in `script.js` with the new song details.

2. **Modify Styles:**
   - Edit `style.css` to change the appearance of the music player.

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

---

