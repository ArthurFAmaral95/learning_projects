//Constants-Variables

const keys = document.querySelector('#keys');
const display = document.querySelector('#display p');
let pressedKeys = [];
let numbers = [];

//Function to display typed operation

function displayOperation() {
  keys.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    pressedKeys += e.target.textContent;
    display.textContent = pressedKeys;

    if (e.target.textContent == "+" || e.target.textContent == "-" || e.target.textContent == "x" || e.target.textContent == "/"){
      numbers.push(pressedKeys.slice(0, pressedKeys.length - 1))
      console.log(pressedKeys.slice(0, pressedKeys.length - 1));
      console.log(pressedKeys);
      console.log(numbers);

      //numbers.push()
    }
  })  
}

//Function clear the display

function clearDisplay() {
  keys.addEventListener('click', (e) => {
    if (e.target.textContent == "AC"){
      pressedKeys = [];
      display.textContent = pressedKeys;
    }
  })
}

//Function to covert string to operation





displayOperation();
clearDisplay();

