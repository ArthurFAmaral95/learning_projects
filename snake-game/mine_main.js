const canvas = document.querySelector('.myCanvas')
const width = (canvas.width = 500)
const height = (canvas.height = 500)

const ctx = canvas.getContext('2d')

const scoreCounter = document.querySelector('header p')

// Painting the canvas white
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, width, height)

// Drawing a black square
ctx.strokeStyle = 'black'
ctx.lineWidth = 5
ctx.strokeRect(0, 0, width, height)

// Function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  return num
}