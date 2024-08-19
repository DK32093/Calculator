"use strict";

// Create buttons
const buttons = document.querySelector(".buttons");

let buttonText = ["7", "8", "9", "+", "-", 
              "4", "5", "6", "*", "/", 
              "1", "2", "3", ".", "=", 
              "0", "clear", " ", "back"]

let ind = 0;
for (let i = 1; i <= 4; i++) {
    let row = document.createElement("div");
    buttons.appendChild(row);
    row.setAttribute("class", "row");
    for (let c = 1; c <= 5; c++) {
        let newBut = document.createElement("button");
        newBut.textContent = buttonText[ind];
        ind = ind + 1;
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
    return a / b;
};

// Calculator operation variables
let firstNumber;
let operator = "";
let secondNumber;
let solution;
let count = 0;

// Operate function for when equals or second operator is clicked
function operate (num1, op, num2) {
    if (op === "+") {
        return add(num1, num2);
    } else if (op === "-") {
        return subtract(num1, num2);
    } else if (op === "*") {
        return multiply(num1, num2);
    } else {
        return divide(num1, num2);
    };
};

// Display function
let displayContent = document.querySelector(".displayContent");
function displayButtonText (e) {
    let buttonText = e.target.innerText;
    let displayText = document.createTextNode(buttonText);
    displayContent.appendChild(displayText);
};

// Add event listener to display value button clicks
let singleButton = document.querySelectorAll(".singleButton");
singleButton.forEach((but) => {
    but.addEventListener("click", (e) => {
        // clear the display once if the operator was clicked
        if (operator !== "") {
            do {displayContent.textContent = "";
                count += 1;
            } while (count < 1);
        };
        displayButtonText(e);
    });
});

// Add event listener for clear button click
let clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", () => displayContent.textContent = "");

// Add event listener for back button
let backButton = document.querySelector(".backButton");
backButton.addEventListener("click", () => { 
    displayContent.removeChild(displayContent.lastChild);
});

// Add event listener for first number (first operator)
let operators = document.querySelectorAll(".operator");
operators.forEach((oper) => {
    oper.addEventListener("click", (e) => {
        //add nested if statement for double press of operator?
        if (operator !== "") {
            count = 0;
            secondNumber = displayContent.innerText;
            solution = operate(Number(firstNumber), operator, Number(secondNumber));
            displayContent.textContent = solution;
            firstNumber = displayContent.innerText;
            operator = e.target.innerText;
        } else {
            operator = e.target.innerText;
            firstNumber = displayContent.innerText;
        }
    })
});

// Add equals event listener
let equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
    secondNumber = displayContent.innerText;
    solution = operate(Number(firstNumber), operator, Number(secondNumber));
    displayContent.textContent = solution;
    operator = "";
});