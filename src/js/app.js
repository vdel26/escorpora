console.log("🐡 Hello, I'm an escórpora!")

import Barba from 'barba.js'

const mobileNav = document.querySelector('.navigation--mobile')
const menuIcon = mobileNav.querySelector('.menu-icon')
const menu = mobileNav.querySelector('.navigation--mobile .menu')
const brand = mobileNav.querySelector('.navigation--mobile .brand')
const pauseButton = document.querySelector('.pause-button')
const videosList = document.querySelector('.video-container')

const bringToFront = (item, collection) => {
  collection.insertBefore(item, collection.firstElementChild)
}

// start Barba page transitions
Barba.Pjax.start()
Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
 console.log('newPageReady', currentStatus)
})

// attach events
menuIcon.addEventListener('touchend', function () {
  console.log('menu toggle')
  mobileNav.classList.toggle('is-menu-open')
})

// video selection
const artistsList = document.querySelector('.artists')
let currentVideo = null

const playVideo = (video) => {
  // user clicked on a video and none was playing --> play it
  if (!currentVideo) {
    video.play()
    currentVideo = video
    video.classList.add('is-playing')
    bringToFront(video, videosList)
    document.body.classList.add('pause-cursor')
    pauseButton.classList.add('is-playing')

  // user clicked on the same video that was playing --> pause it
  } else if (currentVideo === video){
    video.pause()
    video.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    pauseButton.classList.remove('is-playing')
    currentVideo = null

  // user clicked on a different video while one was playing --> pause and play new
  } else if (video) {
    currentVideo.pause()
    currentVideo.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    pauseButton.classList.remove('is-playing')
    video.play()
    currentVideo = video
    video.classList.add('is-playing')
    bringToFront(video, videosList)
    document.body.classList.add('pause-cursor')
    pauseButton.classList.add('is-playing')
  }

  // user clicked outside any video --> pause current one
  else {
    currentVideo.pause()
    currentVideo.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    pauseButton.classList.remove('is-playing')
    currentVideo = null
  }
}

artistsList.addEventListener('click', function (evt) {
  let videoName = evt.target.parentNode.dataset.video
  let video = document.querySelector(`video[data-name="${videoName}"]`)
  console.log('current', currentVideo)
  console.log('new', video)
  playVideo(video)
})
