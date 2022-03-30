"use strict";

// Selectori
const formEl = document.getElementById("form");
const firstNameinputEl = document.getElementById("first-name");
const lastNameinputEl = document.getElementById("last-name");
const genderM = document.getElementById("genderM");
const genderF = document.getElementById("genderF");
const messageBox = document.getElementById("textarea");
const popUp = document.querySelector(".popup");
const input = document.querySelectorAll(".input");
const gender = document.querySelectorAll(".gender");
// variabila globala pentru ca o folosesc in 2 functii, in una scriu arr, in alta citesc arr - de actualizat
let containsText = [];

// On submit individual field checker for ch < 3
const isBlank = function () {
  for (let i = 0; i < input.length; i++) {
    if (input[i].value.trim().length < 3) {
      input[i].classList.add("invalid");
      containsText[i] = false;
    } else {
      containsText[i] = true;
      input[i].classList.remove("invalid");
    }
  }
};

// On submit gender radio check
const isChecked = function () {
  for (let i = 0; i < gender.length; i++) {
    if (!gender[i].checked && !gender[i + 1].checked) {
      gender[i].classList.add("radio-error");
      gender[i + 1].classList.add("radio-error");
      return;
    } else if (gender[i].checked || gender[i + 1].checked) {
      gender[i].classList.remove("radio-error");
      gender[i + 1].classList.remove("radio-error");
      return true;
    }
  }
};

// Functie de validare inputuri
const inputValidator = function () {
  let state = false;
  for (let i = 0; i < containsText.length; i++) {
    if (containsText[i] === false) {
      return;
    } else {
      state = true;
    }
  }
  return state;
};

// Functie de logat in consola
const logger = function () {
  let genderStr = "";
  if (document.querySelector("input[value='female']:checked")) {
    genderStr = "Female";
  } else genderStr = "Male";
  console.log(`First Name: ${firstNameinputEl.value}`);
  console.log(`Last Name: ${lastNameinputEl.value}`);
  console.log(`Gender: ${genderStr}`);
  console.log(`Message: ${messageBox.value}`);
};

///// Submit validation
formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  // Apeleaz functii care verifica inputuri
  isBlank();
  isChecked();
  // Conditii pentru Submit succesful
  if (inputValidator() && isChecked()) {
    popUp.classList.remove("hidden");
    popUp.innerHTML = `Thank you for contacting us, ${firstNameinputEl.value}`;

    logger();
  }
});

// // On focus change check for ch < 3 - global
// for (let i = 0; i < input.length; i++) {
//   input[i].addEventListener("change", function (e) {
//     if (input[i].value.trim().length < 3) {
//       input[i].classList.add("invalid");
//       inputValidator[i] = -1;
//     } else {
//       inputValidator[i] = -1;
//       input[i].classList.remove("invalid");
//     }
//   });
// }
