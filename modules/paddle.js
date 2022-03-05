const SPEED = 0.009

export default class Paddle {
    pos = {
        x: 0,
        y: 0,
    }
    width = 15
    height = 100

    canvas

    constructor(x, y, canvas) {
        this.pos.x = x
        this.pos.y = y
        this.canvas = canvas
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.pos.x, this.pos.y, this.width, this.height)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath()
    }

    update(delta, y, ctx) {
        this.pos.y += SPEED * delta * (y - this.pos.y - this.height / 2)
        this.pos.y = clamp(this.pos.y, 0, this.canvas.height - this.height)
        this.draw(ctx)
    }

    moveTo(y) {
        y = y - this.height / 2
        this.pos.y = clamp(y, 0, this.canvas.height - this.height)
        // this.pos.y = Math.min(y, this.canvas.height - this.height)
    }
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}
