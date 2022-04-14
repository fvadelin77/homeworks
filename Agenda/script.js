"use strict";
let state = {
  list: [],
  editState: false,
};

function adauga() {
  if (state.editState === true) {
    cancelEdit();
  } else {
    let nume = document.querySelector("input[name=nume]").value;
    let tel = document.querySelector("input[name=telefon]").value;
    if (nume && tel) {
      let entry = {
        nume: nume,
        tel: tel,
      };
      state.list.push(entry);
      console.log(state.list);
      draw();
      document.querySelector("form").reset();
      document.querySelector("table").classList.remove("hidden");
    }
  }
}

function draw() {
  let tableEntry = document.querySelector("tbody");
  let str = "";
  for (let i = 0; i < state.list.length; i++) {
    let stateElement = state.list[i];
    str += `
      <tr>
        <td>${stateElement.nume}</td>
        <td>${stateElement.tel}</td>
        <td>
          <button class="table-btn" onclick="edit(${i})">Modifica</button>
        </td>
        <td>
          <button class="table-btn" onclick="del(${i})">Sterge</button>
        </td>
      </tr>
  `;
  }
  tableEntry.innerHTML = str;
}

function enter() {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      adauga();
      draw();
    }
  });
}

function edit(i) {
  if (state.editState === false) {
    state.editState = true;
    let elem = state.list[i];
    document.querySelector("input[name='nume']").value = elem.nume;
    document.querySelector("input[name='telefon']").value = elem.tel;
    document.querySelector("input[name='adauga']").value = "Salveaza";
    document.querySelector(".btns").innerHTML = `
      <div class="save-btn" onclick="save(${i})">
        <input type="button" name="salveaza" value="Salveaza" />
      </div>
      <div class="cancel-edit-btn">
        <input onclick="cancelEdit();" type="button" name="cancel" value="${"&#215"}" />
      </div>`;
  }
}

function cancelEdit() {
  state.editState = false;
  document.querySelector("form").reset();
  document.querySelector("cancel-edit-btn");
  document.querySelector(".btns").innerHTML = `
    <div class="form-btn" onclick="adauga()">
      <input type="button" name="adauga" value="Adauga contact" />
    </div>`;
}

function del(i) {
  if (
    confirm(`Esti sigur ca vrei sa stergi contactul: "${state.list[i].nume}" ?`)
  ) {
    state.list.splice(i, 1);
    cancelEdit();
    draw();
    if (state.list.length === 0) {
      document.querySelector("table").classList.add("hidden");
    }
  }
}

function save(i) {
  let nume = document.querySelector("input[name='nume']").value;
  let tel = document.querySelector("input[name='telefon']").value;
  if (nume && tel) {
    let elem = state.list[i];
    console.log(elem);
    elem.nume = nume;
    elem.tel = tel;
  }
  cancelEdit();
  draw();
}

// event.stopPropagation(), pe onclick sau in interiorul functiei, previne sa se propage eventul in sus in dom
