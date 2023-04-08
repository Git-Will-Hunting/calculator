// gather UI elements
const displayTop = document.querySelector('.calcDisplayTop');
const displayBottom = document.querySelector('.calcDisplayBottom');
const buttons = document.querySelectorAll('.calcButton');

// set global variables for math functions
let num = [0,0];

let result = 0;
let operator = '';

// math functions
function add(num1, num2){
    if (num1 === undefined || num2 === undefined) {
        return NaN;
    }
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return NaN;
    }
    return num1 + num2;
}

function subtract(num1, num2){
    if (num1 === undefined || num2 === undefined) {
        return NaN;
    }
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return NaN;
    }
    return num1 - num2;
}

function multiply(num1, num2){
    if (num1 === undefined || num2 === undefined) {
        return NaN;
    }
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return NaN;
    }
    return num1 * num2;
}

function factorial(num1){
    if (num1 === 0) {
        return 1;
    }
    if (num1 < 0) {
        return NaN;
    }
    if (typeof num1 !== 'number') {
        return NaN;
    }
    return num1 * factorial(num1 - 1);
}

function power(num1, num2){
    if (num1 === undefined || num2 === undefined) {
        return NaN;
    }
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return NaN;
    }
    return num1 ** num2;
}

function divide(num1, num2){
    if (num1 === undefined || num2 === undefined) {
        return NaN;
    }
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return NaN;
    }
    if (num2 === 0) {
        return NaN;
    }
    return num1 / num2;
}

// operator function to run the calculator
function operate(operator){

    const num1 = num[num.length -2]
    const num2 = num[num.length -1]
    if (operator === '+') {
        return add(num1, num2);
    }
    if (operator === '-') {
        return subtract(num1, num2);
    }
    if (operator === '*') {
        return multiply(num1, num2);
    }
    if (operator === '/') {
        return divide(num1, num2);
    }
    if (operator === '^') {
        return power(num1, num2);
    }
    if (operator === '!') {
        return factorial(num1);
    }
}

function updateNum() {
    num.push(parseFloat(displayBottom.textContent));
    num.reverse();
    num.pop();
    num.reverse();
    displayBottom.textContent = '';
}


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // if the button is a number, add it to the display
        if (button.classList.contains('number')) {
            if (displayBottom.textContent === '0') {
                displayBottom.textContent = '';
            }
            displayBottom.textContent += button.textContent;
        }
        // if the button is an operator, store the number and operator
        if (button.classList.contains('calcOp')) {
            updateNum();
            operator = button.name;
            result = operate(operator);
            displayTop.textContent = result;
        }
        // if the button is the equal sign, store the second number and run the operator function
        if (button.classList.contains('equals')) {
            updateNum();
            result = operate(operator);
            displayTop.textContent = result;
        }
        // if the button is the clear sign, clear the display
        if (button.classList.contains('clear')) {
            num = [0,0];
            displayBottom.textContent = '';
        }
        // if the button is the negative sign, add a negative sign to the display
        if (button.classList.contains('negative')) {
            displayBottom.textContent = '-' + displayBottom.textContent;
        }
        // if the button is the decimal sign, add a decimal to the display
        if (button.classList.contains('decimal')) {
            displayBottom.textContent += '.';
        }
        // if the button is the percent sign, divide the number by 100
        if (button.classList.contains('percent')) {
            displayTop.textContent = parseFloat(displayBottom.textContent) / 100;
        }
    });
});

addEventListener('keydown', (e) => {
    // if the key is a number, add it to the display
    if (e.key >= 0 && e.key <= 9) {
        if (displayBottom.textContent === '0') {
            displayBottom.textContent = '';
        }
        displayBottom.textContent += e.key;
    }
    // if the key is x, change it to *
    if (e.key === 'x') {
        e.key = '*';
    }
    // if the key is an operator, store the number and operator
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        updateNum();
        operator = e.key;
        result = operate(operator);
        displayTop.textContent = result;
    }
    // if the key is the equal sign, store the second number and run the operator function
    if (e.key === 'Enter') {
        updateNum();
        result = operate(operator);
        displayTop.textContent = result;
    }
    // if the key is the clear sign, clear the display
    if (e.key === 'Backspace' || e.key === 'c' || e.key === 'Delete') {
        num = [0,0];
        displayBottom.textContent = '';
    }
    // if the key is the negative sign, add a negative sign to the display
    if (e.key === 'n') {
        displayBottom.textContent = '-' + displayBottom.textContent;
    }
    // if the key is the decimal sign, add a decimal to the display
    if (e.key === '.') {
        displayBottom.textContent += '.';
    }
    // if the key is the percent sign, divide the number by 100
    if (e.key === '%') {
        displayTop.textContent = parseFloat(displayBottom.textContent) / 100;
    }
});