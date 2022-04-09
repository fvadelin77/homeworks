"use strict";
let state = {
  list: [],
};

function addToList() {
  let itemValue = document.querySelector("input[name='item']").value;
  if (itemValue) {
    let item = {
      item: itemValue,
      bought: false,
    };
    state.list.push(item);
    draw();
    document.querySelector("form").reset();
    document.querySelector("table").classList.remove("hidden");
    document.querySelector(".sort").classList.remove("hidden");
  }
}

function draw() {
  let str = "";
  for (let i = 0; i < state.list.length; i++) {
    let elem = state.list[i];
    // Maybe try toggle strikeThrough ?
    str += `
      <tr>
        <td class="${elem.bought ? "strikeThrough" : ""}">
          ${elem.item}
        </td>
        <td>
          <input onclick="bought(${i})" class="btn" type="button" name="bought" value="Bought" />
        </td>
      </tr>`;
  }
  document.querySelector("tbody").innerHTML = str;
  console.log(state.list);
}

function bought(i) {
  let elem = state.list[i];
  elem.bought = true;
  draw();
}

function sort(val) {
  state.list.sort(function (a, b) {
    return a.item < b.item ? -1 * val : a.item > b.item ? 1 * val : 0;
  });
  draw();
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addToList();
  }
});
