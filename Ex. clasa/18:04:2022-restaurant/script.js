"use strict";

let state = {
  list: {},
  databaseUrl:
    "https://fva-linkuri-siit-23-default-rtdb.europe-west1.firebasedatabase.app/",
  search: "",
};

async function getData() {
  let url = state.databaseUrl + ".json";
  loading();
  let response = await fetch(url);
  let list = await response.json();
  state.list = list;
  loading();
  draw();
}

function draw() {
  let renderList = document.querySelector(".content");
  let str = "";
  let listArr = Object.entries(state.list);
  for (let i = 0; i < listArr.length; i++) {
    let description = listArr[i][1];
    let id = listArr[i][0];
    if (description.ingrediente.toLowerCase().includes(state.search)) {
      str += `
        <div class="meal">
          <img class="img" src="${description.imagine}" />
          <div>
            <h3 class="title">${description.nume}</h3>
            <p class="description">${description.ingrediente}</p>
          </div>
          <a href="detalii.html?id=${id}"><input class="details-btn" type="button" value="Detalii"> </a>
        </div>
    `;
    }
  }
  renderList.innerHTML = str;
}

function search() {
  let input = document.querySelector(".search > input[type=text]");
  let searchVal = input.value;
  state.search = searchVal.toLowerCase();
  draw();
}

function loading() {
  let animation = document.querySelector(".lds-ellipsis");
  let container = document.querySelector(".container");
  animation.classList.toggle("hidden");
  container.classList.toggle("overlay");
}
