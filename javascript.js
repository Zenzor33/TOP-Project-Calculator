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
  if (!obj["num1"]) obj["num1"] = e.target.textContent;
  else if (!obj["operator"]) obj["num1"] += e.target.textContent;
}

function updateOperator(e) {
  obj["operator"] = e.target.textContent;
}

function updateNum2(e) {
  if (!obj["num2"]) obj["num2"] = e.target.textContent;
  else obj["num2"] += e.target.textContent;
}

function calculateOperator(e) {
  const result = operate(obj["operator"], obj["num1"], obj["num2"]);
  obj["num1"] = result;
  obj["operator"] = e.target.textContent;
  delete obj["num2"];
}

function calculateEqual(e) {
  if (obj["num1"] && obj["operator"] && obj["num2"]) {
    const result = operate(obj["operator"], obj["num1"], obj["num2"]);
    obj["num1"] = result;
    delete obj["operator"];
    delete obj["num2"];
  }
}

function clearObject() {
  delete obj["num1"];
  delete obj["operator"];
  delete obj["num2"];
}

function updateDisplay() {
  const display = document.querySelector("#display");
  if (obj["num2"])
    display.textContent = `${obj["num1"]} ${obj["operator"]} ${obj["num2"]}`;
  else if (obj["operator"])
    display.textContent = `${obj["num1"]} ${obj["operator"]}`;
  else if (obj["num1"]) display.textContent = `${obj["num1"]}`;
  else display.textContent = "";
}

function calculate(e) {
  const number = e.target.id === "number";
  const operator = e.target.id === "operator";
  const equal = e.target.id === "equal";
  const clear = e.target.id === "btnClear";

  if ((number && !obj["num1"]) || (number && obj["num1"] && !obj["operator"]))
    updateNum1(e);

  if (operator && !obj["operator"] && obj["num1"]) updateOperator(e);

  if (operator && obj["num1"] && obj["operator"] && obj["num2"])
    calculateOperator(e);

  if (equal) calculateEqual(e);
  if (clear) clearObject();

  if (
    (number && obj["num1"] && obj["operator"]) ||
    (number && obj["num1"] && obj["operator"] && obj["num2"])
  )
    updateNum2(e);

  updateDisplay();
  console.log(obj);
}
