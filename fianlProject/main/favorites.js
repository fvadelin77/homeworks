function populateFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  let tbody = document.querySelector("tbody");
  let str = "";
  if (favorites === null || favorites.length === 0) {
    str = `
          <tr>
              <td colspan="6"><div class="fs-5 fw-light">Lista favorite goala!</div></td>
          </tr>           
        `;
  } else {
    for (let i = 0; i < favorites.length; i++) {
      str += `
          <tr>
              <th scope="row">${i + 1}</th>
              <td>
                  <img class="favorites-img" src="${
                    favorites[i].product.img[0]
                  }"/>
              </td>
              <td><a class="link-dark text-decoration-none" href="product.html?id=${
                favorites[i].dbIdx
              }">${favorites[i].product.name}</a></td>
              <td>${favorites[i].product.price} RON</td>
              <td>
                  <button class="btn px-2 py-1" onclick="deleteFavoritesItem(${i}); updateBadges();">
                      <i class="bi bi-x-circle-fill link-danger"></i>
                  </button>
              </td>
          </tr>           
      
      `;
    }
  }

  tbody.innerHTML = str;
  updateBadges();
}

function deleteFavoritesItem(posFavorites) {
  let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
  favoritesLocal.splice(posFavorites, 1);
  localStorage.setItem("favorites", JSON.stringify(favoritesLocal));
  populateFavorites();
}
