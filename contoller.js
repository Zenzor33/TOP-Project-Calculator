import { Calculator, OPERATIONS } from "./calculator.js";

const calculator = new Calculator();
const displayElement = document.getElementById("display");

document.querySelectorAll(".number").forEach(el => {
    el.addEventListener("click", digitPressed);
});

document.querySelectorAll(".operator").forEach(el => {
    el.addEventListener("click", operatorPressed);
});

document.getElementById("equal").addEventListener("click", () => {
    calculator.equals();
    render();
});
document.getElementById("btnClear").addEventListener("click", () => {
    calculator.reset();
    render();
});

function digitPressed(evt) {
    calculator.pressDigit(parseInt(evt.target.dataset.num, 10));
    render();
}

function operatorPressed(evt) {
    switch (evt.target.dataset.operator) {
        case "add":
            calculator.pressOperation(OPERATIONS.ADDITION);
            break;
        case "subtract":
            calculator.pressOperation(OPERATIONS.SUBTRACTION);
            break;
        case "multiply":
            calculator.pressOperation(OPERATIONS.MULTIPLICATION);
            break;
        case "divide":
            calculator.pressOperation(OPERATIONS.DIVISION);
            break;
    }

    render();
}

function render() {
    displayElement.innerText = calculator.displayText;
}