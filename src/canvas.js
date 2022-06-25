const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 700
canvas.width = 700

c.fillStyle = '#ddd'
c.fillRect(0, 0, canvas.width, canvas.height)

export {
    canvas,
    c,
}