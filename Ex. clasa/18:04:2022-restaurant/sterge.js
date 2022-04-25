let state = {
  databaseUrl:
    "https://fva-linkuri-siit-23-default-rtdb.europe-west1.firebasedatabase.app/",
  id: window.location.search.substring(4),
  list: {},
};

async function getData() {
  loading();
  let response = await fetch(state.databaseUrl + state.id + ".json");
  let responseJson = await response.json();
  loading();
  state.list = responseJson;
  populateFields();
}

function populateFields() {
  let field = document.querySelector(".content > h4");
  field.innerHTML += ` "${state.list.nume}"`;
}

function adminHome() {
  window.location = "admin.html";
}

async function deleteConfirm() {
  loading();
  let response = await fetch(state.databaseUrl + state.id + ".json", {
    method: "DELETE",
  });

  adminHome();
  loading();
}

function loading() {
  let animation = document.querySelector(".lds-ellipsis");
  let container = document.querySelector(".container");
  animation.classList.toggle("hidden");
  container.classList.toggle("overlay");
}
