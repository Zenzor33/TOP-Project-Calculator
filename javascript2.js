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

const allButtons = Array.from(document.querySelectorAll(".btn"));
const btnClear = document.querySelector("#btnClear");
const btnEqual = document.querySelector("#equal");
const obj = {};

allButtons.map((button) => button.addEventListener("click", calculate));

function updateNum1(e) {
  if (!obj["num1"]) {
    obj["num1"] = e.target.textContent;
  } else if (!obj["operator"]) {
    obj["num1"] += e.target.textContent;
  }
}

function updateOperator(e) {
  obj["operator"] = e.target.textContent;
}

function updateNum2(e) {
  if (!obj["num2"]) obj["num2"] = e.target.textContent;
  else obj["num2"] += e.target.textContent;
}

function calculate(e) {
  let buttonText = e.target.textContent;
  let userClicksNumber = e.target.id === "number";
  let userClicksOperator = e.target.id === "operator";

  if (
    (userClicksNumber && !obj["num1"]) ||
    (userClicksNumber && obj["num1"] && !obj["operator"])
  )
    updateNum1(e);

  if (userClicksOperator && !obj["operator"]) updateOperator(e);

  if (
    (userClicksNumber && obj["num1"] && obj["operator"]) ||
    (userClicksNumber && obj["num1"] && obj["operator"] && obj["num2"])
  )
    updateNum2(e);

  console.log(obj);
}
