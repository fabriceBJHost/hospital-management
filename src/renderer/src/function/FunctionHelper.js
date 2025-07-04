/**
 * Compress an image to approx. 240p height and return base64 string.
 * @param {File | Blob} imageFile - The image file to compress.
 * @param {number} targetHeight - Target height in pixels (e.g. 240).
 * @param {number} quality - Compression quality (0-1).
 * @returns {Promise<string>} - Resolves with base64 string of compressed image.
 */
export function compressImageToBase64(imageFile, targetHeight = 240, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = function () {
      const aspectRatio = img.width / img.height
      const targetWidth = targetHeight * aspectRatio

      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      // Adjust type if needed (e.g. 'image/jpeg' for better compression)
      const dataUrl = canvas.toDataURL('image/jpeg', quality)

      resolve(dataUrl)
    }

    img.onerror = reject

    const reader = new FileReader()
    reader.onload = function (e) {
      img.src = e.target.result
    }

    reader.onerror = reject
    reader.readAsDataURL(imageFile)
  })
}
