import Obstacle from './Obstacle.js'
import { canvas } from './canvas.js'
import { colors } from './colors.js'

export default class Factory {
    constructor() {

    }

    obstacle(count) {
        const result = []
    
        for (let index = 0; index < count; index++) {
            result.push(this.fakeObstacle())
        }
    
        return result
    }

    fakeObstacle() {
        const width = 20
        const height = 20
    
        return new Obstacle(
            {
                width,
                height,
            },
            {
                x: (this.randomBetween(0, canvas.width - width) % (canvas.width / width)) * width,
                y: (this.randomBetween(0, canvas.height - height) % (canvas.height / height)) * height
            },
            '#000000'
        )
    }

    colorGate(count) {
        const result = []
    
        for (let index = 0; index < count; index++) {
            result.push(this.fakeColorGate(colors[index % colors.length]))
        }
    
        return result
    }

    fakeColorGate(color) {
        const width = 20
        const height = 20
    
        return new Obstacle(
            {
                width,
                height,
            },
            {
                x: (this.randomBetween(0, canvas.width - width) % (canvas.width / width)) * width,
                y: (this.randomBetween(0, canvas.height - height) % (canvas.height / height)) * height
            },
            color
        )
    }

    randomBetween(a, b) {
        return Math.floor(Math.random() * (b - a) + a)
    }
}