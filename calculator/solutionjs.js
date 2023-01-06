const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) return
  const displayedNum = display.textContent
  const resultString = createResultString(
    e.target,
    displayedNum,
    calculator.dataset
  )

  display.textContent = resultString
  updateCalculatorState()
  /* const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove('is-depressed')
    )

    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ) {
        const calcValue = calculate(firstValue, operator, secondValue)
        display.textContent = calcValue

        // Update calculated value as first value
        calculator.dataset.firstValue = calcValue
      } else {
        // if there are no calculations, set displayedNum as firstValue
        calculator.dataset.firstValue = displayedNum
      }

      key.classList.add('is-depressed')
      // Add custom attribute
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action
    }

    if (action === 'decimal') {
      if (
        (!displayedNum.includes('.') && previousKeyType === 'operator') ||
        (!displayedNum.includes('.') && previousKeyType === 'calculate') ||
        (displayedNum.includes('.') && previousKeyType === 'operator') ||
        (displayedNum.includes('.') && previousKeyType === 'calculate')
      ) {
        display.textContent = '0.'
      } else if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      }

      calculator.dataset.previousKeyType = 'decimal'
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }

      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'
    }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      let secondValue = displayedNum

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum
          secondValue = calculator.dataset.modValue
        }
        display.textContent = calculate(firstValue, operator, secondValue)
      }

      calculator.dataset.modValue = secondValue
      calculator.dataset.previousKeyType = 'calculate'
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }*/
})

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}

const createResultString = (key, displayedNum, state) => {
  const keyType = getKeyType(key)

  const keyContent = key.textContent
  const { action } = key.dataset
  const { firstValue, modValue, operator, previousKeyType } = state

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate')
      return '0.'
    return displayedNum
  }

  if (keyType === 'operator') {
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator

    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum
  }

  if (keyType === 'clear') return 0

  if (keyType === 'calculate') {
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const modValue = calculator.dataset.modValue

    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
}

const getKeyType = key => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  )
    return 'operator'
  // For everything else, return the action
  return action
}
