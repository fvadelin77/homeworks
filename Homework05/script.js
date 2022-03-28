// 1. O functie "equals" care primeste 2 parametrii si returneaza daca cei 2 parametrii sunt egali, strict
function equals(a, b) {
  if (a === b) {
    return console.log(`${a}, ${b} sunt numere egale`);
  }
}
equals(10, 121);
equals(10, 10);

// 2. O functie "compare" care primeste 2 parametrii si returneaza -1 daca primul e mai mic ca al doilea, 0 daca sunt egale si 1 daca primul e mai mare ca al doilea
function compare(a, b) {
  let result;
  if (a < b) {
    result = -1;
  } else if (a > b) {
    result = 1;
  } else {
    result = 0;
  }
  return console.log(result);
}
compare(435, 345);
compare(345, 435);
compare(300, 300);

// 3. O functie "max" care primeste 2 parametrii si returneaza maximul dintre cele 2
function max(a, b) {
  let result;
  if (a > b) {
    result = a;
  } else if (a < b) {
    result = b;
  } else result = a;
  return console.log(result);
}
max(7452, 2634);
max(234, 587);
max(111, 111);

// 4. O functie "min" care primeste 2 parametrii si returneaza minimul dintre cele 2
function min(a, b) {
  let result;
  if (a > b) {
    result = b;
  } else if (a < b) {
    result = a;
  } else result = a;
  return console.log(result);
}
min(7452, 2634);
min(234, 587);
min(111, 111);
// 5. O functie "suma" care primeste 1 parametru, numar intreg si returneaza suma primelor N numere naturale pozitive (exemplu: daca N este 3, trebuie sa returneze 6)
function suma(a) {
  let sir = [];
  let sirSum = 0;
  // construiesc array;
  for (let i = a; i >= 0; i--) {
    if (i === a) {
      sir[i - 1] = a; //3
    } else {
      sir[i] = a - i;
    }
  }
  // suma array;
  for (let i = 0; i < sir.length; i++) {
    sirSum = sirSum + sir[i];
  }
  return console.log(sirSum);
}
suma(3);
suma(4);
suma(10);
// 6. O functie "prim" care primeste 1 parametru si returneaza true/false daca N este numar prim sau nu (restul impartirii la 1 si la N ==0)
// function prim(a) {
//   let result;
//   if (a % 1 === 0 && a % a === 0) {
//     result = true;
//   } else {
//     result = false;
//   }
//   return console.log(result);
// }

// prim(2);
// prim(9);
// prim(10);

// 7. O functie "sumaPrime" care primeste 1 parametru si returneaza suma primelor N numere prime (pentru N=5 trebuie sa returneze 2+3+5+7+11=28)
// 8. O functie "invers" care primeste un parametru de tip numar si intoarce inversul acestuia (ca numar) (123 => 321)
function invers(a) {}
// 9. O functie "produsImpare" care primeste 1 parametru si returneaza produsul primelor N numere impare pozitive (pentru N=5; returneaza 1*3*5*7*9=945)
// 10. O functie "contains" care primeste 2 parametri(arr - array de nr intregi si x - numar) si verifica daca x exista in array (rezultatul este true/false)
// 11. O functie "maxArray" care primeste un array si returneaza valoarea maxima (ar trebui sa functioneze si pentru numere si pentru stringuri)
// 12. O functie "sumMinMax" care primeste un array de numere si returneaza suma dintre valoare maxima si valoare minima
// 13. O functie "hasDuplicates" care primeste un array si returneaza daca exista duplicate intr-un array primit ca parametru (true/false)
// 14. O functie "produsPozitive" care primeste un array si returneaza produsul numerelor pozitive intr-un array primit ca parametru
// 15. O functie "palindrom" care primeste un string si returneaza daca este palindrom (inversul == originalul, ex: "1234321", "55", "787") (true/false)

// 21.03.2022 -

function contains(nr) {
  for (let i = nr; i > 0; i = Math.floor(i / 10)) {
    if (i % 10 === 7) {
      return true;
    }
  }
  return false;
}

function bolt(nr) {
  let directie = true; //true spre dreapta;
  for (let i = 1; i <= nr; i++) {
    if (i % 7 === 0 || contains(i)) {
      directie = !directie;
    }
    if (directie) {
      console.log("spre dreapta >>>");
    } else {
      console.log("<<< spre stanga");
    }
  }
}

let str = "Ana are mere";
let strInverse = "";
for (i = str.length - 1; i >= 0; i--) {
  strInverse = strInverse + str[i];
}
console.log(strInverse);

console.log(bolt(50));
