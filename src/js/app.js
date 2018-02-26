console.log("🐡 Hello, I'm an escórpora!")

import Barba from 'barba.js'
import anime from 'animejs'

const mobileNav = document.querySelector('.navigation--mobile')
const menuIcon = mobileNav.querySelector('.menu-icon')
const menu = mobileNav.querySelector('.navigation--mobile .menu')
const brand = mobileNav.querySelector('.navigation--mobile .brand')
let pauseButton = document.querySelector('.pause-button')
let videosList = document.querySelector('.video-container')
let artistsList = document.querySelector('.artists')

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

    // we take the old container out of the flexbox layout as soon as
    // the new one is in the DOM, so that the layout doesn't break
    this.oldContainer.style.position = 'absolute'

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

// attach menu events
menuIcon.addEventListener('touchend', function () {
  mobileNav.classList.toggle('is-menu-open')
})

// video state
let currentVideo = null
let currentItem = null

// const handlePlayError = (promise) => {
//     promise.catch(error => console.error(console.error()))
// }

const playVideo = (video, listItem) => {
  console.log(listItem)
  // user clicked on a video and none was playing --> play it
  if (!currentVideo) {
    video.load()
    requestAnimationFrame(() => {
      video.play()
    })
    currentVideo = video
    currentItem = listItem
    listItem.classList.add('is-blink')
    video.classList.add('is-playing')
    bringToFront(video, videosList)
    document.body.classList.add('pause-cursor')
    pauseButton.classList.add('is-playing')

  // user clicked on the same video that was playing --> pause it
  } else if (currentVideo === video){
    video.pause()
    listItem.classList.remove('is-blink')
    video.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    pauseButton.classList.remove('is-playing')
    currentVideo = null
    currentItem = null

  // user clicked on a different video while one was playing --> pause and play new
  } else if (video) {
    currentVideo.pause()
    currentItem.classList.remove('is-blink')
    currentVideo.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    pauseButton.classList.remove('is-playing')
    video.load()
    requestAnimationFrame(() => {
      video.play()
    })
    currentVideo = video
    currentItem = listItem
    listItem.classList.add('is-blink')
    video.classList.add('is-playing')
    bringToFront(video, videosList)
    document.body.classList.add('pause-cursor')
    pauseButton.classList.add('is-playing')
  }

  // user clicked outside any video --> pause current one
  else {
    currentVideo.pause()
    currentItem.classList.remove('is-blink')
    currentVideo.classList.remove('is-playing')
    document.body.classList.remove('pause-cursor')
    pauseButton.classList.remove('is-playing')
    currentVideo = null
    currentItem = null
  }
}

const attachListEvents = () => {
  artistsList.addEventListener('click', function (evt) {
    let listItem = evt.target
    let videoName = evt.target.dataset.video
    let video = document.querySelector(`video[data-name="${videoName}"]`)
    console.log('current', currentVideo)
    console.log('new', video)
    playVideo(video, listItem)
  })
}

////

// use our custom transition
Barba.Pjax.getTransition = function() { return BlurTransition }

// start Barba page transitions
Barba.Pjax.start()
Barba.Prefetch.init()
Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
  // without this line, the new container comes with opacity=1
  container.style.opacity = '0'
  if (currentStatus.namespace === 'home') {
    artistsList = document.querySelector('.artists')
    pauseButton = document.querySelector('.pause-button')
    videosList = document.querySelector('.video-container')
    attachListEvents()
  }
})

attachListEvents()
