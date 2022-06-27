async function drawCategory(currentPage) {
  loader();
  await getData();

  let productsGrid = document.getElementById("products-grid");
  let str = "";
  let reversedObj = Object.keys(state.db).reverse();
  for (let i = 0; i <= 24; i++) {
    str += `
                <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3 product-img">
                
                    <div class="product-card p-1 p-md-4 img-thumbnail position-relative pb-3">
                    
                          <i class="bi bi-heart favorite-btn position-absolute link-danger position-absolute fs-3 fs-md-6" onclick="addToLocal('${
                            reversedObj[i]
                          }','favorites'); updateBadges();"></i>
                    
                        <img src="${
                          state.db[reversedObj[i]].img[0]
                        }" alt="" style="object-fit = cover;" onclick="window.location='product.html?id=${
      reversedObj[i]
    }'" style="cursor: pointer;"/>
                        <div class="title-price d-flex flex-column justify-content-start gap-3 align-items-center" onclick="window.location='product.html?id=${
                          reversedObj[i]
                        }'" style="cursor: pointer;">
                            <div class="product-price fs-6 fw-normal">${
                              state.db[reversedObj[i]].price
                            } RON</div>
                            <h5 class="product-title text-center fs-6 fw-lighter">${
                              state.db[reversedObj[i]].name
                            }</h5>
                        </div>
                        <div class="btns">
                            
                            <button class="btn ${
                              state.db[reversedObj[i]].stoc <= 0
                                ? "btn-warning"
                                : "btn-primary"
                            } btn-primary p-1" ${
      state.db[reversedObj[i]].stoc <= 0 ? "disabled" : ""
    } onclick="addToLocal('${reversedObj[i]}','cart'); updateBadges();">
                                <i class="bi bi-cart link-light"></i>
                                ${
                                  state.db[reversedObj[i]].stoc <= 0
                                    ? "Stoc epuizat"
                                    : "Adauga in cos"
                                }
                            </button>
                            
                        </div>
                    </div>
                </div>
    `;
  }
  productsGrid.innerHTML = str;
  updateBadges();
  loader();
}
