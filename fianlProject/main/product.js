let id = window.location.search.substring(4);

async function populateProductPage() {
  loader();
  await getData();
  loader();
  // Populate Carousel
  let carousel = document.querySelector(".carousel-inner");
  let productImgArr = state.db[id].img;
  let str = "";
  for (let i = 0; i < productImgArr.length; i++) {
    if (productImgArr[i] === "") {
      continue;
    } else {
      str += ` <div class="carousel-item${i === 0 ? " active" : ""} ">
                    <img src="${
                      productImgArr[i]
                    }" style="max-width: 500px;" class="d-block mx-auto w-100" alt="...">
                </div>`;
    }
  }
  carousel.innerHTML = str;
  // Populate product description
  let title = document.querySelector(".title-price>h1");
  let price = document.querySelector(".title-price>p");
  let stoc = document.querySelector(".stocQuantity");
  let productObj = state.db[id];

  title.innerHTML = productObj.name;
  price.innerHTML = productObj.price + " RON"; // html sa fie span
  stoc.innerHTML = productObj.stoc;

  let addToCartBtn = document.querySelector(".addToCart");
  let addToFavBtn = document.querySelector(".addToFavorites");
  addToCartBtn.setAttribute(
    "onclick",
    `addToLocal('${id}','cart'); updateBadges();`
  );
  productObj.stoc === "0" ? addToCartBtn.setAttribute("disabled", "") : "";
  addToFavBtn.setAttribute(
    "onclick",
    `addToLocal('${id}','favorites'); updateBadges();`
  );
}
