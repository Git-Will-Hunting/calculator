// starting with math from a previous project
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

// couldnt figure out exporting for javascript web so i just copied the code into new file