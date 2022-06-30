"use strict";

let state = {};

async function getData() {
  loader();
  let response = await fetch(
    "https://webstore-a2c89-default-rtdb.europe-west1.firebasedatabase.app/" +
      ".json"
  );
  state.db = await response.json();
  loader();
}

async function draw(currentPage) {
  loader();
  await getData();
  loader();
  let productsGrid = document.getElementById("products-grid");
  let str = "";

  // afisarea continutului in functie de pagina
  // conditie pentru apelarea functiei pe onload, fara argument => pag. 1
  currentPage = currentPage === undefined ? 1 : currentPage;
  drawPagination(currentPage);
  let counter = 0;
  for (let [key, value] of Object.entries(state.db)) {
    counter++;
    if (counter >= currentPage * 24 && counter < (currentPage + 1) * 24) {
      str += `
      <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3 product-img">
        <div class="product-card p-1 p-md-4 img-thumbnail position-relative pb-3">
          <i class=" p-1 px-2 favorites-btn bi bi-heart 
          link-danger position-absolute 
          fs-3 fs-md-6"  
          onclick="addToLocal('${key}','favorites'); updateBadges();">
          </i>
          <img src="${
            value.img[0]
          }" alt="" style="object-fit = cover;" onclick="window.location='product.html?id=${key}'" style="cursor: pointer;"/>
          <div class="title-price d-flex flex-column justify-content-start gap-3 align-items-center" onclick="window.location='product.html?id=${key}'" style="cursor: pointer;">
            <div class="product-price fs-6 fw-normal">${value.price} RON</div>
              <div class="product-title text-center fs-6 fw-lighter">${
                value.name
              }</div>
          </div>
            <div class="btns">      
              <button class="btn ${
                value.stoc <= 0 ? "btn-warning" : "btn-primary"
              } btn-primary p-1" ${
        value.stoc <= 0 ? "disabled" : ""
      } onclick="addToLocal('${key}','cart'); updateBadges();">
                <i class="bi bi-cart link-light fs-6"></i>
                <span class="fw-lighter">
                  ${value.stoc <= 0 ? "Stoc epuizat" : "Adauga in cos"}
                </span>
              </button>
            </div>
          </div>
      </div>
`;
    }
  }

  productsGrid.innerHTML = str;
  updateBadges();
}

function drawPagination(currentPage) {
  let pagination = document.querySelector("ul.pagination");
  // check no of total products
  state.totalProducts = Object.keys(state.db).length;
  let totalPages = Math.floor(state.totalProducts / 24);
  let str = "";
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      str += `<li class="page-item active numeric">
                    <a class="page-link" onclick="draw(${i});"href="#">${i}</a>
                </li>`;
    } else {
      str += `<li class="page-item numeric">
            <a class="page-link" onclick="draw(${i});"href="#">${i}</a>
        </li>`;
    }
  }
  pagination.innerHTML = `<li class="page-item">
        <a class="page-link" href="#" aria-label="First" onclick="draw(1)">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
        ${str}
    <li class="page-item">
        <a class="page-link" href="#" aria-label="Last" onclick="draw(${totalPages})">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
                        `;
}
