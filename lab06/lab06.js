let canvas1 = document.getElementById('canv1')
let canvas2 = document.getElementById('canv2')
let context1 = canvas1.getContext('2d')
let context2 = canvas2.getContext('2d')

function drawLine(ctx, x0, y0, x1, y1) {
    const dy = Math.abs(y1 - y0)
    const dx = Math.abs(x1 - x0)
    const dmax = Math.max(dx, dy)
    const dmin = Math.min(dx, dy)

    let xdir = x1 < x0 ? -1 : 1
    let ydir = y1 < y0 ? -1 : 1

    let eps = 0
    const s = 1
    const k = 2 * dmin

    if (dy <= dx) {
        let y = y0
        for (let x = x0; x * xdir <= x1 * xdir; x += xdir) {
            ctx.fillRect(x * s, y * s, s, s)
            eps = eps + k
            if (eps > dmax) {
                y += ydir
                eps = eps - 2 * dmax
            }
        }
        return
    }

    let x = x0
    for (let y = y0; y * ydir <= y1 * ydir; y += ydir) {
        ctx.fillRect(x * s, y * s, s, s)
        eps = eps + k
        if (eps > dmax) {
            x += xdir
            eps = eps - 2 * dmax
        }
    }
}

let image = new Image()
image.src = 'test.png'

let points = []

image.onload = function () {
    context1.drawImage(image, 0, 0)
    let imageData = context1.getImageData(0, 0, canvas1.width, canvas1.height)
    let newImageData = context2.createImageData(canvas1.width, canvas1.height)

    for (let i = 0; i < canvas1.height; ++i) {
        for (let j = 0; j < canvas1.width; ++j) {
            if (imageData.data[4 * (i * canvas1.height + j)] < 50 &&
                imageData.data[4 * (i * canvas1.height + j) + 1] < 50 &&
                imageData.data[4 * (i * canvas1.height + j) + 2] < 50 &&
                imageData.data[4 * (i * canvas1.height + j) + 3] >= 10) {
                for (let k = 0; k < 3; ++k) {
                    newImageData.data[4 * (i * canvas1.height + j) + k] = 255
                }
                points.push({x: j, y: i})
            } else {
                for (let k = 0; k < 3; ++k) {
                    newImageData.data[4 * (i * canvas1.height + j) + k] = 0
                }
            }
            newImageData.data[4 * (i * canvas1.height + j) + 3] = 255
        }
    }

    context2.putImageData(newImageData, 0, 0)

    const part = 48
    const threshold = 600
    let k_array = []
    let param_2d = []

    for (let i = 0; i < part; ++i) {
        k_array.push(Math.tan((i + 0.01) * Math.PI / part))
        param_2d.push([])
    }

    for (let i = 0; i < points.length; ++i) {
        for (let j = 0; j < part; ++j) {
            param_2d[j].push(points[i].y - points[i].x * k_array[j])
        }
    }

    const d = 2
    for (let i = 0; i < part; ++i) {
        param_2d[i].sort()
        let j = 1
        while (j < param_2d[i].length) {
            let count = 0
            const base = param_2d[i][j]

            while (param_2d[i][j] < base + d && j < param_2d[i].length) {
                ++count
                ++j
            }

            context2.fillStyle = "#00FF00"
            if (count > threshold) {
                let l = x => k_array[i] * x + base
                drawLine(context2, 0, l(0), canvas2.width, l(canvas2.width))
            }
        }
    }
}
