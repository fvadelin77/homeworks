function updateBadges() {
  // Cart
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  let cartBadge = document.querySelector(".cart");
  if (isNaN(cartLocal)) {
    // get total items
    cartBadge.innerHTML = `
              <button class="btn position-relative trigger-hover">
                  <i class="bi bi-cart-fill link-primary"></i>
                  <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      ${getTotalItems("cart")}
                </span>
              </button>
              
                      `;

    console.log(typeof localStorage.getItem("cart"));
  } else {
    cartBadge.innerHTML = `
    <button class="btn position-relative trigger-hover">
                  <i class="bi bi-cart link-primary"></i>
              </button>
    `;
  }
  // Favorites
  let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
  let favoritesBadge = document.querySelector(".favorites");
  if (isNaN(favoritesLocal)) {
    // get total items
    favoritesBadge.innerHTML = `
              <button class="btn position-relative">
                  <i class="bi bi-heart-fill link-danger"></i>
                  <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      ${getTotalItems("favorites")}
              </span>
              </button>
              
                      `;
  } else {
    favoritesBadge.innerHTML = `
              <button class="btn position-relative">
                  <i class="bi bi-heart link-danger"></i>
              </button>
              `;
  }
}

function getTotalItems(list) {
  let listLocal = JSON.parse(localStorage.getItem(`${list}`));
  let counter = 0;
  for (let i = 0; i < listLocal.length; i++) {
    counter += listLocal[i].quantity * 1;
  }
  return counter;
}

// Add to cart/favorites
function addToLocal(id, list) {
  let temp = [];
  // initializez "cart"/"favorites" arr
  if (!localStorage.getItem(`${list}`)) {
    localStorage.setItem(`${list}`, "[]");
  }
  // aduc localStorage `${list}` pentru prelucrat
  temp = JSON.parse(localStorage.getItem(`${list}`));
  // gasesc obj cu produs
  for (let [key, value] of Object.entries(state.db)) {
    if (key === id) {
      // verific daca exista deja in`${list}` daca exista return
      for (let j = 0; j < temp.length; j++) {
        if (temp[j].dbIdx === id && list === "favorites") {
          return;
        } else if (temp[j].dbIdx !== id && list === "favorites") {
          localStorage.setItem(`${list}`, JSON.stringify(temp));
        } else if (temp[j].dbIdx === id && list === "cart") {
          console.log("Produs existent deja in cos, cantitate +1");
          temp[j].quantity = temp[j].quantity * 1 + 1;
          localStorage.setItem(`${list}`, JSON.stringify(temp));
          return;
        }
      }
      // daca nu exista, push + setItem + break
      let toPush = {
        product: value,
        quantity: 1,
        dbIdx: id,
      };
      console.log();
      temp.push(toPush);
      localStorage.setItem(`${list}`, JSON.stringify(temp));
      break;
    } else {
      continue;
    }
  }
}
