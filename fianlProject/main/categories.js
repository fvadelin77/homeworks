let mapped = [];
let totalProducts = 0;

async function drawCategory(currentPage) {
  await getData();
  let productsGrid = document.getElementById("products-grid");
  let str = "";

  // afisarea continutului in functie de pagina
  // conditie pentru apelarea functiei pe onload, fara argument => pag. 1
  currentPage = currentPage === undefined ? 1 : currentPage;
  //   drawPaginationCategory(currentPage);

  let len = window.location.search.substring(7);
  let targetCategory = window.location.search.substring(7, len.length * 2);
  console.log(targetCategory);

  for (let [key, value] of Object.entries(state.db)) {
    if (value.category.includes(targetCategory)) {
      mapped.push(value);
    }
  }
  console.log(mapped);

  for (let [key, value] of Object.entries(state.db)) {
    if (value.category.includes(targetCategory)) {
      str += `
              <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3 product-img">
              
                  <div class="product-card p-1 p-md-4 img-thumbnail position-relative pb-3">
                  <i class=" p-1 px-2 favorites-btn bi bi-heart link-danger position-absolute fs-3 fs-md-6"  onclick="addToLocal('${key}','favorites'); updateBadges();">
                            </i>
                      <img src="${
                        value.img[0]
                      }" alt="" style="object-fit = cover;" onclick="window.location='product.html?id=${key}'" style="cursor: pointer;"/>
                      <div class="title-price d-flex flex-column justify-content-start gap-3 align-items-center" onclick="window.location='product.html?id=${key}'" style="cursor: pointer;">
                        <div class="product-price fs-6 fw-normal">${
                          value.price
                        } RON</div>
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
                              ${
                                value.stoc <= 0
                                  ? "Stoc epuizat"
                                  : "Adauga in cos"
                              }
                              </span>
                          </button>
                      </div>
                  </div>
              </div>
  `;
    } else continue;
  }
  productsGrid.innerHTML = str;
  updateBadges();
}

// let mapped = state.db.map(function (x) {
//   if (x.category.includes(targetCategory)) {
//     return x;
//   }
// });
// for (let i = 0; i < mapped.length; i++) {
//   if (mapped[i] !== undefined) {
//     mappedTrim.push(mapped[i]);
//   }
// }

//   for (let i = 0; i < mappedTrim.length; i++) {
//     let product = mappedTrim[i];
//     if (product.category.includes(targetCategory)) {
//       str += `
//               <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3 product-img">

//                   <div class="product-card p-4 img-thumbnail"">
//                       <img src="${product.img[0]}" alt="" style="object-fit = cover;" onclick="window.location='product.html?id=${i}'" style="cursor: pointer;"/>
//                       <div class="title-price d-flex flex-column justify-content-start gap-3 align-items-center" onclick="window.location='product.html?id=${i}'" style="cursor: pointer;">
//                           <h6 class="product-price"><b>${product.price} RON</b></h6>
//                           <h5 class="product-title">${product.name}</h5>
//                       </div>
//                       <div class="btns">
//                           <button class="btn btn-danger" onclick="addToLocal('${product.id}','favorites'); updateBadges();">
//                               <i class="bi bi-heart link-light"></i>
//                           </button>
//                           <button class="btn btn-primary" onclick="addToLocal('${product.id}','cart'); updateBadges();">
//                               <i class="bi bi-cart link-light"></i>
//                           </button>
//                       </div>
//                   </div>
//               </div>
//   `;
//     } else continue;
//   }
//   productsGrid.innerHTML = str;
//   updateBadges();
// }
