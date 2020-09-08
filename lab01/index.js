const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const len = 100
const tMax = 500
let t = 0

// TODO non-line figure move non-linear trajectory
function update() {
    context.fillStyle = '#FF6677'
    context.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < len; i++) {
        context.fillRect(10 + i + t, 10 + i, 10, 1)
    }

    if (t > tMax)
        t = 0
    else
        t++
}

setInterval(update, 1)

setTimeout(() => {
    t = 0
}, 1)