const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

const a = 20
const b = 40
const c = 10

let shift = [
    1, 0, 0, a,
    0, 1, 0, b,
    0, 0, 1, c,
    0, 0, 0, 1,
]

let sx = 2
let sy = 0.5
let sz = 3

let scale = [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sx, 0,
    0, 0, 0, 1,
]