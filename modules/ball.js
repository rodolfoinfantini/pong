export default class Ball {
    pos = {
        x: 0,
        y: 0,
        initial: {
            x: 0,
            y: 0,
        },
    }

    vel = {
        x: 0,
        y: 0,
    }

    radius = 15

    constructor(x, y, velX, velY) {
        this.pos.x = x
        this.pos.y = y
        this.pos.initial.x = x
        this.pos.initial.y = y
        this.vel.x = velX
        this.vel.y = velY
    }

    reset() {
        const maxVel = 0.5
        this.pos.x = this.pos.initial.x
        this.pos.y = this.pos.initial.y
        this.vel.x = random(-maxVel, maxVel)
        this.vel.y = random(-maxVel, maxVel)
    }

    increaseSpeed(gameTime) {
        const decreaseValue = 0.001
        if (this.vel.x < 0) {
            this.vel.x -= gameTime * decreaseValue
            this.vel.y -= gameTime * decreaseValue
        } else {
            this.vel.x += gameTime * decreaseValue
            this.vel.y += gameTime * decreaseValue
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath()
    }

    update(deltaTime, canvas, ctx, paddles = [], onPoint) {
        paddles.forEach((paddle) => {
            if (
                this.pos.x + this.radius > paddle.pos.x &&
                this.pos.x - this.radius < paddle.pos.x + paddle.width + 5 &&
                this.pos.y + this.radius > paddle.pos.y &&
                this.pos.y - this.radius < paddle.pos.y + paddle.height
            ) {
                this.vel.x = -this.vel.x
            }
        })
        if (this.pos.y - this.radius < 0 || this.pos.y + this.radius > canvas.height) {
            this.vel.y = -this.vel.y
        }

        if (typeof onPoint === 'function') {
            if (this.pos.x - this.radius < 0) onPoint(false)
            else if (this.pos.x + this.radius > canvas.width) onPoint(true)
        }

        this.pos.x += this.vel.x * deltaTime
        this.pos.y += this.vel.y * deltaTime
        this.draw(ctx)
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
