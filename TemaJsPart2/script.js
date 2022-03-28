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
// const test = "1" * 1;
// console.log(test, typeof test);

// 2. O functie "getLetters" care primeste un sir de caractere si returneaza doar literele din sirul respectiv // de modificat
function getLetters(str) {
  let strTxt = "";
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) continue;
    strTxt += str[i];
  }
  return strTxt;
}
console.log(getLetters("xx56xx456xxxxx456xx456"));

// 3. O functie "getFirst5Letters" care primeste un sir de caractere si returneaza primele 5 litere(daca exista) // de modificat 1
function getFirst5Letters(str) {
  let strTxt = "";
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) continue;
    if (strTxt.length <= 4) {
      strTxt += str[i];
    } else break;
  }
  return strTxt;
}

console.log(getFirst5Letters("as123dfgh123jkl"), getFirst5Letters("abc123"));

// 4. O functie "concatenate" care primeste o lista de siruri de caractere si returneaza sirurile concatenate - all good!
function concatenate(arr) {
  let output = "";
  for (let i = 0; i < arr.length; i++) {
    output += arr[i];
  }
  return output;
}
console.log(concatenate(["abc", "123", "xyz"]));

// 5. O functie "getAllDigits" care primeste o lista de siruri de caractere si returneaza cifrele din toate sirurile - all good
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

// 6. O functie "invertAllStrings" care primeste o lista de siruri de caractere si returneaza lista de siruri de caractere inversate - all good
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

// 7. Calculeaza factorialul unui numar ("factorial"). - all good
function factorial(n) {
  let output = 1;
  for (let i = n; i > 1; i--) {
    output *= i;
  }
  return output;
}
console.log(factorial(4));

/////////// 8. Calculeaza cel mai mare divizor comun al 2 numere ("cmmdc") - all good
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
/////////// 9. Calculeaza cel mai mic multiplu comun al 2 numere ("cmmmc")

function cmmmc(a, b) {
  let i = (a * b) / cmmdc(a, b);
  return i;
}
console.log(cmmmc(18, 24));

// 10. Returneaza un array care sa contina toti divizorii unui numar (ex pentru 64: trebuie sa returneze [2,4,8,16,32]) ("divizori") - all good
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

/////////// 11. O functie care verifica daca un numar este palindrom (ex: 121, 1234321) ("palindrom") - all good
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

// 12. O functie care sorteaza numerele pare dintr-un sir de numere primit ca parametru. ("sort") - de verificat pt numere negative
function sort(a) {
  let aPar = [];
  for (let i = 0; i < a.length; i++)
    while (a[i] > 0) {
      if ((a[i] % 10) % 2 === 0) {
        aPar.push(a[i] % 10);
      }
      a[i] = Math.trunc(a[i] / 10);
    }
  return aPar;
}
console.log(sort([1, -2, 3, 4]));
// 13. O functie care primeste ca parametru un array de numere. Aceasta sorteaza ascendent numerele pare si descendent numerele impare, in cadrul aceluiasi array primit ca parameru. ("sortAscDesc")

// if nr par, push la array

// 14. O functie care primeste 2 parametri(un array si un numar). Folosind binary search verificati daca numarul primit ca parametru se gaseste in array. ("binarySearch")
// 15. O functie care implementeaza binary search pentru a verifica daca un numar se regaseste intr-un array. Dupa ce se termina executia functiei trebuie sa returnati de cate ori s-a apelat functia recursiv ("countBinarySearch")
