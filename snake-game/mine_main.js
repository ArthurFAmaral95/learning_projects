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
  return num + (10 - (num % 10))
}

// Classes to create the squares
class Square {
  x
  y

  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class foodSquare extends Square {
  size
  color
  exists

  constructor(x, y) {
    super(x, y)
    this.size = 10
    this.color = 'red'
    this.exists = true
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

const food = new foodSquare(random(0, width - 10), random(0, height - 10))

food.draw()
