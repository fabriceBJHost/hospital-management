/**
 * Compress an image file to base64
 * @param {File} file - The uploaded file (e.g. from input type="file")
 * @param {number} targetWidth - The desired width
 * @returns {Promise<string>} base64 string
 */
export const handleFileChange = (img_file, callback) => {
  const reader = new FileReader()
  reader.readAsDataURL(img_file)

  reader.onload = (ev) => {
    const url = ev.target.result
    // initialisation de nouvelle imageURL
    const image = document.createElement('img')
    image.src = url

    // create a new image
    image.onload = (event) => {
      let canvas = document.createElement('canvas')
      let ratio = 250 / event.target.width
      canvas.width = 250
      canvas.height = event.target.height * ratio
      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, canvas.width, canvas.height)

      // new url
      const new_URL = canvas.toDataURL('image/jpeg', 0.9)

      // call the callback with base64 result
      if (callback) {
        callback(new_URL)
      }
    }
  }
}

/**
 * Function to convert a sentence to uppercase
 * @param {string} sentence - The sentence to convert
 * @returns {string} - The converted sentence in uppercase
 */
export const makeUpercase = (sentence) => {
  return sentence.toUpperCase()
}

/**
 * Function to convert a sentence to capitalize
 * @param {string} sentence - The sentence to convert
 * @returns {string} - The converted sentence in capitalize
 */
export const makeCapitalize = (sentence) => {
  return sentence
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
