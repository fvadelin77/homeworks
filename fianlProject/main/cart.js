let state = {};
let soldOff = [];

async function getData() {
  loader();
  let response = await fetch(
    "https://webstore-a2c89-default-rtdb.europe-west1.firebasedatabase.app/" +
      ".json"
  );
  state.db = await response.json();
  loader();
}

async function updateCartItemsDetails() {
  loader();
  await getData();
  loader();
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (cartObj of cart) {
    cartObj.product = state.db[cartObj.dbIdx];
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function populateCart() {
  loader();
  await updateCartItemsDetails();
  loader();
  let cart = JSON.parse(localStorage.getItem("cart"));
  let tbody = document.querySelector("tbody");
  let str = "";
  let total = 0;
  if (cart === null || cart.length === 0) {
    str = `
        <tr>
            <td colspan="6"><h4>Cos gol!</h4></td>
        </tr>           
      `;
    // stoc < cos
    // caz depasit stoc
    // updatez produsul in cart dupa state.db de fiecare data cand se deseneaza cosul
  } else {
    for (let i = 0; i < cart.length; i++) {
      cartQty = Number(cart[i].quantity);
      stockQty = Number(cart[i].product.stoc);
      if (cartQty > stockQty || cartQty === 0) {
        if (!soldOff.includes(cart[i].dbIdx)) {
          soldOff.push(cart[i].dbIdx);
        }
      } else {
        soldOff = soldOff.filter((idx) => idx !== cart[i].dbIdx);
      }
      str += `
        <tr class=${soldOff.includes(cart[i].dbIdx) ? "table-danger" : ""}>
            <th scope="row">${i + 1}</th>
            <td>
                <img class="cart-img" src="${cart[i].product.img[0]}"/>
            </td>
            <td><a class="link-dark text-decoration-none" href="product.html?id=${
              cart[i].dbIdx
            }">${cart[i].product.name}</a></td>
            <td>${cart[i].product.price} RON</td>
            <td>
                <input type="number" value="${
                  cart[i].quantity
                  //https://stackoverflow.com/questions/9555143/html-maxlength-attribute-not-working-on-chrome-and-safari
                }" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" 
                maxlength="2"
                oninput="if(this.value.length > 2)this.value = this.value.slice(0, 2);"/>
            </td>
            <td>
                <button class="btn p-0 fs-5" onclick="deleteProduct(${i}); updateBadges();">
                    <i class="bi bi-x-circle-fill link-danger"></i>
                </button>
            </td>
        </tr>           
    
    `;
      total += cart[i].product.price * cart[i].quantity;
    }
    checkForChanges();
  }

  tbody.innerHTML = str;
  // Update total
  document.querySelector(".order-total").innerHTML = `
  <div><h5>Total cos: ${total} RON </h5></div>
  `;
  // Update summary
  let summary = document.querySelector(".cart-summary > tbody");
  summary.innerHTML = `
  <tr>
              <th scope="row"><div class="fs-6 fw-light">Total cos</div></th>
              <td>${total} RON</td>
            </tr>
            <tr>
              <th scope="row"><div class="fs-6 fw-light">Transport</div></th>
              <td>${(transport =
                // lazy
                cart === null || cart.length === 0 ? 0 : 20)} RON</td>
            </tr>
            <tr>
              <th scope="row"><div class="fs-5 fw-normal">Total final</div></th>
              <td><div class="fs-5 fw-normal">${
                total + transport
              } RON</div></td>
            </tr>

  `;
  updateBadges();
}

function updateCart() {
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  let qInput = document.querySelectorAll("input[type='number']");
  // Check daca intre timp, pe pagina de produse, s-a adaugat un produs in plus
  if (cartLocal.length !== qInput.length) {
    populateCart();
  }
  qInput = document.querySelectorAll("input[type='number']");

  for (let i = 0; i < qInput.length; i++) {
    // qInput.length pentru a evita bug - qty change + add to cart new product -> actualizeaza cos
    // for cu i < cartLocal.length merge cu o interatie in plus fata de qInput.length peste ultimul nr de elemente din qInput => undefined la ultima iteratie)
    if (qInput[i].value !== cartLocal[i].quantity) {
      if (qInput[i].value === "0") {
        cartLocal.splice(i, 1);
      } else {
        cartLocal[i].quantity = qInput[i].value;
      }
    }
  }
  localStorage.setItem("cart", JSON.stringify(cartLocal));
  window.location = "cart.html";
}

function deleteProduct(posCart) {
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  cartLocal.splice(posCart, 1);
  localStorage.setItem("cart", JSON.stringify(cartLocal));
  populateCart();
}

function checkForChanges() {
  let myModalBootstrap = new bootstrap.Modal(
    document.getElementById("cartModal")
  );
  let modalTitle = document.querySelector(".modal-title");
  let modalContent = document.querySelector(".modal-body");
  let checkoutBtn = document.querySelector("input[value='Checkout']");
  console.log(soldOff);
  if (soldOff.length > 0) {
    modalTitle.innerHTML = "Stoc insuficient pentru urmatoarele produse";
    let str = "";
    for (let productIdx of soldOff) {
      str += `<div class="text-danger">${state.db[productIdx].name} - Stoc: ${state.db[productIdx].stoc}</div>`;
    }
    modalContent.innerHTML = str;
    str = "";
    modalContent.insertAdjacentHTML(
      "beforeend",
      "<br>Pentru a finaliza comanda ajustati cantitatea sau eliminati produsul din cos"
    );
    checkoutBtn.setAttribute("disabled", "");
    myModalBootstrap.show();
  }
  if (soldOff.length > 0) {
  } else {
    checkoutBtn.removeAttribute("disabled");
  }
}
