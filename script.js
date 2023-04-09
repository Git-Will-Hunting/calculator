// gather UI elements
const buttons = document.querySelectorAll('.calcButton');

// set global variables for math functions
let displayValue = 0;
let firstNumber= null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let lastButton = null;


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
        console.error('divide function requires two numbers');
        return ;
    }
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return NaN;
    }
    if (num2 === 0) {
        console.error('cannot divide by zero');
        return;
    }
    return num1 / num2;
}

// operator function to run the calculator
function operate(num1, num2, operator){
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0){
                return 'nuh-uh';
            }
            return divide(num1, num2);
        case '^':
            return power(num1, num2);
        case '!':
            return factorial(num1);
    }
}

function inputNumber(number) {
    // check if there is an operator
    if (firstOperator === null) {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = number;
        } else if (displayValue === firstNumber) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    } else {
        if (displayValue === firstNumber) { 
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
}
function inputOperator(operator) {
    // check if the last button pressed was an operator
    // if it was, repeat the last operator and use the last number entered
    if (operator === lastButton) {
    }
    lastButton = operator;
    // check if there is an operator
    if (firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        displayValue = roundAccurately(result, 10).toString();
        firstNumber = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 10).toString();
        firstNumber = displayValue;
        result = null;
    } else {
        firstOperator = operator;
        firstNumber = displayValue;
    }
}

// handle equals button
function equals() {
    
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        if (result === 'nuh-uh') {
            displayValue = 'nuh-uh'
        } else {
            displayValue = roundAccurately(result, 10).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        if (result === 'nuh-uh') {
            displayValue = 'nuh-uh';
        } else {
            displayValue = roundAccurately(result, 10).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function allClear() {
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

// handle negative button
function negative() {
    if (displayValue === '0' || displayValue === 0) {
        displayValue = '-';
    } else if (displayValue === firstNumber) {
        displayValue = '-';
    } else if (displayValue.includes('-')) {
        displayValue = displayValue.replace('-', '');
    } else {
        displayValue = '-' + displayValue;
    }
}

// handle decimal button
function decimal() {
    if (displayValue === '0' || displayValue === 0) {
        displayValue = '0.';
    } else if (displayValue === firstNumber) {
        displayValue = '0.';
    } else if (displayValue.includes('.')) {
        displayValue = displayValue;
    } else {
        displayValue += '.';
    }
}

// handle percent button
function percent() {
    if (displayValue === '0' || displayValue === 0) {
        displayValue = '0';
    } else if (displayValue === firstNumber) {
        displayValue = '0';
    } else {
        displayValue = (Number(displayValue) / 100).toString();
    }
}

// update the display
function updateDisplay() {
    const calcDisplay = document.querySelector('.calcDisplay');
    calcDisplay.textContent = displayValue;
    if (displayValue.length > 10) {
        calcDisplay.textContent = displayValue.substring(0, 10)
    }
}

// rounding function
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

// initialize the calculator
updateDisplay();

// event listeners

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // if the button is a number, add it to the display
        if (button.classList.contains('number')) {
            inputNumber(button.textContent);
            updateDisplay();
        }
        // if the button is an operator, store the number and operator
        if (button.classList.contains('calcOp')) {
            inputOperator(button.name);
            updateDisplay();
        }
        // if the button is the equal sign, store the second number and run the operator function
        if (button.classList.contains('equals')) {
            equals();
            updateDisplay();
        }
        // if the button is the clear sign, clear the display
        if (button.classList.contains('clear')) {
            allClear();
            updateDisplay();
        }
        // if the button is the negative sign, add a negative sign to the display
        if (button.classList.contains('negative')) {
            negative();
            updateDisplay();
        }
        // if the button is the decimal sign, add a decimal to the display
        if (button.classList.contains('decimal')) {
            decimal();
            updateDisplay();
        }
        // if the button is the percent sign, divide the number by 100
        if (button.classList.contains('percent')) {
            percent();
            updateDisplay();
        }
    });
});

addEventListener('keydown', (e) => {
    // if the key is a number, add it to the display
    if (e.key >= 0 && e.key <= 9) {
        inputNumber(e.key);
        updateDisplay();
    }
    // if the key is x, change it to *
    if (e.key === 'x') {
        e.key = '*';
    }
    // if the key is an operator, store the number and operator
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        inputOperator(e.key);
        updateDisplay();
    }
    // if the key is the equal sign, store the second number and run the operator function
    if (e.key === 'Enter') {
        equals();
        updateDisplay();
    }
    // if the key is the clear sign, clear the display
    if (e.key === 'Backspace' || e.key === 'c' || e.key === 'Delete') {
        allClear();
        updateDisplay();
    }
    // if the key is the negative sign, add a negative sign to the display
    if (e.key === 'n') {
        negative();
        updateDisplay();
    }
    // if the key is the decimal sign, add a decimal to the display
    if (e.key === '.') {
        decimal();
        updateDisplay();
    }
    // if the key is the percent sign, divide the number by 100
    if (e.key === '%') {
        percent();
        updateDisplay();
    }
});