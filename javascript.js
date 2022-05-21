const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

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

const numberButtons = Array.from(document.querySelectorAll(".btn"));
const btnClear = document.querySelector("#btnClear");
let buttonsPressed = "";

numberButtons.map((button) =>
  button.addEventListener("click", function (e) {
    // buttonsPressed.push(e.target.textContent);
    // buttonsPressed.concat(e.target.textContent);
    buttonsPressed += `${e.target.textContent}`;
    document.querySelector("#display").textContent = buttonsPressed;
    // console.log(buttonsPressed);
  })
);

btnClear.addEventListener("click", function () {
  buttonsPressed = "";
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

*/
