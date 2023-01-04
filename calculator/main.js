//Constants-Variables

const keys = document.querySelector('#keys');
const display = document.querySelector('#display p');
let pressedKeys = [];
let numbers = [];
let operator = [];
let result = 0;

//Calculator function

function calculator() {
  keys.addEventListener('click', (e) => {
    pressedKeys += e.target.textContent;
    display.textContent = pressedKeys;

    if (e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "x" || e.target.textContent === "/"){
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      operator.push(e.target.textContent);
      pressedKeys = [];
      display.textContent = pressedKeys;
    }

    if (e.target.textContent === "=" && operator[operator.length - 1] == "+" && numbers.length == 1) {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result += Number(numbers[0]) + Number(numbers[1]);
      display.textContent = result;
      pressedKeys = [];
    } else if (e.target.textContent === "=" && operator[operator.length - 1] == "+") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result += Number(numbers[numbers.length - 1]);
      display.textContent = result;
      pressedKeys = [];
    } else if (e.target.textContent === "=" && operator[operator.length - 1] == "-" && numbers.length == 1) {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result += (Number(numbers[0]) - Number(numbers[1]));
      display.textContent = result;
      pressedKeys = [];
    } else if (e.target.textContent === "=" && operator[operator.length - 1] == "-") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result -= Number(numbers[numbers.length - 1]);
      display.textContent = result;
      pressedKeys = [];
    } else if (e.target.textContent === "=" && operator[operator.length - 1] == "x" && numbers.length == 1) {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result += (Number(numbers[0]) * Number(numbers[1]));
      display.textContent = result.toFixed(2);
      pressedKeys = [];
    } else if (e.target.textContent === "=" && operator[operator.length - 1] == "x") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result *= Number(numbers[numbers.length - 1]);
      display.textContent = result.toFixed(2);
      pressedKeys = [];
    } else if (e.target.textContent === "=" && operator[operator.length - 1] == "/"&& numbers.length == 1) {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result += (Number(numbers[0]) / Number(numbers[1]));
      display.textContent = result.toFixed(2);
      pressedKeys = [];
    } else if (e.target.textContent === "=" && operator[operator.length - 1] == "/") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      result /= Number(numbers[numbers.length - 1]);
      display.textContent = result.toFixed(2);
      pressedKeys = [];
    }
  })  
}

//Function clear the display and past operations

function clear() {
  keys.addEventListener('click', (e) => {
    if (e.target.textContent == "AC"){
      pressedKeys = [];
      display.textContent = pressedKeys;
      numbers = [];
      operator = [];
      result = 0;
    }
  })
}

calculator();
clear();

