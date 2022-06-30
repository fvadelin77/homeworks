let adminState = {
  url: "https://webstore-a2c89-default-rtdb.europe-west1.firebasedatabase.app/",
  editMode: false,
  editIdx: undefined,
};

async function getData() {
  loader();
  let response = await fetch(adminState.url + ".json");
  adminState.db = await response.json();
  loader();
  populateData();
  updateBadges();
}

function populateData() {
  let table = document.querySelector("tbody");
  let str = "";
  for (let [key, value] of Object.entries(adminState.db)) {
    console.log(key, value);
    if (value === null) {
      continue;
    } else {
      str += `
      <tr>
        <th>
          ${key}
        </th>
        <td>${value.name}</td>
        <td>${value.price}</td>    
        <td>${value.stoc}</td>    
        <td>
            <button class="btn px-2 py-1 editBtn" onclick="edit('${key}')">
                <i class="bi bi-pencil-fill link-primary"></i>
            </button>
        </td>
        <td>
            <button class="btn px-2 py-1 deleteBtn" onclick="deleteItem('${key}')">
                <i class="bi bi-x-circle-fill link-danger"></i>
            </button>
        </td>        
    </tr>
      `;
    }
    table.innerHTML = str;
  }
}

function toggleFields() {
  let adminForm = document.getElementById("admin-form");
  let addBtn = document.getElementById("add-btn");
  adminForm.classList.toggle("d-none");
  addBtn.classList.toggle("d-none");
}

function edit(i) {
  if (adminState.editMode === true) {
    return;
  } else {
    let btns = document.querySelectorAll(`td>.btn`);
    for (let btn of btns) {
      btn.setAttribute("disabled", "");
    }
    adminState.editMode = true;
    adminState.editIdx = i;
    let name = document.getElementById("name");
    let price = document.getElementById("price");
    let stock = document.getElementById("stock");
    let images = document.getElementById("images");
    let categories = document.getElementById("categories");

    name.value = adminState.db[i].name;
    price.value = adminState.db[i].price;
    stock.value = adminState.db[i].stoc;
    images.value = adminState.db[i].img.join(", ");
    categories.value = adminState.db[i].category.join(", ");
    toggleFields();
    backToTop();
  }
}

function cancel() {
  let inputs = document.querySelectorAll("input");
  let textareas = document.querySelectorAll("textarea");
  for (let elem of inputs) {
    elem.value = "";
  }
  for (let elem of textareas) {
    elem.value = "";
  }
  let disabledBtns = document.querySelectorAll("[disabled]");
  for (let btn of disabledBtns) {
    btn.removeAttribute("disabled");
  }
  adminState.editMode = false;
}

async function save() {
  let name = document.querySelector("#name").value;
  let price = document.querySelector("#price").value;
  let stock = document.querySelector("#stock").value;
  let images = document.querySelector("#images").value;
  let categories = document.querySelector("#categories").value;
  // Edit scenario
  if (adminState.editMode === true) {
    loader();
    let response = await fetch(adminState.url + adminState.editIdx + ".json", {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        price: price,
        stoc: stock,
        img: images.split(", "),
        category: categories.split(", "),
      }),
    });
    loader();
    adminState.editIdx = undefined;
    window.location = "admin.html";
  } else {
    // Add scenario
    loader();
    let response = await fetch(adminState.url + ".json", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        price: price,
        stoc: stock,
        img: images.split(", "),
        category: categories.split(", "),
      }),
    });
    loader();
    window.location = "admin.html";
  }
}

async function deleteItem(i) {
  if (
    confirm(
      `Esti sigur ca vrei sa stergi produsul "${adminState.db[i].name}" ?`
    )
  ) {
    loader();
    let response = await fetch(adminState.url + i + "/" + ".json", {
      method: "DELETE",
    });
    loader();
    window.location = "admin.html";
  }

  // adminHome();
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
