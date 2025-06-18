//your JS code here. If required.
const app = document.getElementById('app');
const video = document.querySelector('.vid-container video');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('#time-select button');
const soundPicker = document.querySelectorAll('.sound-picker button');

let currentSound = new Audio('Sounds/beach.mp3');
let fakeDuration = 600; // 10 mins
let timer;
let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    currentSound.pause();
    clearInterval(timer);
    playBtn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/play--v1.png" width="40"/>`;
  } else {
    currentSound.play();
    timer = startTimer(fakeDuration);
    playBtn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/pause--v1.png" width="40"/>`;
  }
  isPlaying = !isPlaying;
});

timeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.id;
    if (id === 'smaller-mins') fakeDuration = 120;
    if (id === 'medium-mins') fakeDuration = 300;
    if (id === 'long-mins') fakeDuration = 600;

    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:0`;
    if (isPlaying) {
      currentSound.pause();
      currentSound.currentTime = 0;
      clearInterval(timer);
      playBtn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/play--v1.png" width="40"/>`;
      isPlaying = false;
    }
  });
});

soundPicker.forEach(btn => {
  btn.addEventListener('click', () => {
    const soundSrc = btn.getAttribute('data-sound');
    const videoSrc = btn.getAttribute('data-video');
    currentSound.pause();
    currentSound = new Audio(soundSrc);
    video.src = videoSrc;
    if (isPlaying) {
      currentSound.play();
    }
  });
});

function startTimer(duration) {
  let timeLeft = duration;
  timeDisplay.textContent = formatTime(timeLeft);

  return setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      currentSound.pause();
      currentSound.currentTime = 0;
      playBtn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/play--v1.png" width="40"/>`;
      isPlaying = false;
      return;
    }
    timeDisplay.textContent = formatTime(timeLeft);
  }, 1000);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
