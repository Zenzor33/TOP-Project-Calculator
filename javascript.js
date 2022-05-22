const allButtons = Array.from(document.querySelectorAll(".btn"));
const obj = {};

allButtons.map((button) => button.addEventListener("click", calculate));
// parseFloat(Number(num1) * Number(num2)).toFixed(2);
const add = (num1, num2) => parseFloat(Number(num1) + Number(num2)).toFixed(5);
const subtract = (num1, num2) =>
  parseFloat(Number(num1) - Number(num2)).toFixed(5);
const multiply = (num1, num2) =>
  parseFloat(Number(num1) * Number(num2)).toFixed(5);
const divide = (num1, num2) =>
  parseFloat(Number(num1) / Number(num2)).toFixed(5);

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

function appendDecimal(e) {
  // if num1 has no dot, append to num1
  if (!obj["num1"]) obj["num1"] = "0.";
  // if only num1 exists and a decimal does not exist
  if (
    obj["num1"] &&
    !obj["operator"] &&
    !obj["num2"] &&
    obj["num1"].indexOf(".") === -1
  )
    obj["num1"] += e.target.textContent;
  // if num2 and operator is submitted
  if (obj["num1"] && obj["operator"] && !obj["num2"]) obj["num2"] = "0.";
  // if num1 and num2 exist, and a decimal in num2 does not exist
  if (obj["num1"] && obj["num2"] && obj["num2"].indexOf(".") === -1)
    obj["num2"] += e.target.textContent;
}

function giveSnarkyMessage(e) {
  display.textContent = "One does not simply divide by zero";
  clearObject();
}

function calculate(e) {
  const number = e.target.id === "number";
  const operator = e.target.id === "operator";
  const equal = e.target.id === "equal";
  const clear = e.target.id === "btnClear";
  const dot = e.target.id === "dot";

  // Handle when user divides by zero
  if (obj["operator"] === "/" && obj["num2"] === "0") {
    giveSnarkyMessage();
    return;
  }

  if ((number && !obj["num1"]) || (number && obj["num1"] && !obj["operator"]))
    updateNum1(e);

  if (operator && !obj["operator"] && obj["num1"]) updateOperator(e);

  if (operator && obj["num1"] && obj["operator"] && obj["num2"])
    calculateOperator(e);

  if (equal) calculateEqual(e);
  if (clear) clearObject();
  if (dot) appendDecimal(e);

  if (
    (number && obj["num1"] && obj["operator"]) ||
    (number && obj["num1"] && obj["operator"] && obj["num2"])
  )
    updateNum2(e);

  updateDisplay();
  console.log(obj);
}

// You should round answers with long decimals so that they don’t overflow the screen.

function test(num1, num2) {
  // return Math.round(Number(num1) * Number(num2));
  return parseFloat(Number(num1) * Number(num2)).toFixed(2);
}

console.log(test("4.65548", "3.5658"));
