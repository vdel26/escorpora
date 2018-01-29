console.log("🦊 Hello! Edit me in src/js/app.js")

// // feature detection: scrollbar hiding
// try {
//   const scrollbarFeature = document.querySelector('::-webkit-scrollbar')
// } catch (err) {
//   console.log(err)
// }

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

  // user clicked on the same video that was playing --> pause it
  } else if (currentVideo === video){
    video.pause()
    video.classList.remove('is-playing')
    currentVideo = null

  // user clicked on a different video while one was playing --> pause and play new
  } else {
    currentVideo.pause()
    currentVideo.classList.remove('is-playing')
    video.play()
    currentVideo = video
    video.classList.add('is-playing')
  }
}

artistsList.addEventListener('click', function (evt) {
  let videoName = evt.target.dataset.video
  let video = document.querySelector(`video[data-name="${videoName}"]`)
  console.log('current', currentVideo)
  console.log('new', video)
  playVideo(video)
})
