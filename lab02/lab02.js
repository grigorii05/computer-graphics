// TODO greyscale: average value of channels
// (R, G, B) -> [(R+G+B)/3] * 3

const canvasImage = document.getElementById('canvasOriginal')
const contextImage = canvasImage.getContext('2d')
const canvasEdit = document.getElementById('canvasProcessed')
const contextEdit = canvasEdit.getContext('2d')
const btnLoad = document.getElementById('btnLoad')
const btnCopy = document.getElementById('btnCopy')


function displayImage() {
    let img = new Image()
    img.src = 'CleanArchitecture.jpg'
    img.onload = () => contextImage.drawImage(img, 0, 0)
}

function copyAndProcess() {
    let imgData = contextImage.getImageData(0, 0, canvasImage.width, canvasImage.height)
    let imgDataEdit = contextEdit.createImageData(canvasEdit.width, canvasEdit.height)

    console.log("copyAndProcess")

    for (let x = 0; x < canvasImage.height; x++)
        for (let y = 0; y < canvasImage.width; y++)
            for (let k = 0; k < 4; k++) {
                const index = 4 * (x * canvasImage.width + y) + k

                if (k === 3) {
                    imgDataEdit.data[index] = imgData.data[index] * 0.5
                    continue
                }

                imgDataEdit.data[index] = imgData.data[index]
            }

    contextEdit.putImageData(imgDataEdit, 0, 0)
}

btnLoad.addEventListener('click', displayImage)
btnCopy.addEventListener('click', copyAndProcess)
