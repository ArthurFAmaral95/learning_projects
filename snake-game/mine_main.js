const canvas = document.querySelector('.myCanvas')
const width = (canvas.width = 500)
const height = (canvas.height = 500)

const ctx = canvas.getContext('2d')

const scoreCounter = document.querySelector('header p')
let score = 0

const squareSize = 10
const fps = 10

// Function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  if (num % squareSize === 0) {
    return num
  } else {
    return num + (squareSize - (num % squareSize))
  }
}

// Classes to create the squares
class Square {
  x
  y

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  updatePosition() {
    if (this.x < 0) {
      this.x = 0
      this.velX = 0
      this.velY = 0
    } else if (this.y < 0) {
      this.y = 0
      this.velX = 0
      this.velY = 0
    } else if (this.x >= width) {
      this.x = width - this.size
      this.velX = 0
      this.velY = 0
    } else if (this.y >= height) {
      this.y = height - this.size
      this.velX = 0
      this.velY = 0
    }

    this.x += this.velX
    this.y += this.velY
  }
}

class foodSquare extends Square {
  size
  color
  exists

  constructor(x, y) {
    super(x, y)
    this.size = squareSize
    this.color = 'red'
    this.exists = true
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  collisionDetect() {
    if (this.exists && this.x === snakeHead.x && this.y === snakeHead.y) {
      this.exists = false
      const food = new foodSquare(
        random(0, width - squareSize),
        random(0, height - squareSize)
      )
      food.draw()
      foods.push(food)

      score++
      scoreCounter.textContent = score

      const snakeBody = new snakeBodySquare()
      snake.push(snakeBody)
    }
  }
}

class snakeHeadSquare extends Square {
  size
  color
  velX
  velY

  constructor(x, y) {
    super(x, y)
    this.size = squareSize
    this.color = 'green'
    this.velX = 10
    this.velY = 0

    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowUp':
          this.velY = -squareSize
          this.velX = 0
          break
        case 'ArrowDown':
          this.velY = squareSize
          this.velX = 0
          break
        case 'ArrowLeft':
          this.velY = 0
          this.velX = -squareSize
          break
        case 'ArrowRight':
          this.velY = 0
          this.velX = squareSize
          break
      }
    })
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  checkBounds() {
    if (this.x < 0 || this.y < 0 || this.x >= width || this.y >= height) {
      console.log('bateu')
    }
  }
}

class snakeBodySquare extends Square {
  size
  color
  velX
  velY

  constructor() {
    super(
      snake[snake.length - 1].x - snake[snake.length - 1].velX,
      snake[snake.length - 1].y - snake[snake.length - 1].velY
    )
    this.size = squareSize
    this.color = 'green'
    this.velX = snake[snake.length - 1].velX
    this.velY = snake[snake.length - 1].velY
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  updatePosition() {
    this.x += snake[snake.length - 1].velX
    this.y += snake[snake.length - 1].velY
  }
}

let foods = [
  new foodSquare(random(0, width - squareSize), random(0, height - squareSize))
]

let snake = []
const snakeHead = new snakeHeadSquare(250, 250)
snake.push(snakeHead)

function loop() {
  // Painting the canvas white
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)

  // Drawing a black square
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 5
  ctx.strokeRect(0, 0, width, height)

  for (const food of foods) {
    if (food.exists) {
      food.draw()
      food.collisionDetect()
    }
  }

  for (const part of snake) {
    part.draw()
    part.updatePosition()
  }
  snakeHead.checkBounds()

  setTimeout(() => {
    requestAnimationFrame(loop)
  }, 1000 / fps)
}

loop()

// fazer com que o corpo da cobra siga a cabeça