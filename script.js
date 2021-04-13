const audioContainer = document.querySelector('.audio-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress')
const songTitle = document.querySelector('#title')
const coverArt = document.querySelector('#cover-art')
const toggle = document.querySelector('#toggle')
const copyright = document.querySelector('#copyright')

const songs = ['Snow Dancer', 'When Winter Rises', 'Your Little Wings']

const songInfo = [
  ["<strong>Snow Dancer</strong> by Roa: <a href='https://soundcloud.com/roa_music1031​'>https://soundcloud.com/roa_music1031​</a>",
  "Creative Commons — Attribution 3.0 Unported — CC BY 3.0",
  "Free Download / Stream: <a href='http://bit.ly/-snow-dancer'>http://bit.ly/-snow-dancer</a>​",
  "Music promoted by Audio Library <a href='https://youtu.be/UsWo0uegykc'>https://youtu.be/UsWo0uegykc</a>"],
  ["<strong>When Winter Rises</strong> by Vendredi: <a href='https://soundcloud.com/vendrediduo​'>https://soundcloud.com/vendrediduo</a>",
  "Creative Commons — Attribution 3.0 Unported — CC BY 3.0​",
  "Free Download / Stream: <a href='https://bit.ly/2QNGhrw​'>https://bit.ly/2QNGhrw​</a>",
  "Music promoted by Audio Library: <a href='https://youtu.be/YxXZ9v87IbM'>https://youtu.be/YxXZ9v87IbM</a>​"],
  ["<strong>Your Little Wings</strong> by Tokyo Music Walker: <a href='https://soundcloud.com/user-356546060'>https://soundcloud.com/user-356546060</a>",
  "Creative Commons — Attribution 3.0 Unported — CC BY 3.0​",
  "Free Download / Stream:  <a href='http://bit.ly/-your-little-wings'>http://bit.ly/-your-little-wings</a>​",
  "Music promoted by Audio Library - <a href='https://youtu.be/od41oz5Gf6g'/>https://youtu.be/od41oz5Gf6g</>"]
]

let songIndex = 2

loadSong(songs[songIndex])

function loadSongInfo() {
  songInfo[songIndex].map( item => {
    let div = document.createElement('div')
    div.innerHTML = item
    copyright.appendChild(div)
  })
}

function clearSongInfo() {
  copyright.innerHTML = ""
}

function loadSong(song) {
  loadSongInfo()
  songTitle.innerHTML = song
  audio.src = `songs/${song}.mp3`
  coverArt.src = `cover-art/${song}.jpg`
}

function playSong() {
  audioContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

function pauseSong() {
  audioContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  audio.pause()
}

function prevSong() {
  clearSongInfo()
  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])

  const isPlaying = audioContainer.classList.contains('play')

  if (isPlaying) {
    playSong()
  }
}

function nextSong() {
  clearSongInfo()
  songIndex++;

  if(songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])

  const isPlaying = audioContainer.classList.contains('play')

  if (isPlaying) {
    playSong()
  }
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () => {
  const isPlaying = audioContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  }
  else {
    playSong()
  }
})

toggle.addEventListener('click', () => {
  const isToggled = toggle.classList.contains('fa-chevron-circle-left')

  if(isToggled) {
    toggle.classList.remove('fa-chevron-circle-left')
    toggle.classList.add('fa-chevron-circle-down')
    audioContainer.classList.add('toggle-show')
  }
  else {
    toggle.classList.add('fa-chevron-circle-left')
    toggle.classList.remove('fa-chevron-circle-down')
    audioContainer.classList.remove('toggle-show')
  }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)

progressContainer.addEventListener('click', setProgress)