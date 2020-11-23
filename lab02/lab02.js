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

    for (let x = 0; x < canvasImage.height; x++) {
        for (let y = 0; y < canvasImage.width; y++) {
            let baseIndex = 4 * (x * canvasImage.width + y)

            const R = imgData.data[baseIndex]
            const G = imgData.data[baseIndex + 1]
            const B = imgData.data[baseIndex + 2]
            const alpha = imgData.data[baseIndex + 3]

            // Среднее начение по каналам
            const avg = (R + G + B) / 3

            imgDataEdit.data[baseIndex] = avg
            imgDataEdit.data[baseIndex + 1] = avg
            imgDataEdit.data[baseIndex + 2] = avg
            imgDataEdit.data[baseIndex + 3] = alpha // Альфа-канал не трогаем
        }
    }

    contextEdit.putImageData(imgDataEdit, 0, 0)
}

btnLoad.addEventListener('click', displayImage)
btnCopy.addEventListener('click', copyAndProcess)
