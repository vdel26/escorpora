console.log("🐡 Hello, I'm an escórpora!")

import Barba from 'barba.js'
import anime from 'animejs'

const mobileNav = document.querySelector('.navigation--mobile')
const menuIcon = mobileNav.querySelector('.menu-icon')
const menu = mobileNav.querySelector('.navigation--mobile .menu')
const brand = mobileNav.querySelector('.navigation--mobile .brand')
const pauseButton = document.querySelector('.pause-button')
const videosList = document.querySelector('.video-container')

// reorder all child nodes in `collection`
// so that `item` is the first one
const bringToFront = (item, collection) => {
  collection.insertBefore(item, collection.firstElementChild)
}

// custom Barba page transition
const BlurTransition = Barba.BaseTransition.extend({
  start: function () {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this))
  },

  fadeOut: function () {
    let _this = this
    let deferred = Barba.Utils.deferred()
    anime({
      targets: _this.oldContainer,
      opacity: {
        value: 0,
        duration: 1000,
        delay: 0
      },
      filter: {
        value: ['blur(0px)', 'blur(20px)'],
        duration: 1000,
        delay: 150
      },
      easing: 'easeOutQuart',
      complete: function (anim) {
        deferred.resolve()
      }
    })
    return deferred.promise
  },

  fadeIn: function () {
    let _this = this
    requestAnimationFrame(() => {
      this.oldContainer.style.display = 'none'
      this.newContainer.style.visibility = 'visible'
      this.newContainer.style.opacity = '0'
    })
    anime({
      targets: _this.newContainer,
      opacity: {
        value: 1,
        duration: 1000,
        delay: 150
      },
      filter: {
        value: ['blur(20px)', 'blur(0px)'],
        duration: 1000,
        delay: 0
      },
      easing: 'easeInQuart',
      complete: function (anim) {
        _this.done()
      }
    })
  }
})

// use our custom transition
Barba.Pjax.getTransition = function() { return BlurTransition }

// start Barba page transitions
Barba.Pjax.start()
Barba.Prefetch.init()
Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
  // without this line, the new container comes with opacity=1
  container.style.opacity = '0'
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
