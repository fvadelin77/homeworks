let databaseUrl =
  "https://fva-linkuri-siit-23-default-rtdb.europe-west1.firebasedatabase.app/";

async function pushElement() {
  let inputs = document.querySelectorAll("textarea");
  let nume = "";
  let imagine = "";
  let ingrediente = "";
  let modpreparare = "";
  for (let i = 0; i < inputs.length; i++) {
    i === 0
      ? (nume = inputs[0].value)
      : i === 1
      ? (imagine = inputs[1].value)
      : i === 2
      ? (ingrediente = inputs[2].value)
      : (modpreparare = inputs[3].value);
  }

  loading();
  let response = await fetch(databaseUrl + ".json", {
    method: "POST",
    body: JSON.stringify({
      imagine: imagine,
      ingrediente: ingrediente,
      nume: nume,
      modpreparare: modpreparare,
    }),
  });
  loading();
  window.location = "admin.html";
}

function loading() {
  let animation = document.querySelector(".lds-ellipsis");
  let container = document.querySelector(".container");
  animation.classList.toggle("hidden");
  container.classList.toggle("overlay");
}

// de schimbat la modifica cu textarea, la nume si url imagine.
// tot la modifica, de adaugat buton cu renunta si loading
