// gather UI elements
const buttons = document.querySelectorAll('.calcButton');
const calcDisplay = document.querySelector('.calcDisplay');

// set global variables for math functions
let displayValue = 0;
let firstOperand= null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let lastOp = null;
let lastButtonEquals = false;
let lastNumber = null;
let midOperation = false;


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
    midOperation = true;
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
    // set last button equals to false
    lastButtonEquals = false;
    // check if mid operation
    if (midOperation === true) {
        displayValue = number;
        midOperation = false;
    } else {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
}
function inputOperator(operator) {
    // set last button equals to false
    lastButtonEquals = false;
    // check if mid operation
    if (midOperation === true) {
        firstOperator = operator;
    } else {
        // check if there is an operator
        if (firstOperator != null && secondOperator === null) {
            secondOperator = operator;
            secondOperand = displayValue;
            lastNumber = secondOperand;
            result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
            displayValue = roundAccurately(result,10).toString();
            firstOperand = displayValue;
            result = null;
            midOperation = true;
        } else if (firstOperator != null && secondOperator != null) {
            secondOperand = displayValue;
            lastNumber = secondOperand;
            result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
            secondOperator = operator;
            displayValue = roundAccurately(result,10).toString();
            firstOperand = displayValue;
            result = null;
            midOperation = true;
        } else {
            firstOperator = operator;
            firstOperand = displayValue;
            midOperation = true;
        }
    }
    lastOp = operator;
}

// handle equals button
function equals() {
    // if last button is an operator, repeat the operation
    if (lastButtonEquals) {
        firstOperand = operate(Number(firstOperand), Number(lastNumber), lastOp);
        displayValue = roundAccurately(firstOperand, 10).toString();
        secondOperand = null;

    }
    else if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        secondOperand = displayValue;
        lastNumber = secondOperand;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if (result === 'nuh-uh') {
            displayValue = 'nuh-uh'
        } else {
            displayValue = roundAccurately(result, 10).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        lastNumber = secondOperand;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if (result === 'nuh-uh') {
            displayValue = 'nuh-uh';
        } else {
            displayValue = roundAccurately(result, 10).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
    lastButtonEquals = true; 
}

function allClear() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
    midOperation = false;
    lastButtonEquals = false;
    lastNumber = null;
}

// handle negative button
function negative() {
    if (displayValue === '0' || displayValue === 0) {
        displayValue = '-';
    } else if (displayValue === firstOperand) {
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
    } else if (displayValue === firstOperand) {
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
    } else {
        displayValue = (Number(displayValue) / 100).toString();
    }
}

// update the display
function updateDisplay() {
    
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