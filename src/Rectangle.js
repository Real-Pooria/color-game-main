import { c } from './canvas.js'

export default class Rectangle {
    constructor(size, position, color) {
        this.size = size
        this.position = position
        this.color = color
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }
}