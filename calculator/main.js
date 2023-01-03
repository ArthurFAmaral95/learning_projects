//Constants-Variables

const keys = document.querySelector('#keys');
const display = document.querySelector('#display p');
let pressedKeys = [];
let numbers = [];
let operator = [];

//Function to display typed operation

function calculator() {
  keys.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    pressedKeys += e.target.textContent;
    display.textContent = pressedKeys;

    if (e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "x" || e.target.textContent === "/"){
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      operator.push(e.target.textContent);
      pressedKeys = [];
      display.textContent = pressedKeys;
      console.log(numbers);
      console.log(operator);
    }

    if (e.target.textContent === "=" && operator == "+") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      const result = Number(numbers[0]) + Number(numbers[1]);
      display.textContent = result;
    } else if (e.target.textContent === "=" && operator == "-") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      const result = Number(numbers[0]) - Number(numbers[1]);
      display.textContent = result;
    } else if (e.target.textContent === "=" && operator == "x") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      const result = Number(numbers[0]) * Number(numbers[1]);
      display.textContent = result;
    } else if (e.target.textContent === "=" && operator == "/") {
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1));
      const result = Number(numbers[0]) / Number(numbers[1]);
      display.textContent = result;
    } 
  })  
}

//Function clear the display

function clear() {
  keys.addEventListener('click', (e) => {
    if (e.target.textContent == "AC"){
      pressedKeys = [];
      display.textContent = pressedKeys;
      numbers = [];
      operator = [];
    }
  })
}

calculator();
clear();

