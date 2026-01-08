const audio = document.querySelector('#music')
const audioTime = document.querySelector('#audio-element > .current-time-display')
const audioVolumeSlider = document.querySelector('#audio-element > .volume-control')
const audioVolumeDisplay = document.querySelector('#audio-element > .volume-value-display')
const audioButton = document.querySelector('#audio-element > .media-control-button')

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds/60)
    const seconds = Math.floor(timeInSeconds%60)
    return `${minutes}:${seconds<10 ? `0${seconds}` : seconds}`
}

const playPauseAudio = () => {
    if (audio.paused || audio.ended) {
        audio.play()
        audioButton.textContent = "Pause"
    }else {
        audio.pause()
        audioButton.textContent = "Play"
    }
}

audioVolumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value
    audioVolumeDisplay.textContent = `Volume: ${Math.round(e.target.value * 100)}%`
})

audio.addEventListener('timeupdate', (e) => {
    audioTime.textContent = `Time: ${formatTime(audio.currentTime)}`
});

audio.addEventListener('ended', (e) => {
    audioTime.textContent = "Time: Audio has ended"
    audioButton.textContent = 'Replay'
})


const video = document.querySelector('#video')
const videoTime = document.querySelector('#video-element > .current-time-display')
const videoVolumeSlider = document.querySelector('#video-element > .volume-control')
const videoVolumeDisplay = document.querySelector('#video-element > .volume-value-display')
const videoButton = document.querySelector('#video-element > .media-control-button')

const playPauseVideo = () => {
    if (video.paused || video.ended) {
        video.play()
        videoButton.textContent = "Pause"
    }else {
        video.pause()
        videoButton.textContent = "Play"
    }
}

videoVolumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value
    videoVolumeDisplay.textContent = `Volume: ${Math.round(e.target.value * 100)}%`
})

video.addEventListener('volumechange', (e) => {
    videoVolumeSlider.value = e.target.volume
    videoVolumeDisplay.textContent = `Volume: ${Math.round(e.target.volume * 100)}%`
})

video.addEventListener('timeupdate', (e) => {
    videoTime.textContent = `Time: ${formatTime(video.currentTime)}`
});

video.addEventListener('ended', (e) => {
    videoTime.textContent = "Time: Video has ended"
    videoButton.textContent = 'Replay'
})