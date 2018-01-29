console.log("🦊 Hello! Edit me in src/js/app.js")

// feature detection: scrollbar hiding
try {
  const scrollbarFeature = document.querySelector('::-webkit-scrollbar')
} catch (err) {
  console.log(err)
}

const mobileNav = document.querySelector('.navigation--mobile')
const menuIcon = mobileNav.querySelector('.menu-icon')
const menu = mobileNav.querySelector('.navigation--mobile .menu')
const brand = mobileNav.querySelector('.navigation--mobile .brand')

menuIcon.addEventListener('touchend', function () {
  console.log('menu toggle')
  mobileNav.classList.toggle('is-menu-open')
})
