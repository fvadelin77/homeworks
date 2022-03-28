// 1. O functie "equals" care primeste 2 parametrii si returneaza daca cei 2 parametrii sunt egali, strict
function equals(a, b) {
  let output;
  if (a === b) {
    output = true;
  } else output = false;
  return output;
}
console.log(equals(3, 3), equals(3, 4));

// 2. O functie "compare" care primeste 2 parametrii si returneaza -1 daca primul e mai mic ca al doilea, 0 daca sunt egale si 1 daca primul e mai mare ca al doilea
function compare(a, b) {
  let output;
  if (a < b) {
    output = -1;
  } else if (a > b) {
    output = 1;
  } else {
    output = 0;
  }
  return output;
}
console.log(compare(1, 2), compare(2, 1), compare(2, 2));

// 3. O functie "max" care primeste 2 parametrii si returneaza maximul dintre cele 2
function max(a, b) {
  let currentMax = 0;
  if (a > b) {
    currentMax = a;
  } else {
    currentMax = b;
  }
  return currentMax;
}
console.log(max(1, 2), max(2, 1), max(2, 2));

// 4. O functie "min" care primeste 2 parametrii si returneaza minimul dintre cele 2
function min(a, b) {
  let currentMin = 0;
  if (a > b) {
    currentMin = b;
  } else {
    currentMin = a;
  }
  return currentMin;
}
console.log(min(1, 2), min(2, 1), min(2, 2));

// 5. O functie "suma" care primeste 1 parametru, numar intreg si returneaza suma primelor N numere naturale pozitive (exemplu: daca N este 3, trebuie sa returneze 6)
function suma(a) {
  let sum = 0;
  for (let i = 1; i <= a; i++) {
    sum += i;
  }
  return sum;
}
console.log(suma(4));

// 6. O functie "prim" care primeste 1 parametru si returneaza true/false daca N este numar prim sau nu (restul impartirii la 1 si la N ==0)
function prim(a) {
  let occurances = 0;
  for (let i = 0; i <= a; i++) {
    if (a % i === 0) {
      occurances++;
    }
  }
  return occurances < 3 ? true : false;
}
console.log(prim(7)); // true
console.log(prim(9)); // false

// 7. O functie "sumaPrime" care primeste 1 parametru si returneaza suma primelor N numere prime (pentru N=5 trebuie sa returneze 2+3+5+7+11=28)
function sumaPrime(n) {
  let toAdd = [];
  let sum = 0;
  for (let i = 2; toAdd.length < n; i++) {
    if (prim(i) === true) {
      toAdd.push(i);
      sum += i;
    }
  }
  return sum;
}
console.log(sumaPrime(5));

// 8. O functie "invers" care primeste un parametru de tip numar si intoarce inversul acestuia (ca numar) (123 => 321)

function invers(a) {
  let nr = a;
  let output = 0;
  while (nr !== 0) {
    console.log(output, "output");
    output = output * 10 + (nr % 10);
    console.log(output, "output");
    console.log(nr);
    nr = Math.trunc(nr / 10);
    console.log(nr);
  }
  return output;
}
console.log(invers(123));

// function invers(a) {
//   let output = [];
//   let inv;
//   while (a > 0) {
//     output.push(a % 10);
//     a = Math.trunc(a / 10);
//   }
//   inv = Number(output.join(""));
//   return inv;
// }

// 9. O functie "produsImpare" care primeste 1 parametru si returneaza produsul primelor N numere impare pozitive (pentru N=5; returneaza 1*3*5*7*9=945)
function produsImpare(a) {
  let produce = 1;
  let counter = a;
  for (let i = 0; i <= counter; i++) {
    if (i % 2 === 1) {
      produce *= i;
      counter++;
    }
  }
  return produce;
}
console.log(produsImpare(5));

// 10. O functie "contains" care primeste 2 parametri(arr - array de nr intregi si x - numar) si verifica daca x exista in array (rezultatul este true/false)
function contains(arr, x) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === x) {
      return true;
    }
  }
  return false;
}
console.log(contains([1, 2, 3, 4, 5], 2));

// 11. O functie "maxArray" care primeste un array si returneaza valoarea maxima (ar trebui sa functioneze si pentru numere si pentru stringuri)
function maxArray(arr) {
  let max = [-Infinity];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
console.log(maxArray([1, 2, 3]));
console.log(maxArray(["a", "c", "b"]));

// 12. O functie "sumMinMax" care primeste un array de numere si returneaza suma dintre valoare maxima si valoare minima - -  - de verificat
function sumMinMax(arr) {
  let sorted = arr.sort(compare);
  function compare(a, b) {
    return a - b;
  }
  return sorted[0] + sorted[sorted.length - 1];
}
console.log(sumMinMax([-1, -2, -3]));

// 13. O functie "hasDuplicates" care primeste un array si returneaza daca exista duplicate intr-un array primit ca parametru (true/false)
function hasDuplicates(arr) {
  let current;
  for (let i = 0; i < arr.length; i++) {
    current = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      if (current === arr[j]) {
        return true;
      }
    }
  }
  return false;
}
console.log(hasDuplicates(["abc", "def", "ghi", "ghi"]));

// 14. O functie "produsPozitive" care primeste un array si returneaza produsul numerelor pozitive intr-un array primit ca parametru
function produsPozitive(arr) {
  let produce = 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      produce *= arr[i];
    }
  }
  return produce;
}
console.log(produsPozitive([-1, -2, 1, 2, 3, 3, -2]));

// 15. O functie "palindrom" care primeste un string si returneaza daca este palindrom (inversul == originalul, ex: "1234321", "55", "787") (true/false)
function palindrom(str) {
  let strInv = "";
  for (let i = str.length - 1; i >= 0; i--) {
    strInv += str[i];
  }
  return str === strInv ? true : false;
}
console.log(palindrom("1234321"));
