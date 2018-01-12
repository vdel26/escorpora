console.log("🦊 Hello! Edit me in src/js/app.js");

const mobileNav = document.querySelector('.navigation--mobile')
const menuIcon = mobileNav.querySelector('.menu-icon')
const menu = mobileNav.querySelector('.navigation--mobile .menu')
const brand = mobileNav.querySelector('.navigation--mobile .brand')

menuIcon.addEventListener('touchend', function () {
  if (mobileNav.classList.contains('is-menu-open')) {
    brand.classList.add('o-100')
    brand.classList.remove('o-0')
    menu.classList.add('o-0')
    menu.classList.remove('o-100')
  }
  else {
    brand.classList.add('o-0')
    brand.classList.remove('o-100')
    menu.classList.add('o-100')
    menu.classList.remove('o-0')
  }
  mobileNav.classList.toggle('is-menu-open')
})
