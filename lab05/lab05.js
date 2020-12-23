class Vector2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y
    }

    subtract(vec) {
        return new Vector2D(this.x - vec.x, this.y - vec.y)
    }
}

class Line {
    constructor(x0, y0, x1, y1) {
        this.first = new Vector2D(x0, y0)
        this.second = new Vector2D(x1, y1)
    }

    draw(ctx) {
        let dx = Math.abs(this.second.x - this.first.x)
        let dy = Math.abs(this.second.y - this.first.y)
        let dmax = Math.max(dx, dy)
        let dmin = Math.min(dx, dy)
        let xdir = this.second.x < this.first.x ? -1 : 1
        let ydir = this.second.y < this.first.y ? -1 : 1
        let eps = 0
        let s = 1
        let k = 2 * dmin

        if (dy <= dx) {
            let y = this.first.y
            for (let x = this.first.x; x * xdir <= this.second.x * xdir; x += xdir) {
                ctx.fillRect(x * s, y * s, s, s)
                eps += k
                if (eps > dmax) {
                    y += ydir
                    eps -= 2 * dmax
                }
            }
            return
        }

        let x = this.first.x
        for (let y = this.first.y; y * ydir <= this.second.y * ydir; y += ydir) {
            ctx.fillRect(x * s, y * s, s, s)
            eps += k
            if (eps > dmax) {
                x += xdir
                eps -= 2 * dmax
            }
        }
    }

    normal() {
        return new Vector2D(this.first.y - this.second.y, this.second.x - this.first.x)
    }

    vector() {
        return this.second.subtract(this.first)
    }
}

function cyrus_beck(line, polygon) {
    let normals = []
    for (let i = 0; i < polygon.length; ++i) {
        normals.push(polygon[i].normal())
    }
    let vec = line.vector()
    let vecs = []
    for (let i = 0; i < polygon.length; ++i) {
        vecs.push(polygon[i].first.subtract(line.first))
    }
    let t
    let tE = [0]
    let tL = [1]
    for (let i = 0; i < polygon.length; ++i) {
        t = normals[i].dot(vecs[i]) / normals[i].dot(vec)
        normals[i].dot(vec) < 0 ? tE.push(t) : tL.push(t)
    }

    tE = Math.max(...tE)
    tL = Math.min(...tL)

    return new Line(
        line.first.x + vec.x * tE,
        line.first.y + vec.y * tE,
        line.first.x + vec.x * tL,
        line.first.y + vec.y * tL
    )
}

const canvas = document.getElementById("canv")
const ctx = canvas.getContext("2d")

const states = {
    INIT: 0,
    FORM_PAINTING: 1,
    FORM_READY: 2,
    LINE_PAINTING: 3,
}

let fx, fy
let cx, cy
let lines = []
let state = states.INIT

canvas.addEventListener("click", e => {
    if (state === states.INIT) {
        state = states.FORM_PAINTING
        fx = e.offsetX
        fy = e.offsetY
        cx = fx
        cy = fy
        return
    }

    if (state === states.FORM_PAINTING) {
        const line = new Line(cx, cy, e.offsetX, e.offsetY)
        line.draw(ctx)
        lines.push(line)
        cx = e.offsetX
        cy = e.offsetY
        return
    }

    if (state === states.FORM_READY) {
        state = states.LINE_PAINTING
        cx = e.offsetX
        cy = e.offsetY
        return
    }

    if (state === states.LINE_PAINTING) {
        state = states.INIT
        const lineBase = new Line(cx, cy, e.offsetX, e.offsetY)
        const line = cyrus_beck(lineBase, lines)
        ctx.fillStyle = "#001aff"
        line.draw(ctx)
        ctx.fillStyle = "#000000"
        lines = []
    }
})

canvas.addEventListener("keydown", e => {
    if (e.key !== " " || state !== states.FORM_PAINTING)
        return

    state = states.FORM_READY
    let line = new Line(cx, cy, fx, fy)
    line.draw(ctx)
    lines.push(line)
})
