import Obstacle from './Obstacle.js'
import { canvas } from './canvas.js'

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
        const colors = [
            '#0000FF',
            '#00FF00',
            '#00FFFF',
            '#C0C0C0',
            '#808080',
            '#FFFFFF',
            '#800000',
            '#FF0000',
            '#800080',
            '#FF00FF',
            '#008000',
            '#808000',
            '#FFFF00',
            '#000080',
            '#008080',
        ]
    
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