import { animate } from './animation.js'

const startEl = document.querySelector('.menu-start')
startEl.addEventListener('click', function() {
    this.style.display = 'none'
    animate()
})

const restartEl = document.querySelector('.menu-restart .btn')
restartEl.addEventListener('click', function() {
    this.closest('.menu-restart').style.display = 'none'
    window.location.href = ''
    animate()
})

