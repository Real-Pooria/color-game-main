import Factory from './Factory.js'
import Sprite from './Sprite.js'
import { canvas, c } from './canvas.js'
import { colors } from './colors.js'

const factory = new Factory()
const obstacles = factory.obstacle(200)
const colorGates = factory.colorGate(60)
const targetColor = colors[factory.randomBetween(0, colors.length - 1)]
document.querySelector('.win-condition .box').style.backgroundColor = targetColor
const movementSpeed = 5

const player = new Sprite(
    {
        width: 20,
        height: 20,
    },
    {
        x: canvas.width - 20,
        y: canvas.height - 20
    },
    '#FFFFFF',
    'player1'
)

const player2 = new Sprite(
    {
        width: 20,
        height: 20,
    },
    {
        x: 0,
        y: 0
    },
    '#FFFFFF',
    'player2'
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

window.addEventListener('keydown', playerOneControls)
window.addEventListener('keydown', playerTwoControls)

function playerOneControls(e) {
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
}

function playerTwoControls(e) {
    if (player2.velocity.x !== 0 || player2.velocity.y !== 0) {
        return;
    }

    switch (e.code) {
        case 'KeyD':
            player2.velocity.x = -movementSpeed
            break;
        case 'KeyA':
            player2.velocity.x = movementSpeed
            break;
        case 'KeyW':
            player2.velocity.y = movementSpeed
            break;
        case 'KeyS':
            player2.velocity.y = -movementSpeed
            break;

        default:
            break;
    }
}

export {
    animate,
    playerOneControls,
    playerTwoControls,
    obstacles,
    colorGates,
    targetColor
}