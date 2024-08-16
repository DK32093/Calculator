
// Create buttons
const buttons = document.querySelector(".buttons");

buttonText = ["7", "8", "9", "+", "-", 
              "4", "5", "6", "*", "/", 
              "1", "2", "3", ".", "=", 
              "0", "clear", " ", "back"]

let ind = 0;
for (i = 1; i <= 4; i++) {
    let row = document.createElement("div");
    buttons.appendChild(row);
    row.setAttribute("class", "row");
    for (c = 1; c <= 5; c++) {
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
        if (i === 4 && c === 5) newBut.remove();
        if (i === 4 && c === 3) newBut.remove();
    }
};


// basic math functions
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
let operator;
let secondNumber;

// Operate function for when "=" is clicked
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
    displayText = document.createTextNode(buttonText);
    displayContent.appendChild(displayText);
};

// Add event listener for value button clicks
let singleButton = document.querySelectorAll(".singleButton");
singleButton.forEach(function(but) { 
    but.addEventListener("click", displayButtonText)
});

// Add event listener for clear button click
let clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", () => displayContent.textContent = "");

// Add event listener for back button
let backButton = document.querySelector(".backButton");
backButton.addEventListener("click", () => { 
    displayContent.removeChild(displayText);
    displayText = displayContent.lastChild;
});
