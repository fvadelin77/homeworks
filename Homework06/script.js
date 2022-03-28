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
// 0101 // i%3===0 nu merge pt ca face break la prima iteratie (0%3===0)
// 1010
// 0101
// 1010
function pattern() {
  let str = "";
  let p = 0;
  for (let i = 0; i < 16; i++) {
    console.log(p);
    // adauga p si in iteratiile 3,7,11,15, inainte sa intre in if pt \n
    str += p;
    // cand i=3,7,11,15 -> \n
    if (i % 4 === 3) {
      str += "\n";
    } else {
      // next p = 0 sau 1?
      p = (p + 1) % 2;
    }
  }
  return str;
}
console.log(pattern());
