const add = (num1, num2) => parseInt(num1) + parseInt(num2);
const subtract = (num1, num2) => parseInt(num1) - parseInt(num2);
const multiply = (num1, num2) => parseInt(num1) * parseInt(num2);
const divide = (num1, num2) => parseInt(num1) / parseInt(num2);

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

const numberButtons = Array.from(document.querySelectorAll("#number"));
const operatorButtons = Array.from(document.querySelectorAll("#operator"));
const btnClear = document.querySelector("#btnClear");
const btnEqual = document.querySelector("#equal");
let buttonsPressed = "";
// let buttonPressed2 = `${num1} `
const obj = {};

numberButtons.map((button) =>
  button.addEventListener("click", storeNumberSelection)
);
operatorButtons.map((button) =>
  button.addEventListener("click", storeOperatorSelection)
);

btnEqual.addEventListener("click", calculate);

let previousOperatorValue;
function calculate() {
  if (obj["operator"] === "+") {
    console.log(operate("+", obj["num1"], obj["num2"]));
    previousOperatorValue = operate("+", obj["num1"], obj["num2"]);
    const analyze = operate("+", obj["num1"], obj["num2"]);
    delete obj["num1"];
    delete obj["operator"];
    delete obj["num2"];
    return analyze;
  }
}

function storeNumberSelection(e) {
  let numberClicked = e.target.textContent;
  if (!obj["num1"]) obj["num1"] = numberClicked;
  else if (!obj["operator"]) obj["num1"] += numberClicked;
  else if (!obj["num2"]) obj["num2"] = numberClicked;
  else if (obj["num2"]) obj["num2"] += numberClicked;
  console.log(obj);

  buttonsPressed += `${e.target.textContent}`;
  document.querySelector("#display").textContent = buttonsPressed;
}

function storeOperatorSelection(e) {
  if (obj["operator"]) {
    calculate();
    document.querySelector("#display").textContent = previousOperatorValue;
  }
  if (!obj["operator"]) {
    obj["operator"] = e.target.textContent;
    console.log(obj);
    buttonsPressed += `${e.target.textContent}`;
    document.querySelector("#display").textContent = buttonsPressed;
  }
}

btnClear.addEventListener("click", function () {
  // buttonsPressed = "";
  document.querySelector("#display").textContent = buttonsPressed;
  console.log("clear");
});

/*
Algorithm:

Roadblocks:

How to store user input data
How to listen to user input data to detect certain combinations
If certain combinations detect, execute functions

The user will be restricted to inputs of numberBtn -> operatorBtn -> numberBtn -> equal button

Event listeners on ALL buttons to display the selections as a string
Event listeners on number buttons to:store two numbers
Event listeners on operator buttons to store which operation
Event listeener on equal button to execute the operation


V2:
functions:
- add, subtract, multiply, divide: parses int values and returns
- operate(operator, num1,num2)
- updateDisplay()

object:
{
  num1: num1
  operator: operator
  num2: num2
  displayString: `${object.num1} ${object.operator} ${object.num2}`
}

displayString updates when user presses a button.
- if a number button is pressed, the object updates and runs function updateDisplay()

When a number button is pressed:
- adds number to num1 or num2 in object
- updateDisplay()

When an operator button is pressed
if (obj[operator] && obj[num1] && obj[num2]) {
  - invokes operate(operator,num1,num2)
  - num1 = return value of invoke
  - operator = operator button pressed
  - displayString = num1 + operator
  - displayString not required for this project!

}
if (!obj['operator'])
- sends operator to obj['operator']




When equal is pressed
- invokes operate(operator,num1,num2)
- deletes operator, num2 from object
- displayString is the return value of operate(operator,num1,num2)
- sets obj.num1 = return value of operate(operator,num1,num2)

When clear is pressed:
- 


*/
