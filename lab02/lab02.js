// TODO greyscale: average value of channels
// (R, G, B) -> [(R+G+B)/3] * 3

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const canvasImage = document.getElementById('canvasImage')
const contextImage = canvasImage.getContext('2d')
const canvasEdit = document.getElementById('canvasEdit')
const contextEdit = canvasEdit.getContext('2d')

const btnSave = document.getElementById('btnSave')
const btnLoad = document.getElementById('btnLoad')
const btnCopy = document.getElementById('btnCopy')

const len = 100;

function render() {
    context.fillStyle = '#FF6677'
    context.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < len; i++) {
        context.fillRect(10 + i, 10 + i, 10, 1)
    }
}

function displayImage() {
    let img = new Image()
    img.src = 'CleanArchitecture.jpg'
    img.onload = () => {
        contextImage.drawImage(img, 0, 0)
    }
}

function edit() {
    let imgData = contextImage.getImageData(0, 0, canvas.width, canvas.height)
    let imgDataEdit = contextEdit.createImageData(canvas.width, canvas.height)

    for (let x = 0; x < canvas.height; x++)
        for (let y = 0; y < canvas.width; y++)
            for (let k = 0; k < 4; k++) {
                const index = 4 * (x * canvas.width + y) + k

                if (k === 3) {
                    imgDataEdit.data[index] = imgData.data[index] * 0.5
                    continue
                }

                imgDataEdit.data[index] = imgData.data[index]
            }

    contextEdit.putImageData(imgDataEdit, 0, 0)
}

render()

btnSave.addEventListener('click', e => {
    btnSave.href = canvas.toDataURL('image/png')
    btnSave.download = 'test.png'
})

btnLoad.addEventListener('click', e => {
    displayImage()
})

btnCopy.addEventListener('click', e => {
    edit()
})
