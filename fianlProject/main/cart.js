function populateCart() {
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
  } else {
    for (let i = 0; i < cart.length; i++) {
      str += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>
                <img class="cart-img" src="${cart[i].product.img[0]}"/>
            </td>
            <td><a class="link-dark" href="product.html?id=${cart[i].dbIdx}">${
        cart[i].product.name
      }</a></td>
            <td>${cart[i].product.price} RON</td>
            <td>
                <input type="number" value="${
                  cart[i].quantity
                }" min="0" max="100"/>
            </td>
            <td>${cart[i].product.price * cart[i].quantity} RON</td>
            <td>
                <button class="btn px-2 py-1" onclick="deleteProduct(${i}); updateBadges();">
                    <i class="bi bi-x-circle-fill link-danger"></i>
                </button>
            </td>
        </tr>           
    
    `;
      total += cart[i].product.price * cart[i].quantity;
    }
  }

  tbody.innerHTML = str;

  // Update total
  document.querySelector(".order-total").innerHTML = `
  <div><h5>Total cos: ${total} RON </h5></div>
  `;

  // Update summary
  let summary = document.querySelector(".cart-summary > tbody");
  console.log(cart);
  summary.innerHTML = `
  <tr>
              <th scope="row">Total cos</th>
              <td>${total} RON</td>
            </tr>
            <tr>
              <th scope="row">Transport curier</th>
              <td>${(transport =
                // lazy
                cart === null || cart.length === 0 ? 0 : 20)} RON</td>
            </tr>
            <tr>
              <th scope="row"><h5>Total final</h5></th>
              <td><h5>${total + transport} RON</h5></td>
            </tr>

  `;
  updateBadges();
}

function updateCart() {
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  let qInput = document.querySelectorAll("input[type='number']");
  // Check daca intre timp, pe pagina de produse, s-a adaugat un produs in plus
  console.log(cartLocal.length, qInput.length);
  if (cartLocal.length !== qInput.length) {
    populateCart();
    /////// softbug - q change + newproduct added -> actualizeaza cos
  }
  qInput = document.querySelectorAll("input[type='number']");

  for (let i = 0; i < cartLocal.length; i++) {
    if (qInput[i].value !== cartLocal[i].quantity) {
      if (qInput[i].value === "0") {
        cartLocal.splice(i, 1);
        // small bug - q = 1 > delete > cosul ramane cu badge "1"
      } else {
        cartLocal[i].quantity = qInput[i].value;
      }
    }
  }
  localStorage.setItem("cart", JSON.stringify(cartLocal));
  populateCart();
}

function deleteProduct(posCart) {
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  cartLocal.splice(posCart, 1);
  localStorage.setItem("cart", JSON.stringify(cartLocal));
  populateCart();
}
