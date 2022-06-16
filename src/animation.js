import Factory from './Factory.js'
import Sprite from './Sprite.js'
import { canvas, c } from './canvas.js'

const factory = new Factory()
const obstacles = factory.obstacle(200)
const colorGates = factory.colorGate(60)
const movementSpeed = 5

const player = new Sprite(
    {
        width: 20,
        height: 20,
    },
    {
        x: 0,
        y: 0
    },
    '#FF0000'
)

const player2 = new Sprite(
    {
        width: 20,
        height: 20,
    },
    {
        x: canvas.width - 20,
        y: canvas.height - 20
    },
    '#0000FF'
)

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = '#ddd'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    player2.update()
    colorGates.forEach(colorGate => {
        colorGate.draw()
    })
    obstacles.forEach(obstacle => {
        obstacle.draw()
    })
}

window.addEventListener('keydown', (e) => {
    if (player.velocity.x !== 0 || player.velocity.y !== 0) {
        return;
    }

    switch (e.code) {
        case 'ArrowRight':
            player.velocity.x = -movementSpeed
            break;
        case 'ArrowLeft':
            player.velocity.x = movementSpeed
            break;
        case 'ArrowUp':
            player.velocity.y = movementSpeed
            break;
        case 'ArrowDown':
            player.velocity.y = -movementSpeed
            break;

        default:
            break;
    }
})

window.addEventListener('keydown', (e) => {
    if (player2.velocity.x !== 0 || player2.velocity.y !== 0) {
        return;
    }

    switch (e.code) {
        case 'KeyD':
            player2.velocity.x = 0
            break;
        case 'KeyA':
            player2.velocity.x = 0
            break;
        case 'KeyW':
            player2.velocity.y = 0
            break;
        case 'KeyS':
            player2.velocity.y = 0
            break;

        default:
            break;
    }
})

export {
    animate,
    obstacles,
    colorGates
}