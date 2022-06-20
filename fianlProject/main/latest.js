async function drawCategory(currentPage) {
  await getData();
  let productsGrid = document.getElementById("products-grid");
  let str = "";
  let reversedObj = Object.keys(state.db).reverse();
  for (let i = 0; i <= 24; i++) {
    str += `
                <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3 product-img">
                
                    <div class="product-card p-4 img-thumbnail"">
                        <img src="${
                          state.db[reversedObj[i]].img[0]
                        }" alt="" style="object-fit = cover;" onclick="window.location='product.html?id=${
      reversedObj[i]
    }'" style="cursor: pointer;"/>
                        <div class="title-price d-flex flex-column justify-content-start gap-3 align-items-center" onclick="window.location='product.html?id=${
                          reversedObj[i]
                        }'" style="cursor: pointer;">
                            <h6 class="product-price"><b>${
                              state.db[reversedObj[i]].price
                            } RON</b></h6>
                            <h5 class="product-title text-center">${
                              state.db[reversedObj[i]].name
                            }</h5>
                        </div>
                        <div class="btns">
                            <button class="btn btn-danger" onclick="addToLocal('${
                              reversedObj[i]
                            }','favorites'); updateBadges();">
                                <i class="bi bi-heart link-light"></i>
                            </button>
                            <button class="btn btn-primary" onclick="addToLocal('${
                              reversedObj[i]
                            }','cart'); updateBadges();">
                                <i class="bi bi-cart link-light"></i>
                            </button>
                        </div>
                    </div>
                </div>
    `;
  }
  productsGrid.innerHTML = str;
  updateBadges();
}
