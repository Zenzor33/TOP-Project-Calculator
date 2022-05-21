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

let numberButtons = Array.from(document.querySelectorAll("#number"));
const buttonsPressed = [];

numberButtons.map((button) =>
  button.addEventListener("click", function (e) {
    document.querySelector("#display").textContent = e.target.textContent;
    buttonsPressed.push(e.target.textContent);
    console.log(buttonsPressed);
  })
);
