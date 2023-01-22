const canvas = document.querySelector('.myCanvas')
const width = (canvas.width = 500)
const height = (canvas.height = 500)

const level = document.querySelector('fieldset')

const ctx = canvas.getContext('2d')

const scoreCounter = document.querySelector('header p')
let score = 0

let velX = 10
let velY = 0
const squareSize = 10
let fps
let collision = false

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

  collisionDetect() {
    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x >= width ||
      this.y >= height ||
      (this != snake[0] && this.x === snake[0].x && this.y === snake[0].y)
    ) {
      collision = true
    }
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
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

  foodEat() {
    if (this.exists && this.x === snake[0].x && this.y === snake[0].y) {
      this.exists = false
      let food = new foodSquare(
        random(0, width - squareSize),
        random(0, height - squareSize)
      )

      snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == food.x && part.y == food.y

        if (foodIsOnSnake) {
          food = new foodSquare(
            random(0, width - squareSize),
            random(0, height - squareSize)
          )
        }
      })

      food.draw()
      foods.push(food)

      score++
      scoreCounter.textContent = score

      const snakeBody = new snakeSquare(
        snake[snake.length - 1].x - snake[snake.length - 1].velX,
        snake[snake.length - 1].y - snake[snake.length - 1].velY
      )
      snake.push(snakeBody)
    }
  }
}

class snakeSquare extends Square {
  size
  color

  constructor(x, y) {
    super(x, y)
    this.size = squareSize
    this.color = 'green'
  }
}

let foods = [
  new foodSquare(random(0, width - squareSize), random(0, height - squareSize))
]

let snake = [new snakeSquare(250, 250)]

function movingSnake() {
  if (collision) {
    return
  }
  const newSnakeHead = new snakeSquare(snake[0].x + velX, snake[0].y + velY)
  snake.unshift(newSnakeHead)
  snake.pop()
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && velY != squareSize) {
    velY = -squareSize
    velX = 0
  } else if (e.key === 'ArrowDown' && velY != -squareSize) {
    velY = squareSize
    velX = 0
  } else if (e.key === 'ArrowLeft' && velX != squareSize) {
    velY = 0
    velX = -squareSize
  } else if (e.key === 'ArrowRight' && velX != -squareSize) {
    velY = 0
    velX = squareSize
  }
})

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
      food.foodEat()
    }
  }

  for (const part of snake) {
    part.draw()
    part.collisionDetect()
  }
  movingSnake()

  setTimeout(() => {
    requestAnimationFrame(loop)
  }, 1000 / fps)
}


level.addEventListener('click', (e) => {
  if (e.target.id === 'easy'){
    fps = 5
  } else if (e.target.id === 'medium') {
    fps = 10
  } else if (e.target.id === 'hard'){
    fps = 20
  }
  
  level.classList.add('hidden')
  document.querySelector('header').classList.remove('hidden')
  document.querySelector('main').classList.remove('hidden')

  loop()

})