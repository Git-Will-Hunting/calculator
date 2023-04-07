// starting out with math operations from a prior project
const add = function(num1, num2) {
  if (num1 === undefined || num2 === undefined) {
    return NaN;
  }
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return NaN;
  }
  return num1 + num2;
};

const subtract = function(num1, num2) {
  if (num1 === undefined || num2 === undefined) {
    return NaN;
  }
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return NaN;
  }
  return num1 - num2;
};

const sum = function(arr) {
  let sum = 0;
  if(arr.length === 0) {
    return 0;
  }
  // check if the array contains only numbers
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number') {
      return NaN;
    }
    sum += arr[i];
  }
  return sum;
};

const multiply = function(args) {
  multiple = 1;
  // check if the arguments are numbers
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'number') {
      return NaN;
    }
    multiple *= args[i];
  }
  return multiple;
};

const power = function(num1, num2) {
  if (num1 === undefined || num2 === undefined) {
    return NaN;
  }
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return NaN;
  }
  return num1 ** num2;	
};

const factorial = function(num1) {
  if (num1 === 0) {
    return 1;
  } else {
    return num1 * factorial(num1 - 1);
  }
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};