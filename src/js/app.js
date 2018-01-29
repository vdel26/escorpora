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

const playVideo = (video) => {
  video.classList.add('is-playing')
}

// video selection
const artistsList = document.querySelector('.artists')
artistsList.addEventListener('click', function (evt) {
  let videoName = evt.target.dataset.video
  let video = document.querySelector(`video[data-name="${videoName}"]`)
  if (video.paused) {
    video.play()
    video.classList.add('is-playing')
  }
  else {
    video.pause()
    video.classList.remove('is-playing')
  }
  console.log(evt.target)
  console.log(videoName)
  console.log(video)
})
