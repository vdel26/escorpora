console.log("🐡 Hello, I'm an escórpora!")

const mobileNav = document.querySelector('.navigation--mobile')
const menuIcon = mobileNav.querySelector('.menu-icon')
const menu = mobileNav.querySelector('.navigation--mobile .menu')
const brand = mobileNav.querySelector('.navigation--mobile .brand')

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
    document.body.classList.add('pause-cursor')

  // user clicked on the same video that was playing --> pause it
  } else if (currentVideo === video){
    video.pause()
    video.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    currentVideo = null

  // user clicked on a different video while one was playing --> pause and play new
  } else if (video) {
    currentVideo.pause()
    currentVideo.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    video.play()
    currentVideo = video
    video.classList.add('is-playing')
    document.body.classList.add('pause-cursor')
  }

  // user clicked outside any video --> pause current one
  else {
    currentVideo.pause()
    currentVideo.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
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
