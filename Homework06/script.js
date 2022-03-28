// 1. display in the console the numbers from 1 to 20
function displayNo(a) {
  let no = [];
  for (let i = 1; i <= a; i++) {
    no.push(i);
  }
  return no;
}
console.log(displayNo(20));

// 2. display in the console the odd numbers from 1 to 20
function displayNoOdd(a) {
  let nrPare = [];
  for (i = 1; i <= a; i++) {
    if (i % 2 === 0) {
      nrPare.push(i);
    }
  }
  return nrPare;
}
console.log(displayNoOdd(20));

// 3. compute the sum of the elements of an array and display it in the console
function arrSum(arr) {
  let sum = 0;
  for (i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
console.log(arrSum([1, 2, 3]));

// 4. compute the maximum of the elements of an array and display it in the console

function maxNr(arr) {
  let currentMax = 0;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] > currentMax) {
      currentMax = arr[i];
    }
  }
  return currentMax;
}
console.log(maxNr([0, 1, 20, 3, 4, 5, 6, 7]));

// 5. compute how many times a certain element appears in an array

function elementCounter(arr, elem) {
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elem) {
      counter++;
    }
  }
  return counter;
}
console.log(elementCounter([1, 2, 2, 2, 3], 2));

//Challange - using nested loop for generate the following pattern

// 0101 // in iteratiile in care i%3===0, break + if care checkuieste ce caracter am avut in i-1
// 1010
// 0101
// 1010

function pattern() {
  let str = "";
  for (let i = 0; i < 17; i++) {
    if (i % 3 === 0) {
      str += "\n";
      if (i - 1 === 1) {
        str += 1;
      } else {
        str += 0;
      }
    }
    // if (i % 2 === 0) {
    //   str += 0;
    // } else {
    //   str += 1;
    // }
  }
  return str;
}

console.log(pattern());
