"use strict";

let state = {
  databaseUrl:
    "https://fva-linkuri-siit-23-default-rtdb.europe-west1.firebasedatabase.app/",
  list: {},
};

async function getData() {
  let id = window.location.search.substring(4);
  let url = state.databaseUrl + id + ".json";
  loading();
  let response = await fetch(url);
  let list = await response.json();
  state.list = list;
  loading();
  populateFields();
}

function populateFields() {
  let fields = document.querySelectorAll("textarea");
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].name === "nume") {
      fields[i].value = state.list.nume;
    }
    if (fields[i].name === "url") {
      fields[i].value = state.list.imagine;
    }
    if (fields[i].name === "ingrediente") {
      fields[i].value = state.list.ingrediente;
    }
    // if (fields[i].name === "mod-preparare") {
    //   fields[i].value = state.list.ingrediente;
    // }
  }
}

async function save() {
  let url = document.querySelector("textarea[name = url]").value;
  let ingrediente = document.querySelector(
    "textarea[name = ingrediente]"
  ).value;
  let nume = document.querySelector("textarea[name = nume]").value;
  let id = window.location.search.substring(4);
  let response = await fetch(state.databaseUrl + id + ".json", {
    method: "PUT",
    body: JSON.stringify({
      imagine: url,
      ingrediente: ingrediente,
      nume: nume,
    }),
  });
  window.location = "admin.html";
}

function loading() {
  let animation = document.querySelector(".lds-ellipsis");
  let container = document.querySelector(".container");
  animation.classList.toggle("hidden");
  container.classList.toggle("overlay");
}

function goHome() {
  window.location = "admin.html";
}
