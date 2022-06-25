import Rectangle from './Rectangle.js'
import { canvas } from './canvas.js'
import { obstacles, colorGates } from './animation.js'
import { mixColors } from './helper.js'
import { targetColor } from './animation.js'
import { playerOneControls, playerTwoControls } from './animation.js'

export default class Sprite extends Rectangle {
    constructor(size, position, color, name) {
        super(size, position, color)

        this.velocity = {
            x: 0,
            y: 0,
        }
        this.name = name
    }
    
    update() {
        super.draw()
        
        this.preventMovementOutOfMap()
        obstacles.forEach(obstacle => {
            this.preventMovementAfterCollision(obstacle)
        })
        colorGates.forEach(colorGate => {
            // this.mixColorToGateColor(colorGate)
            this.changeColorToGateColor(colorGate)
        })
        
        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y
    }

    changeColorToGateColor(colorGate) {
        if (this.isColliding(colorGate, true)) {
            this.color = colorGate.color

            if (this.color === targetColor) {
                this.gameOver()
            }
        }
    }

    gameOver() {
        window.removeEventListener('keydown', playerOneControls)
        window.removeEventListener('keydown', playerTwoControls)
        document.querySelector('.menu-restart').style.display = 'block'
        document.querySelector('.winner').innerHTML = `${this.name} won the GAME!`
    }

    mixColorToGateColor(colorGate) {
        if (this.isColliding(colorGate, true)) {
            this.color = mixColors(this.color, colorGate.color)
        }
    }

    preventMovementOutOfMap() {
        const collisions = this.goingOutOfMapDirections()
        if (collisions.withMap()) {
            const directions = collisions.directions()
            
            switch (directions[0]) {
                case 'left':
                    if (collisions.left && this.velocity.x > 0) {
                        this.velocity.x = 0
                    }
                case 'right':
                    if (collisions.right && this.velocity.x < 0) {
                        this.velocity.x = 0
                    }
                case 'top':
                    if (collisions.top && this.velocity.y > 0) {
                        this.velocity.y = 0
                    }
                case 'bottom':
                    if (collisions.bottom && this.velocity.y < 0) {
                        this.velocity.y = 0
                    }
            
                default:
                    break;
            }
        }
    }

    goingOutOfMapDirections() {
        const collisions = {
            left: this.position.x <= 0,
            right: this.position.x + this.size.width >= canvas.width,
            top: this.position.y <= 0,
            bottom: this.position.y + this.size.height >= canvas.height,
            withMap() {
                return this.left || this.right || this.top || this.bottom
            },
            directions() {
                return Object.keys(collisions).filter((key, index) => {
                    if (index < 4) {
                        const obj = {}
                        return obj[key] = collisions[key]
                    }
                })
            }
        }

        return collisions
    }

    preventMovementAfterCollision(obstacle) {
        if (this.isColliding(obstacle, false)) {
            this.preventOverlap(obstacle)
        }
    }

    isColliding(obstacle, strict = false) {
        if (strict) {
            return this.position.x + this.size.width > obstacle.position.x &&
                obstacle.position.x + obstacle.size.width > this.position.x &&
                this.position.y + this.size.height > obstacle.position.y &&
                obstacle.position.y + obstacle.size.height > this.position.y
        }

        return this.position.x + this.size.width >= obstacle.position.x &&
            obstacle.position.x + obstacle.size.width >= this.position.x &&
            this.position.y + this.size.height >= obstacle.position.y &&
            obstacle.position.y + obstacle.size.height >= this.position.y
    }

    preventOverlap(obstacle) {
        const xDistance = obstacle.position.x - this.position.x
        const yDistance = obstacle.position.y - this.position.y

        if ((xDistance > 0 && this.velocity.x < 0) && (yDistance !== this.size.height && -yDistance !== obstacle.size.height)) {
            this.velocity.x = 0
        } else if ((xDistance < 0 && this.velocity.x > 0) && (yDistance !== this.size.height && -yDistance !== obstacle.size.height)) {
            this.velocity.x = 0
        }
        if ((yDistance > 0 && this.velocity.y < 0) && (xDistance !== this.size.width && -xDistance !== obstacle.size.width)) {
            this.velocity.y = 0
        } else if ((yDistance < 0 && this.velocity.y > 0) && (xDistance !== this.size.width && -xDistance !== obstacle.size.width)) {
            this.velocity.y = 0
        }
    }
}