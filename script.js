// set global variables for math functions
let num1 = 0;
let num2 = 0;
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
function operate(operator, num1, num2){
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