'use strict'

import Ball from './modules/ball.js'
import Paddle from './modules/paddle.js'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const maxVel = 0.5

const ball = new Ball(
    canvas.width / 2,
    canvas.height / 2,
    random(-maxVel, maxVel),
    random(-maxVel, maxVel)
)
const paddle = new Paddle(15, canvas.height / 2, canvas)
const computerPaddle = new Paddle(canvas.width - 15 - 15, canvas.height / 2, canvas)

const points = {
    player: 0,
    computer: 0,
}

let gameTime = 0

let lastTime = null
function update(time) {
    if (lastTime !== null) {
        gameTime++
        const delta = time - lastTime
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ball.update(delta, canvas, ctx, [paddle, computerPaddle], point)
        ball.increaseSpeed(1)
        paddle.draw(ctx)
        computerPaddle.update(delta, ball.pos.y, ctx)

        ctx.font = '48px serif'
        ctx.fillStyle = '#0095DD'
        ctx.fillText(points.player, canvas.width / 2 - 100, 100)
        ctx.fillText(points.computer, canvas.width / 2 + 100, 100)
    }
    lastTime = time
    requestAnimationFrame(update)
}

function point(playerWon) {
    ball.reset()
    console.log(playerWon ? 'you won' : 'you lost')
    if (playerWon) points.player++
    else points.computer++
}

canvas.onmousemove = ({ clientY }) => {
    paddle.moveTo(clientY)
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

requestAnimationFrame(update)
