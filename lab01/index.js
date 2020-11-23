const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
context.fillStyle = '#ff6600'


const len = 50
const tMax = 500
const amplitude = 15
const phases = 0.1

let x = 0

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    const y = Math.sin(x * phases) * amplitude

    for (let i = 0; i < len; i++) {
        context.fillRect(x + i + 10, y + i + 25, 5, 1)
        context.fillRect(x - i + 10, y + i + 25, 5, 1)
        context.fillRect(x + i + 10, y + len - i + 25, 5, 1)
        context.fillRect(x - i + 10, y + len - i + 25, 5, 1)
    }

    if (x <= tMax - len) {
        x++
    } else {
        x = 0
    }
}

setInterval(update, 10)
