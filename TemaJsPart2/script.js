"use strict";
// 1. O functie "getDigits" care primeste un sir de caractere si returneaza cifrele din sirul respectiv
function getDigits(str) {
  let strNo = "";
  for (let i = 0; i < str.length; i++) {
    if (isNaN(str[i])) continue;
    strNo += str[i];
  }
  return strNo;
}
console.log(getDigits("xx56xx456xxxxx456xx456"));

// 2. O functie "getLetters" care primeste un sir de caractere si returneaza doar literele din sirul respectiv // de modificat
function getLetters(str) {
  let strTxt = "";
  for (let i = 0; i < str.length; i++) {
    if ((str[i] >= "A" && str[i] <= "Z") || (str[i] >= "a" && str[i] <= "z")) {
      strTxt += str[i];
    }
  }
  return strTxt;
}
console.log(getLetters("xx56xx456xxxxx456xx456"));

// 3. O functie "getFirst5Letters" care primeste un sir de caractere si returneaza primele 5 litere(daca exista)
function getFirst5Letters(str) {
  let output = "";
  for (let i = 0; output.length < 5; i++) {
    let onlyLettersStr = getLetters(str);
    output += onlyLettersStr[i];
  }
  return output;
}
console.log(getFirst5Letters("as123dfgh123jkl"), getFirst5Letters("abccc1223"));

// 4. O functie "concatenate" care primeste o lista de siruri de caractere si returneaza sirurile concatenate
function concatenate(arr) {
  let output = "";
  for (let i = 0; i < arr.length; i++) {
    output += arr[i];
  }
  return output;
}
console.log(concatenate(["abc", "123", "xyz"]));

// 5. O functie "getAllDigits" care primeste o lista de siruri de caractere si returneaza cifrele din toate sirurile
function getAllDigits(arr) {
  let str = "";
  let strNo = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
  }
  for (let i = 0; i < str.length; i++) {
    if (isNaN(str[i])) continue;
    strNo += str[i];
  }
  return strNo;
}
console.log(getAllDigits(["ab3", "a23", "x2z"]));

// 6. O functie "invertAllStrings" care primeste o lista de siruri de caractere si returneaza lista de siruri de caractere inversate
function invertAllStrings(arr) {
  let arrInv = [];
  let m = "";
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      m += arr[i][j];
    }
    arrInv.unshift(m);
    m = "";
  }
  return arrInv;
}
console.log(invertAllStrings(["abc", "def", "ghi"]));

// 7. Calculeaza factorialul unui numar ("factorial").
function factorial(n) {
  let output = 1;
  for (let i = n; i > 1; i--) {
    output *= i;
  }
  return output;
}
console.log(factorial(4));

// 8. Calculeaza cel mai mare divizor comun al 2 numere ("cmmdc")
function cmmdc(a, b) {
  let r = a % b;
  while (r !== 0) {
    a = b;
    b = r;
    r = a % b;
  }
  return b;
}
console.log(cmmdc(18, 24));

// 9. Calculeaza cel mai mic multiplu comun al 2 numere ("cmmmc")
function cmmmc(a, b) {
  let i = (a * b) / cmmdc(a, b);
  return i;
}
console.log(cmmmc(18, 24));

// 10. Returneaza un array care sa contina toti divizorii unui numar (ex pentru 64: trebuie sa returneze [2,4,8,16,32]) ("divizori")
function divizori(a) {
  let output = [];
  for (let i = 2; i < a; i++) {
    if (a % i === 0) {
      output.push(i);
    }
  }
  return output;
}
console.log(divizori(64));

// 11. O functie care verifica daca un numar este palindrom (ex: 121, 1234321) ("palindrom")
function palindrom(a) {
  let nr = a;
  let nrInv = 0;
  while (nr !== 0) {
    nrInv = nrInv * 10 + (nr % 10);
    nr = Math.trunc(nr / 10);
  }
  return nrInv === a ? true : false;
}
console.log(palindrom(1234321));

// 12. O functie care sorteaza numerele pare dintr-un sir de numere primit ca parametru. ("sort")
function sort(arr) {
  // sortare array bubble
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // scriu ouput cu valorile sortate, pare
  let sorted = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sorted.push(arr[i]);
    }
  }
  return sorted;
}
console.log(sort([5, 4, 3, 2, 1]));

// 13. O functie care primeste ca parametru un array de numere. Aceasta sorteaza ascendent numerele pare si descendent numerele impare, in cadrul aceluiasi array primit ca parameru. ("sortAscDesc")
function sortAscDesc(arr) {
  // sortez array bubble
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // push ouput Asc - par
  let sorted = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sorted.push(arr[i]);
    }
  }
  // scriu ouput Desc - impar
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] % 2 !== 0) {
      sorted.push(arr[i]);
    }
  }
  return sorted;
}
console.log(sortAscDesc([5, 4, 3, 2, 1]));

// 14. O functie care primeste 2 parametri(un array si un numar). Folosind binary search verificati daca numarul primit ca parametru se gaseste in array. ("binarySearch")
function binarySearch(arr, val) {
  let min = arr[0];
  let max = arr[arr.length - 1];
  while (min <= max) {
    let middle = Math.floor((max + min) / 2);
    if (middle === val) {
      return true;
    } else if (val < middle) {
      max = middle - 1;
    } else if (val > middle) {
      min = middle + 1;
    }
  }
  return false;
}
console.log(binarySearch([1, 2, 3, 4, 5], 2));

// 15. O functie care implementeaza binary search pentru a verifica daca un numar se regaseste intr-un array. Dupa ce se termina executia functiei trebuie sa returnati de cate ori s-a apelat functia recursiv ("countBinarySearch") - de scos while si pus recrusion
function countBinarySearch(arr, val) {
  let counter = 0;
  function binarySearch(arr, val) {
    counter++;
    let min = arr[0];
    let max = arr[arr.length - 1];
    let newArr = [];
    if (min <= max) {
      let middle = Math.floor((max + min) / 2);
      if (middle === val) {
        return;
      } else if (val < middle) {
        max = middle - 1;
        newArr = arr.slice(0, max);
      } else if (val > middle) {
        min = middle + 1;
        newArr = arr.slice(middle, arr.length);
      }
      binarySearch(newArr, val);
    } else return;
  }
  binarySearch(arr, val);
  return counter;
}
console.log(countBinarySearch([1, 2, 3, 4, 5], 4));
