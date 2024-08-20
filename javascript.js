"use strict";

// Create buttons
const buttons = document.querySelector(".buttons");

let buttonText = ["7", "8", "9", "+", "-", 
              "4", "5", "6", "*", "/", 
              "1", "2", "3", ".", "=", 
              "0", "CLEAR", " ", "BACK"]

let ind = 0;
for (let i = 1; i <= 4; i++) {
    let row = document.createElement("div");
    buttons.appendChild(row);
    row.setAttribute("class", "row");
    for (let c = 1; c <= 5; c++) {
        let newBut = document.createElement("button");
        newBut.textContent = buttonText[ind];
        ind += 1;
        row.appendChild(newBut);
        if (i === 4 && c === 4) {
            newBut.setAttribute("class", "backButton");
        } else if (i === 4 && c === 2) {
            newBut.setAttribute("class", "clearButton");
        } else {
            newBut.setAttribute("class", "singleButton");
        }
        // Remove 3rd and 5th buttons from last row for wider "back" and "clear" buttons
        if (i === 4 && c === 5) newBut.remove();
        if (i === 4 && c === 3) newBut.remove();
        // Add "operator" class to operator buttons
        if (["+", "-", "*", "/"].includes(newBut.innerText)) {
            newBut.setAttribute("class", "operator");
        };
        // Add "equals" class
        if (newBut.innerText === "=") newBut.setAttribute("class", "equals");
        if (i === 3 && c === 4) newBut.classList.add("period");
    }
};


// Basic math functions
function add (a, b) {
    return a + b;
};

function subtract (a, b) {
    return a - b;
};

function multiply (a, b) {
    return a * b;
};

function divide (a, b) {
    if (b === 0) return "No >:(";
    return a / b;
};

// Calculator operation variables
let firstNumber;
let operator = 1; // Set to 1 to clear the first "0" and after "=" in display
let secondNumber;
let solution;
let count = 0; // Used to clear display for a new entry after an operator

// Operate function for when equals or second operator is clicked
function operate (num1, op, num2) {
    if (op === "+") {
        return add(num1, num2);
    } else if (op === "-") {
        return subtract(num1, num2);
    } else if (op === "*") {
        return multiply(num1, num2);
    } else if (op === "/"){
        return divide(num1, num2);
    };
};

// Display button text function
let displayContent = document.querySelector(".displayContent");
function displayButtonText (e) {
    let displayText = document.createTextNode(e.target.innerText);
    if (e.target.innerText === "." && displayContent.textContent === "") {
        displayText = document.createTextNode("0.");
    };
    if (displayContent.innerText.length < 11) {
        displayContent.appendChild(displayText);
    }
};

// Add event listener to display value button clicks
const singleButton = document.querySelectorAll(".singleButton");
const period = document.querySelector(".period");
singleButton.forEach((but) => {
    but.addEventListener("click", (e) => {
        // clear the display once if the operator or equals was clicked (or on the first press)
        if (operator !== "" || operator === 1) {
            if (count < 1) {
                displayContent.textContent = "";
                period.disabled = false;
                backButton.disabled = false;
                count += 1;
            }
        }
        displayButtonText(e);
        if (displayContent.textContent.includes(".")) period.disabled = true;
    });
});

// Display key text function
function displayKeyText (e) {
    let displayText = document.createTextNode(e.key);
    if (e.key === "." && displayContent.textContent === "") {
        displayText = document.createTextNode("0.");
    };
    if (displayContent.innerText.length < 11 && buttonText.includes(e.key)) {
        if (!["+", "-", "*", "/", "="].includes(e.key)) {
            displayContent.appendChild(displayText)
        }
    }
};

// Add event listener for keyboard value presses
let numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (operator !== "" || operator === 1) {
        if (numKeys.includes(e.key)) {
            if (count < 1) {
                displayContent.textContent = "";
                period.disabled = false;
                backButton.disabled = false;
                count += 1;
            }
        }
    }
    if(["+", "-", "*", "/"].includes(e.key)) {
        backButton.disabled = true;
        if (operator !== "" && operator !== 1) {
            count = 0;
            secondNumber = displayContent.innerText;
            solution = operate(Number(firstNumber), operator, Number(secondNumber));
            if (solution.toString().length > 11) {
                solution = solution.toPrecision(3);
            };
            displayContent.textContent = solution;
            firstNumber = displayContent.innerText;
            operator = e.key;
        } else {
            count = 0;
            operator = e.key;
            firstNumber = displayContent.innerText;
        }
    }
    if (e.key === "=" || e.key === "Enter") {
        if (operator !== "" && operator !== 1) {
            secondNumber = displayContent.innerText;
            solution = operate(Number(firstNumber), operator, Number(secondNumber));
            if (solution.toString().length > 11) {
                solution = solution.toPrecision(3);
            };
            displayContent.textContent = solution;
            operator = 1;
            count = 0;
        };
    }
    if (e.key === "Backspace") {
        if (solution === undefined || displayContent.innerText !== solution.toString()) { 
            if (displayContent.innerText.length > 0) {
                displayContent.removeChild(displayContent.lastChild);
            }
        }
    }
    displayKeyText(e);
    if (displayContent.textContent.includes(".")) period.disabled = true;
});


// Add event listener for clear button click
let clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", () => {
    displayContent.textContent = "0";
    operator = 1;
    period.disabled = false
    count = 0; 
});

// Add event listener for back button
let backButton = document.querySelector(".backButton");
backButton.addEventListener("click", () => {
    if (solution === undefined || displayContent.innerText !== solution.toString()) { 
        if (displayContent.innerText.length > 0) {
            displayContent.removeChild(displayContent.lastChild);
        }
    }
});

// Add event listener for operators
let operators = document.querySelectorAll(".operator");
operators.forEach((oper) => {
    oper.addEventListener("click", (e) => {
        backButton.disabled = true;
        if (operator !== "" && operator !== 1) {
            count = 0;
            secondNumber = displayContent.innerText;
            solution = operate(Number(firstNumber), operator, Number(secondNumber));
            if (solution.toString().length > 11) {
                solution = solution.toPrecision(3);
            };
            displayContent.textContent = solution;
            firstNumber = displayContent.innerText;
            operator = e.target.innerText;
        } else {
            count = 0;
            operator = e.target.innerText;
            firstNumber = displayContent.innerText;
        }
    })
});

// Add equals event listener
let equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
    if (operator !== "" && operator !== 1) {
        secondNumber = displayContent.innerText;
        solution = operate(Number(firstNumber), operator, Number(secondNumber));
        if (solution.toString().length > 11) {
            solution = solution.toPrecision(3);
        };
        displayContent.textContent = solution;
        operator = 1;
        count = 0;
    };
});