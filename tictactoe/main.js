const grid = document.querySelector('.grid')
const tiles = document.querySelectorAll('.tile')
const resetBtn = document.querySelector('button')

let xTurn = true
let win = false
let plays = 0

function handleClick(e) {
  if (
    e.target.classList.contains('cross') ||
    e.target.classList.contains('round')
  ) {
    return
  } else if (xTurn) {
    e.target.style.backgroundImage = 'url("./cross.png")'
    e.target.classList.add('cross')
  } else {
    e.target.style.backgroundImage = 'url("./round.png")'
    e.target.classList.add('round')
  }

  const game = []
  tiles.forEach(tile => {
    const choice = {
      shape: tile.classList.value
    }

    game.push(choice)
  })

  xTurn = !xTurn
  gameWin(game)
  gameOver(game)
}

function resetGame() {
  xTurn = true
  win = false
  plays = 0

  tiles.forEach(tile => {
    tile.classList.remove('round')
    tile.classList.remove('cross')
    tile.style.backgroundImage = ''
  })
}

function gameWin(array) {
  if (
    array[0].shape !== 'tile' &&
    array[0].shape === array[1].shape &&
    array[0].shape === array[2].shape
  ) {
    console.log('win')
    win = true
  } else if (
    array[0].shape !== 'tile' &&
    array[0].shape === array[3].shape &&
    array[0].shape === array[6].shape
  ) {
    console.log('win')
    win = true
  } else if (
    array[0].shape !== 'tile' &&
    array[0].shape === array[4].shape &&
    array[0].shape === array[8].shape
  ) {
    console.log('win')
    win = true
  } else if (
    array[3].shape !== 'tile' &&
    array[3].shape === array[4].shape &&
    array[3].shape === array[5].shape
  ) {
    console.log('win')
    win = true
  } else if (
    array[6].shape !== 'tile' &&
    array[6].shape === array[7].shape &&
    array[6].shape === array[8].shape
  ) {
    console.log('win')
    win = true
  } else if (
    array[1].shape !== 'tile' &&
    array[1].shape === array[4].shape &&
    array[1].shape === array[7].shape
  ) {
    console.log('win')
    win = true
  } else if (
    array[2].shape !== 'tile' &&
    array[2].shape === array[5].shape &&
    array[2].shape === array[8].shape
  ) {
    console.log('win')
    win = true
  } else if (
    array[2].shape !== 'tile' &&
    array[2].shape === array[4].shape &&
    array[2].shape === array[6].shape
  ) {
    console.log('win')
    win = true
  }
}

function gameOver(array) {
  array.map(item => {
    if (item.shape === 'tile cross' || item.shape === 'tile round') {
      plays += 1
    }
  })

  if (plays === 45 && !win) {
    console.log('lose')
  }
}

grid.addEventListener('click', handleClick)
resetBtn.addEventListener('click', resetGame)
