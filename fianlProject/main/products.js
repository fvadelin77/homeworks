"use strict";

let state = {};

async function getData() {
  let response = await fetch(
    "https://webstore-a2c89-default-rtdb.europe-west1.firebasedatabase.app/" +
      ".json"
  );
  state.db = await response.json();
}

async function draw(currentPage) {
  await getData();
  let productsGrid = document.getElementById("products-grid");
  let str = "";

  // afisarea continutului in functie de pagina
  // conditie pentru apelarea functiei pe onload, fara argument => pag. 1
  currentPage = currentPage === undefined ? 1 : currentPage;
  drawPagination(currentPage);
  // let counter = 0;
  for (let [key, value] of Object.entries(state.db)) {
    // counter += 1;
    // console.log(counter, key);
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
                        ${value.stoc <= 0 ? "Stoc epuizat" : "Adauga in cos"}
                      </span>
                    </button>
                  </div>
                </div>
            </div>
`;
  }
  productsGrid.innerHTML = str;
  updateBadges();
}

function drawPagination(currentPage) {
  let pagination = document.querySelector("ul.pagination");
  // check nr of total products
  state.totalProducts = Object.keys(state.db).length;
  console.log(state.totalProducts);
  console.log(state.db);
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

// functie care returneaza buton active sau disabled, in functie de stocul produsului

let obj = [
  {
    id: "J5013614",
    name: "Ochelari Julbo Camino Reactiv 2-4",
    category: ["drumetie", "ochelari"],
    price: "795",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Julbo-camino-reactiv-2-4-black-grey.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Julbo-camino-reactiv-2-4-black-grey-3.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Julbo-camino-reactiv-2-4-black-grey-4.jpg",
    ],
  },
  {
    id: "J5473520",
    name: "Ochelari Julbo Ultimate Cover Reactiv 2-4",
    category: ["drumetie", "ochelari"],
    price: "931",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/julbo-ultimate-cover-reactiv-2-4-DL-silver-grey-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/julbo-ultimate-cover-reactiv-2-4-DL-silver-grey-1.jpg",
    ],
  },
  {
    id: "J5473420",
    name: "Ochelari Julbo Ultimate Cover Reactiv 1-3 HC",
    category: ["drumetie", "ochelari"],
    price: "931",
    stoc: "1",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/julbo-Ultimate-Cover-reactiv-1-3_HC-grey-blue-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/julbo-Ultimate-Cover-reactiv-1-3_HC-grey-blue-3.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/julbo-Ultimate-Cover-reactiv-1-3_HC-grey-blue-5.jpg",
    ],
  },
  {
    id: "60004-00002",
    name: "Ochelari ciclism 100% Racetrap 3.0",
    category: ["drumetie", "ochelari"],
    price: "622",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/04/100-percent-RACETRAP-3.0-Gloss-black-smoke-lens.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/100-percent-RACETRAP-3.0-Gloss-black-smoke-lens-1-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/100-percent-RACETRAP-3.0-Gloss-black-smoke-lens-2.jpg",
    ],
  },
  {
    id: "J5311123",
    name: "Ochelari de ciclism Julbo Fury Spectron 3CF Black/Pink",
    category: ["drumetie", "ochelari"],
    price: "450",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/JULBO_FURY_SPECTRON_3CF_-_BLACK___PINK.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/JULBO_FURY_SPECTRON_3CF_-_BLACK___PINK1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/JULBO_FURY_SPECTRON_3CF_-_BLACK___PINK2.jpg",
    ],
  },
  {
    id: "J5343414",
    name: "Ochelari Julbo Rush Reactiv Performance 1-3 HC Black/Black",
    category: ["drumetie", "ochelari"],
    price: "399",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Okulary_JULBO_RUSH_RECATIV_PERFORMANCE_1-3___NOIR-_NOIR11.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Okulary_JULBO_RUSH_RECATIV_PERFORMANCE_1-3___NOIR-_NOIR2.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Okulary_JULBO_RUSH_RECATIV_PERFORMANCE_1-3___NOIR-_NOIR.jpg",
    ],
  },
  {
    id: "852RWWB",
    name: "Ochelari ciclism Salice 852 RW",
    category: ["drumetie", "ochelari"],
    price: "336",
    stoc: "6",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/okuliare-salice-852RW.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/01/okuliare-salice-852RW.jpg",
    ],
  },
  {
    id: "016RWXBY",
    name: "Ochelari ciclism Salice 016 + Sticlă fotocromatică",
    category: ["drumetie", "ochelari"],
    price: "589",
    stoc: "8",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/016rw_salice-black-yellow-.jpg",
    ],
  },
  {
    id: "015CRXWBL",
    name: "Ochelari de drumeție Salice 015 + sticlă fotocromatică",
    category: ["drumetie", "ochelari"],
    price: "322",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/Cyklistick%C3%A9-okuliare-Salice-015-White-CRX-Blue.jpg",
    ],
  },
  {
    id: "004RWXC",
    name: "Ochelari ciclism Salice 004 + Sticlă fotocromatică",
    category: ["drumetie", "ochelari"],
    price: "398",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/Cyklistick%C3%A9-okuliare-Salice-004-White-RW-Blue.jpg",
      "",
      "",
    ],
  },
  {
    id: "J0101150",
    name: "Ochelari Julbo VERMONT CLASSIC Brass/Brown Spectron3CF",
    category: ["drumetie", "ochelari"],
    price: "615",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_VERMONT_CLASSIC_Spectron3CF_-_BRASS___BROWN_-1-1024x1024.jpg",
      "",
      "",
    ],
  },
  {
    id: "J0201256",
    name: "Ochelari Julbo CHAM Silver/Black Spectron 4 ",
    category: ["drumetie", "ochelari"],
    price: "615",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_CHAM_Spectron_4_-_SILVER___BLACK_-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_CHAM_Spectron_4_-_SILVER___BLACK_1-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_CHAM_Spectron_4_-_SILVER___BLACK_2-1024x1024.jpg",
    ],
  },
  {
    id: "J5011214",
    name: "Ochelari Julbo CAMINO Black Spectron 4",
    category: ["drumetie", "ochelari"],
    price: "319",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_CAMINO_Spectron_4_-_Black-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_CAMINO_Spectron_4_-_Black2-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_CAMINO_Spectron_4_-_Black3-1024x1024.jpg",
    ],
  },
  {
    id: "J5061114",
    name: "Ochelari Julbo SHIELD Black/Blue Spectron 3CF",
    category: ["drumetie", "ochelari"],
    price: "455",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_SHIELD_Spectron_3CF_-_Black___Blue-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_SHIELD_Spectron_3CF_-_Black___Blue1-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_SHIELD_Spectron_3CF_-_Black___Blue2-1024x1024.jpg",
    ],
  },
  {
    id: "J5411237",
    name: "Ochelari Julbo Montebianco 2 Blue/Orange Spectron 4",
    category: ["drumetie", "ochelari"],
    price: "364",
    stoc: "1",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_MONTEBIANCO_2_blue_orange_spectron_4-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_MONTEBIANCO_2_blue_orange_spectron_4_-1-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Julbo_MONTEBIANCO_2_blue_orange_spectron_4_-2-1024x1024.jpg",
    ],
  },
  {
    id: "022 RWX BW",
    name: "Ochelari ciclism Salice 022 + Sticlă fotocromatică",
    category: ["drumetie", "ochelari"],
    price: "561",
    stoc: "7",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Salice-022-RW.jpg",
      "",
      "",
    ],
  },
  {
    id: "001 RW WR",
    name: "Ochelari de drumeție Salice 001",
    category: ["drumetie", "ochelari"],
    price: "301",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/Cyklistick%C3%A9-okuliare-Salice-001-White-RW-Red.jpg",
      "",
      "",
    ],
  },
  {
    id: "016 RWX WR",
    name: "Ochelari ciclism Salice 016 + Sticlă fotocromatică",
    category: ["drumetie", "ochelari"],
    price: "589",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/05/Cyklistick%C3%A9-okuliare-Salice-016-White-CRX-Red-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2019/05/Cyklistick%C3%A9-okuliare-Salice-016-1024x192.png",
      "",
    ],
  },
  {
    id: "011 RW BS",
    name: "Ochelari ciclism Salice 011",
    category: ["drumetie", "ochelari"],
    price: "311",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/Cyklistick%C3%A9-okuliare-Salice-011-Black-RW-Red.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2019/05/Cyklistick%C3%A9-okuliare-Salice-011-Black-CRX-1-1024x192.png",
      "",
    ],
  },
  {
    id: "015 RW WR021 RWX BR",
    name: "Ochelari ciclism Salice 021 + Sticlă fotocromatică",
    category: ["drumetie", "ochelari"],
    price: "537",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/05/Cyklistick%C3%A9-okuliare-Salice-021-4.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2019/05/Cyklistick%C3%A9-okuliare-Salice-021-3.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2019/05/Cyklistick%C3%A9-okuliare-Salice-021-1.jpg",
    ],
  },
  {
    id: "015 RW WR",
    name: "Ochelari de drumeție Salice 015",
    category: ["drumetie", "ochelari"],
    price: "489",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/Cyklistick%C3%A9-okuliare-Salice-015-White-CRX-Red.jpg",
      "",
      "",
    ],
  },
  {
    id: "015 RW GBL",
    name: "Ochelari de drumeție Salice 015",
    category: ["drumetie", "ochelari"],
    price: "489",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/Cyklistick%C3%A9-okuliare-Salice-015-Green-CRX-Blue.jpg",
      "",
      "",
    ],
  },
  {
    id: "J01020125",
    name: "Ochelari Julbo Vermont Silver/Black Spectron4",
    category: ["drumetie", "ochelari"],
    price: "528",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_Vermont_Silver_Black_-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_Vermont_Silver_Black_-1-1024x1024.jpg",
      "",
    ],
  },
  {
    id: "J0209050",
    name: "Ochelari Julbo CHAM Brass Polarized3+",
    category: ["drumetie", "ochelari"],
    price: "662",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_CHAM_Brass-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_CHAM_Brass2-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_CHAM_Brass1-1024x1024.jpg",
    ],
  },
  {
    id: "J5461114",
    name: "Ochelari Julbo Ultimate Black/Green Spectron 3",
    category: ["drumetie", "ochelari"],
    price: "456",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Julbo-Ultimate-Spectrum-3-CF--1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Julbo-Ultimate-Spectrum-3-CF-_1-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Julbo-Ultimate-Spectrum-3-CF_2-1024x1024.jpg",
    ],
  },
  {
    id: "J5311111",
    name: "Ochelari Julbo Fury White/Blue Spectron 3",
    category: ["drumetie", "ochelari"],
    price: "441",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_FURY_White_Blue.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_FURY_White_Blue1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_FURY_White_Blue2.jpg",
    ],
  },
  {
    id: "J534 3314",
    name: "Ochelari Julbo Rush Black/Red Reactiv Performance 1-3",
    category: ["drumetie", "ochelari"],
    price: "931",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_Rush_Black_Red.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_Rush_Black_Red1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_Rush_Black_Red2.jpg",
    ],
  },
  {
    id: "J4833312",
    name: "Ochelari Julbo Aero Blue/Dark Blue Reactiv Performance 1-3",
    category: ["drumetie", "ochelari"],
    price: "753",
    stoc: "6",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_AERO_Blue_Dark_blue-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_AERO_Blue_Dark_blue2-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_AERO_Blue_Dark_blue1-1024x1024.jpg",
    ],
  },
  {
    id: "J483 1114",
    name: "Ochelari Julbo Aero Black/Red Spectron 3 CF",
    category: ["drumetie", "ochelari"],
    price: "398",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_AERO_Black_Red-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_AERO_Black_Red2-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_AERO_Black_Red1-1024x1024.jpg",
    ],
  },
  {
    id: "J5463314",
    name: "Ochelari Julbo Ultimate Black/Red Reactiv Performance 1-3",
    category: ["drumetie", "ochelari"],
    price: "931",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_ULTIMATE_Black_Red.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_ULTIMATE_Black_Red1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_ULTIMATE_Black_Red2.jpg",
    ],
  },
  {
    id: "J5011151",
    name: "Ochelari Julbo Camino Brown/Black Spectron 3 CF",
    category: ["drumetie", "ochelari"],
    price: "312",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_CAMINO_Brown_Black1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_CAMINO_Brown_Black_4.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_CAMINO_Brown_Black_.jpg",
    ],
  },
  {
    id: "J5443114",
    name: "Ochelari Julbo Shield Black M",
    category: ["drumetie", "ochelari"],
    price: "705",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_SHIELD_black_1-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_SHIELD_black2-1-1024x1024.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Okuliare_Julbo_SHIELD_black1-1-1024x1024.jpg",
    ],
  },
  {
    id: "OO9290-05",
    name: "Ochelari Oakley Jawbreaker Crystal Pop",
    category: ["drumetie", "ochelari"],
    price: "816",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/11/Oakley-Jawbreaker_White_road1.png",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/Oakley-Jawbreaker_White_road3.png",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/Oakley-Jawbreaker_White_road4.png",
    ],
  },
  {
    id: "OO9208-05",
    name: "Ochelari Oakley Radar EV Path",
    category: ["drumetie", "ochelari"],
    price: "864",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/04/Oakley_Radar_Ev_Path_White_Road5.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/04/Oakley_Radar_Ev_Path_White_Road4.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/04/Oakley_Radar_Ev_Path_White_Road2.png",
    ],
  },
  {
    id: "OO9188-9459",
    name: "Ochelari Oakley Flak 2.0 XL",
    category: ["drumetie", "ochelari"],
    price: "768",
    stoc: "1",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/11/Oakley_Flak_2.0_XL-_009188-9459_2-1024x683.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/Oakley_Flak_2.0_XL-_009188-9459_1-1024x683.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/Oakley_Flak_2.0_XL-_009188-9459_3-1024x683.jpg",
    ],
  },
  {
    id: "OO9374-0363",
    name: "Ochelari Oakley Frogskins Lite",
    category: ["drumetie", "ochelari"],
    price: "576",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/11/OAKLEY_Frogskins_Lite_Mtt_Clear_w_Violet_Irid-scaled-1-1024x354.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/OAKLEY_Frogskins_Lite_Mtt_Clear_w_Violet_Irid4-1024x441.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/OAKLEY_Frogskins_Lite_MtBlk_MtClr_w_PRIZM_Spph7.jpeg",
    ],
  },
  {
    id: "OO9374-3263",
    name: "Ochelari Oakley Frogskins Lite",
    category: ["drumetie", "ochelari"],
    price: "624",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/11/OAKLEY_Frogskins_Lite_Ignite_PnkFdw_PRIZM_Blk2-1024x614.jpeg",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/OAKLEY_Frogskins_Lite_MtBlk_MtClr_w_PRIZM_Spph3-1024x614.jpeg",
      "https://outdoorlive.ro/wp-content/uploads/2020/11/OAKLEY_Frogskins_Lite_Ignite_PnkFdw_PRIZM_Blk4-1024x614.jpeg",
    ],
  },
  {
    id: "014 CRX",
    name: "Ochelari de drumeție Salice 014 Sticlă fotocromatică 2-4",
    category: ["drumetie", "ochelari"],
    price: "326",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/salice-014-CRX-yellow-brown.jpg",
      "",
      "",
    ],
  },
  {
    id: "006 ITA RWX B",
    name: "Ochelari ciclism Salice 006 ITA+ Sticlă fotocromatică",
    category: ["drumetie", "ochelari"],
    price: "431",
    stoc: "1",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/06/Salice-006-ITA-RWX-BLACK-TRANSPARENT-CAT-1-3.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD4000420000ALL1",
    name: "Colțari turistici Black Diamond Serac Crampons Clip",
    category: ["drumetie", "coltari"],
    price: "672",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Black_Diamond_SERAC_CRAMPONS1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Black_Diamond_SERAC_CRAMPONS1-1.jpg",
      "",
    ],
  },
  {
    id: "BD4000410000ALL1",
    name: "Colțari turistici Black Diamond Serac Strap",
    category: ["drumetie", "coltari"],
    price: "621",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_SERAC_STRAP.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_SERAC_STRAP-1.jpg",
      "",
    ],
  },
  {
    id: "3I818C",
    name: "Colțari turistici CT Navis Flex Classic",
    category: ["drumetie", "coltari"],
    price: "328",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/CT-NEVIS-FLEX-3I818C-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/CT-NEVIS-FLEX-3I818C.png",
      "",
    ],
  },
  {
    id: "3I848D",
    name: "Colțari turistici CT Lycan Automatic",
    category: ["drumetie", "coltari"],
    price: "801",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/CT-LYCAN_AUTOMATIC-3I848D-1.png",
      "",
      "",
    ],
  },
  {
    id: "3123716-115",
    name: "Colțari Frendo Ice Light",
    category: ["drumetie", "coltari"],
    price: "172",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/frendo-ice-light-nesmeky.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/01/frendo-ice-light-nesmeky_1.jpg",
      "",
    ],
  },
  {
    id: "KSACNYL02",
    name: "Husă pentru colțari CT Crampon Bag",
    category: ["drumetie", "coltari"],
    price: "31",
    stoc: "11",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/CT-CRAMPON_BAG-KSACNYL02.jpg",
      "",
      "",
    ],
  },
  {
    id: "3838723436281",
    name: "Colțari Veriga Family Track pentru copii",
    category: ["drumetie", "coltari"],
    price: "158",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Veriga-family-track-kids-green.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Veriga-family-track-kids-green-1.jpg",
      "",
    ],
  },
  {
    id: "3838723436298",
    name: "Colțari Veriga Family Track",
    category: ["drumetie", "coltari"],
    price: "158",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Veriga-family-track-woman-pink.jpg",
      "",
      "",
    ],
  },
  {
    id: "2530-00071-0001",
    name: "Manșon pentru crampoane Mammut Crampon Pocket",
    category: ["drumetie", "coltari"],
    price: "144",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Mammut-crampon-pocket-black.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Mammut-crampon-pocket-black-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Mammut-crampon-pocket-black-2.jpg",
    ],
  },
  {
    id: "00812",
    name: "Colțari pentru turiști Salewa Alpinist Alu Combi",
    category: ["drumetie", "coltari"],
    price: "532",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Salewa-alpinist-alu-combi.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Salewa-alpinist-alu-combi-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Salewa-alpinist-alu-combi-2.jpg",
    ],
  },
  {
    id: "3838723279185",
    name: "Colțari Veriga City Track",
    category: ["drumetie", "coltari"],
    price: "72",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/veriga-city-track-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "3838723285681",
    name: "Colțari Veriga Ice Track",
    category: ["drumetie", "coltari"],
    price: "139",
    stoc: "13",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/vERIGA-ICE_TRACK.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/vERIGA-ICE_TRACK-2jpg.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/vERIGA-ICE_TRACK-3.jpg",
    ],
  },
  {
    id: "3838723331173",
    name: "Colțari Veriga Mount Track",
    category: ["drumetie", "coltari"],
    price: "163",
    stoc: "7",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Veriga-Mount-Track.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Veriga-Mount-Track-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Veriga-Mount-Track-2.jpg",
    ],
  },
  {
    id: "3I883A",
    name: "Colțari turistici CT Ice Semi-Automatic",
    category: ["drumetie", "coltari"],
    price: "489",
    stoc: "7",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-ICE_SEMIAUTOMATIC-3I883A-1.png",
      "",
      "",
    ],
  },
  {
    id: "829-113",
    name: "Colțari Salewa Mountain SPIKE CRAMPON",
    category: ["drumetie", "coltari"],
    price: "220",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/Nesmeky_MOUNTAIN_SPIKE_CRAMPON_black1-1024x1024.jpeg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/Nesmeky_MOUNTAIN_SPIKE_CRAMPON_black2-1024x1024.jpeg",
      "",
    ],
  },
  {
    id: "899",
    name: "Colțari turistici Salewa Alpinist Pro",
    category: ["drumetie", "coltari"],
    price: "796",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/Mac%CC%8Ckya_Salewa_ALPINIST_PRO_CRAMPON_blackyellow-1024x1024.jpeg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/Mac%CC%8Ckya_Salewa_ALPINIST_PRO_CRAMPON_blackyellow1-1024x1024.jpeg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/Mac%CC%8Ckya_Salewa_ALPINIST_PRO_CRAMPON_blackyellow3-1024x1024.jpeg",
    ],
  },
  {
    id: "T01A AS",
    name: "Pernițe Petzl Antisnow Leopard pentru colțarii Petzl LEOPARD FL și LEOPARD LLF",
    category: ["drumetie", "coltari"],
    price: "96",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/07/Petzl_Antisnow_Leopard-1024x1024.jpeg",
      "",
      "",
    ],
  },
  {
    id: "T24850",
    name: "Set colți frontali Petzl Lynx",
    category: ["drumetie", "coltari"],
    price: "240",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/06/petzl-lynx-front-point-kit-1024x1024.jpg",
      "",
      "",
    ],
  },
  {
    id: "T05A AS",
    name: "Plăcuțe colțari Petzl Antisnow Vasak / Sarken",
    category: ["drumetie", "coltari"],
    price: "94",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/04/petzl-antisnow-vasak-sarken-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "814-0999",
    name: "Colțari pentru turiști Salewa Alpinist Walk",
    category: ["drumetie", "coltari"],
    price: "490",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/03/Salewa-alpinist-walk-blue.png",
      "",
      "",
    ],
  },
  {
    id: "BD6206723002ALL1",
    name: "Lanternă frontală Black Diamond Spot 400 Headlamp",
    category: ["drumetie", "lanterna"],
    price: "192",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Black-diamond-spot-400-headlamp-dark-olive.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Black-diamond-spot-400-headlamp-dark-olive-1.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Black-diamond-spot-400-headlamp-dark-olive-2.webp",
    ],
  },
  {
    id: "BD6206726018ALL1",
    name: "Lanternă frontală Black Diamond Spot 400 Headlamp",
    category: ["drumetie", "lanterna"],
    price: "192",
    stoc: "19",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Black-diamond-spot-400-headlamp-bordeaux.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Black-diamond-spot-400-headlamp-bordeaux-1-1.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Black-diamond-spot-400-headlamp-bordeaux-2.webp",
    ],
  },
  {
    id: "BD6206718001ALL1",
    name: "Lanternă frontală Black Diamond Storm 450 Headlamp",
    category: ["drumetie", "lanterna"],
    price: "240",
    stoc: "18",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Black_Diamond_STORM_450_Octane.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Black_Diamond_STORM_450_Octane1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Black_Diamond_STORM_450_Octane2.jpg",
    ],
  },
  {
    id: "BD6206720004ALL1",
    name: "Lanternă frontală Black Diamond Spot 400 Headlamp",
    category: ["drumetie", "lanterna"],
    price: "192",
    stoc: "20",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black-Diamond-SPOT-400-Graphite.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black-Diamond-SPOT-400-Graphite21.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black-Diamond-SPOT-400-Graphite1.png",
    ],
  },
  {
    id: "BD6206728001ALL1",
    name: "Lanternă frontală Black Diamond Spot 400 Headlamp",
    category: ["drumetie", "lanterna"],
    price: "192",
    stoc: "16",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black-Diamond-SPOT-400-Octane.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black-Diamond-SPOT-400-Octane2.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black-Diamond-SPOT-400-Octane1.jpg",
    ],
  },
  {
    id: "BD6206784004ALL1",
    name: "Lanternă frontală Black Diamond Astro 300-R Headlamp",
    category: ["drumetie", "lanterna"],
    price: "144",
    stoc: "14",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/ASTRO_300-R_Azul_Azul1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/ASTRO_300-R_Azul_Azul2.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/ASTRO_300-R_Azul_Azul3.jpg",
    ],
  },
  {
    id: "E99ACA",
    name: "Acumulator Petzl Accu Core",
    category: ["drumetie", "lanterna"],
    price: "151",
    stoc: "15",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/E99ACA-CORE-focus-1_LowRes.jpg",
      "",
      "",
    ],
  },
  {
    id: "E810BA00",
    name: "Acumulator Petzl Accu Swift RL PRO",
    category: ["drumetie", "lanterna"],
    price: "254",
    stoc: "24",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/E810BA00-ACCU-SWIFT-RL-PRO-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "E093DA00",
    name: "Husă transparentă Petzl Noctilight",
    category: ["drumetie", "lanterna"],
    price: "88",
    stoc: "8",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/E093DA00-NOCTILIGHT-petzl.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/E093DA00-NOCTILIGHT-petzl-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/E093DA00-NOCTILIGHT-petzl-3.jpg",
    ],
  },
  {
    id: "E000BA00",
    name: "Cleme pentu lanterna frontală Petzl Uni Adapt",
    category: ["drumetie", "lanterna"],
    price: "50",
    stoc: "40",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/petzl-uni-adapt-4-units.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/petzl-uni-adapt-4-units-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/petzl-uni-adapt-4-units-2.jpg",
    ],
  },
  {
    id: "BD6206648001ALL1",
    name: "Lanternă frontală Black Diamond Flare Headlamp",
    category: ["drumetie", "lanterna"],
    price: "151",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/BLACK_DIAMOND_FLARE_HEADLAMP_OCTANE_C%CC%8CELOVKA_.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/BLACK_DIAMOND_FLARE_HEADLAMP_OCTANE_C%CC%8CELOVKA_1.jpg",
      "",
    ],
  },
  {
    id: "BD6206640004ALL1",
    name: "Lanternă frontală Black Diamond Flare Headlamp",
    category: ["drumetie", "lanterna"],
    price: "112",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/BLACK_DIAMOND_FLARE_HEADLAMP_GRAPHITE_C%CC%8CELOVKA_.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/BLACK_DIAMOND_FLARE_HEADLAMP_GRAPHITE_C%CC%8CELOVKA_1.jpg",
      "",
    ],
  },
  {
    id: "BD6206631001ALL1",
    name: "Lanternă frontală Black Diamond Onsight",
    category: ["drumetie", "lanterna"],
    price: "274",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_Onsight_375_aluminium-1-1024x1024.jpg",
      "",
      "",
    ],
  },
  {
    id: "010-02564-00",
    name: "Smartwatch Garmin Instinct® ​2S Solar",
    category: ["ceasuri"],
    price: "2160",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Instinct_2S_Solar_graphite3.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Instinct_2S_Solar_graphite4.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Instinct_2S_Solar_graphite11.webp",
    ],
  },
  {
    id: "010-02496-12",
    name: "Smartwatch Garmin Venu 2 Plus",
    category: ["ceasuri"],
    price: "2160",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Venu_2_PLUS_Cream_Gold_Ivory3.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Venu_2_PLUS_Cream_Gold_Ivory6.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Venu_2_PLUS_Cream_Gold_Ivory7.webp",
    ],
  },
  {
    id: "010-02539-03",
    name: "Smartwatch Garmin Fenix 7S",
    category: ["ceasuri"],
    price: "3360",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Fenix_7S_Silver_Whitestone_Band1-1024x1024-1.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Fenix_7S_Silver_Whitestone_Band4-1024x1024-1.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Fenix_7S_Silver_Whitestone_Band2-1024x1024-1.webp",
    ],
  },
  {
    id: "010-02539-11",
    name: "Smartwatch Garmin Fenix 7S Solar",
    category: ["ceasuri"],
    price: "3840",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_fenix_7s_PRO_Solar_rose_Gold__Sand_Silicone_Band.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_fenix_7s_PRO_Solar_rose_Gold__Sand_Silicone_Band_6.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_fenix_7s_PRO_Solar_rose_Gold__Sand_Silicone_Band_7.webp",
    ],
  },
  {
    id: "010-02120-30",
    name: "Smartwatch Garmin Forerunner 245 Music",
    category: ["ceasuri"],
    price: "1680",
    stoc: "6",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Forerunner_245_Music_Black6.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Forerunner_245_Music_Black7.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin_Forerunner_245_Music_Black2.webp",
    ],
  },
  {
    id: "010-02172-13",
    name: "Smartwatch Garmin vívoactive 4S",
    category: ["ceasuri"],
    price: "1440",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/GPS-hodinky-Garmin-vi%CC%81voactive-4S.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/GPS-hodinky-Garmin-vi%CC%81voactive-4S2.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/GPS-hodinky-Garmin-vi%CC%81voactive-4S3.webp",
    ],
  },
  {
    id: "010-02172-33",
    name: "Smartwatch Garmin vívoactive 4S",
    category: ["ceasuri"],
    price: "1440",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin-Vivoactive-4S-dust-rose-light-gold.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin-Vivoactive-4S-dust-rose-light-gold8.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin-Vivoactive-4S-dust-rose-light-gold21.webp",
    ],
  },
  {
    id: "010-01847-11",
    name: "Garmin vívofit4 (S-M)",
    category: ["ceasuri"],
    price: "384",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin-Vivofit-4_white.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin-Vivofit-4_white2.webp",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Garmin-Vivofit-4_white4.webp",
    ],
  },
  {
    id: "010-02375-00",
    name: "Garmin Varia RTL515 cu Radar",
    category: ["ceasuri"],
    price: "960",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/garmin-varia-cyklo-radar-rtl515-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/garmin-varia-cyklo-radar-rtl515-6.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/garmin-varia-cyklo-radar-rtl515-8.jpg",
    ],
  },
  {
    id: "010-02582-11",
    name: "Smartwatch Garmin Epix Gen 2 Carbon Gray DLC",
    category: ["ceasuri"],
    price: "4800",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Garmin_EPIX_Gen_2_Sapphire_Black_Carbone_Gray_DLC_Titanium.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Garmin_EPIX_Gen_2_Sapphire_Black_Carbone_Gray_DLC_Titanium6.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Garmin_EPIX_Gen_2_Sapphire_Black_Carbone_Gray_DLC_Titanium3.jpg",
    ],
  },
  {
    id: "9001100002",
    name: "Plasă pentru cască Ortovox Helmet Net",
    category: ["alpinism", "casti"],
    price: "49",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Ortovox_Helmet_Net_black-scaled.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Ortovox_Helmet_Net_black-scaled.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Ortovox_Helmet_Net_black3-scaled.jpg",
    ],
  },
  {
    id: "2030-00300-0051",
    name: "Cască Mammut Skywalker 3.0",
    category: ["alpinism", "casti"],
    price: "234",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut-Skywalker-3.0-Helmet-titanium2-scaled.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut-Skywalker-3.0-Helmet-detail.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut-Skywalker-3.0-Helmet-detail2-scaled.jpg",
    ],
  },
  {
    id: "2030-00300-5367",
    name: "Cască Mammut Skywalker 3.0",
    category: ["alpinism", "casti"],
    price: "234",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut_Skywalker_3.0_Helmet_purple2-scaled.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut-Skywalker-3.0-Helmet-detail.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut-Skywalker-3.0-Helmet-detail2-scaled.jpg",
    ],
  },
  {
    id: "002243-0130",
    name: "Cască alpinism Salewa Toxo 3.0 Helmet",
    category: ["alpinism", "casti"],
    price: "201",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Salewa-toxo-3.0-helmet-green.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD620208ALUMS_M1",
    name: "Cască de damă Black Diamond Half Dome Women",
    category: ["alpinism", "casti"],
    price: "249",
    stoc: "6",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_HALF_DOME_WOMEN_Aluminium.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD620208CSPNS_M1",
    name: "Cască de damă Black Diamond Half Dome Women",
    category: ["alpinism", "casti"],
    price: "249",
    stoc: "7",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_HALF_DOME_WOMEN_Caspian.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD620209SLATS_M1",
    name: "Cască pentru alpinism și escaladă Black Diamond Half Dome Helmet",
    category: ["alpinism", "casti"],
    price: "249",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_HALF_DOME_HELMET_Slate.jpeg",
      "",
      "",
    ],
  },
  {
    id: "BD620209DENMS_M1",
    name: "Cască pentru alpinism și escaladă Black Diamond Half Dome Helmet",
    category: ["alpinism", "casti"],
    price: "249",
    stoc: "8",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_HALF_DOME_HELMET_Denim.jpeg",
      "",
      "",
    ],
  },
  {
    id: "BD620209BDORM_L1",
    name: "Cască pentru alpinism și escaladă Black Diamond Half Dome Helmet",
    category: ["alpinism", "casti"],
    price: "239",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_HALF_DOME_HELMET_Orange.jpeg",
      "",
      "",
    ],
  },
  {
    id: "6X933 07",
    name: "Cască CT Venus+",
    category: ["alpinism", "casti"],
    price: "230",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-VENUS_PLUS-WHITE-1.png",
      "",
      "",
    ],
  },
  {
    id: "6X933 01",
    name: "Cască CT Venus+",
    category: ["alpinism", "casti"],
    price: "230",
    stoc: "8",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-VENUS_PLUS-orange-1.png",
      "",
      "",
    ],
  },
  {
    id: "6X948 07",
    name: "Cască CT Galaxy",
    category: ["alpinism", "casti"],
    price: "259",
    stoc: "2",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/prilba-CT-GALAXY-white.png",
      "",
      "",
    ],
  },
  {
    id: "6X948 01",
    name: "Cască CT Galaxy",
    category: ["alpinism", "casti"],
    price: "239",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/prilba-CT-GALAXY-Orange.png",
      "",
      "",
    ],
  },
  {
    id: "6X948 03",
    name: "Cască CT Galaxy",
    category: ["alpinism", "casti"],
    price: "259",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/prilba-CT-GALAXY-blue.png",
      "",
      "",
    ],
  },
  {
    id: "U04A 45",
    name: "Piolet Petzl Ride 45 cm",
    category: ["alpinism", "pioleti"],
    price: "412",
    stoc: "6",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/U04A-45-RIDE_CEPiN.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/U04A-45-RIDE_CEPiN-2.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/U04A-45-RIDE_CEPiN-3.jpg",
    ],
  },
  {
    id: "BD412084000050_1",
    name: "Piolet Black Diamond Swift",
    category: ["alpinism", "pioleti"],
    price: "637",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_SWIFT.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD410169000065_1",
    name: "Piolet cu mâner Black Diamond Raven Ice Axe With Grip",
    category: ["alpinism", "pioleti"],
    price: "478",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_RAVEN_ICE_AXE_WITH_GRIP.jpg",
      "",
      "",
    ],
  },
  {
    id: "1757-3990-58",
    name: "Piolet Salewa Alpine-Tec",
    category: ["alpinism", "pioleti"],
    price: "532",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/salewa-alpine-tec-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "2I87150",
    name: "Piolet CT Alpin Tour Light 50 cm",
    category: ["alpinism", "pioleti"],
    price: "379",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/CT-ALPIN-TOUR-LIGHT-1-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/CT-ALPIN-TOUR-LIGHT-2.png",
      "",
    ],
  },
  {
    id: "2I87160",
    name: "Piolet CT Alpin Tour Light 60 cm",
    category: ["alpinism", "pioleti"],
    price: "379",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/CT-ALPIN-TOUR-LIGHT-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/CT-ALPIN-TOUR-LIGHT.png",
      "",
    ],
  },
  {
    id: "3I863 70",
    name: "Piolet CT Alpin Tour 70 cm",
    category: ["alpinism", "pioleti"],
    price: "372",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/CT-ALPIN_TOUR-3I863.png",
      "https://outdoorlive.ro/wp-content/uploads/2022/01/CT-ALPIN_TOUR-3I863-1.png",
      "",
    ],
  },
  {
    id: "3I863 60",
    name: "Piolet CT Alpin Tour 60 cm",
    category: ["alpinism", "pioleti"],
    price: "382",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/CT-ALPIN_TOUR-3I863.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/01/CT-ALPIN_TOUR-3I863-1.jpg",
      "",
    ],
  },
  {
    id: "3I817",
    name: "Piolet CT Fly Hook Light 50 cm",
    category: ["alpinism", "pioleti"],
    price: "590",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/ct-fly-hook-light-50-cm-3I817.jpg",
      "",
      "",
    ],
  },
  {
    id: "3I849 4",
    name: "Piolet CT Agile+ 45 cm",
    category: ["alpinism", "pioleti"],
    price: "285",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/ct-AGILE-PLUS-3I849.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/01/ct-AGILE-PLUS-3I849-1.jpg",
      "",
    ],
  },
  {
    id: "6I792",
    name: "Capace protecție vârf pioleți CT Spike Cover",
    category: ["alpinism", "pioleti"],
    price: "46",
    stoc: "14",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/CT-SPIKE_COVER-6I79204-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "2I862 70",
    name: "Piolet CT Alpin Tour Light 70 cm",
    category: ["alpinism", "pioleti"],
    price: "379",
    stoc: "4",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-ALPIN-TOUR-LIGHT-2I86250.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-ALPIN-TOUR-LIGHT-2I86250-1.png",
      "",
    ],
  },
  {
    id: "3I80360",
    name: "Piolet CT Alpin Tour + 60 cm",
    category: ["alpinism", "pioleti"],
    price: "456",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-ALPIN-TOUR-PLUS-3I80360-1-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-ALPIN-TOUR-PLUS-3I80360-2.png",
      "",
    ],
  },
  {
    id: "3I80370",
    name: "Piolet CT Alpin Tour + 70 cm",
    category: ["alpinism", "pioleti"],
    price: "456",
    stoc: "7",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-ALPIN-TOUR-PLUS-3I80360-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/CT-ALPIN-TOUR-PLUS-3I80360.png",
      "",
    ],
  },
  {
    id: "6I791",
    name: "Capace protecție vârf pioleți CT Pick Cover",
    category: ["alpinism", "pioleti"],
    price: "46",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/ct-PICK_COVER-6I79104-1.png",
      "",
      "",
    ],
  },
  {
    id: "6I790",
    name: "Capace protecție vârf pioleți CT Head Cover",
    category: ["alpinism", "pioleti"],
    price: "49",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/ct-HEAD_COVER-6I79004-1.png",
      "",
      "",
    ],
  },
  {
    id: "BD411151",
    name: "Chingă piolet Black Diamond Spinner Leash",
    category: ["alpinism", "pioleti"],
    price: "264",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-spinner-leash-1.png",
      "",
      "",
    ],
  },
  {
    id: "BD411152",
    name: "Chingă piolet Black Diamond Slinger Leash",
    category: ["alpinism", "pioleti"],
    price: "144",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/black-diamond-slinger-leash-1.png",
      "",
      "",
    ],
  },
  {
    id: "BD411142",
    name: "Chingă piolet Black Diamond Slider Leash",
    category: ["alpinism", "pioleti"],
    price: "72",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-slider-leash-1.png",
      "",
      "",
    ],
  },
  {
    id: "BD412102-57",
    name: "Piolet Black Diamond Venom Hammer 57 cm",
    category: ["alpinism", "pioleti"],
    price: "624",
    stoc: "",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-venom-hammer-1-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-venom-hammer-2-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-venom-hammer-3-1.png",
    ],
  },
  {
    id: "BD412102-50",
    name: "Piolet Black Diamond Venom Hammer 50 cm",
    category: ["alpinism", "pioleti"],
    price: "624",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-venom-hammer-1.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-venom-hammer-3.png",
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-venom-hammer-4.png",
    ],
  },
  {
    id: "BD410168-75",
    name: "Piolet Black Diamond Raven Ice Axe 75 cm",
    category: ["alpinism", "pioleti"],
    price: "408",
    stoc: "8",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-cepin-racen-ice-axe-75-cm-1.png",
      "",
      "",
    ],
  },
  {
    id: "BD410168-70",
    name: "Piolet Black Diamond Raven Ice Axe 70 cm",
    category: ["alpinism", "pioleti"],
    price: "408",
    stoc: "3",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Black-diamond-cepin-racen-ice-axe-70-cm.png",
      "",
      "",
    ],
  },
  {
    id: "U82002",
    name: "Buclă piolet detașabilă Petzl Linkin",
    category: ["alpinism", "pioleti"],
    price: "57",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Petzl-linkin_1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Petzl-linkin-1_1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/10/Petzl-linkin-2_2.jpg",
    ],
  },
  {
    id: "2010-04350-11238-50",
    name: "Coardă Mammut 8.0 Alpine Dry Rope 50-60-70m",
    category: ["alpinism", "franghii"],
    price: "681",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/12/Mammut-8.0-Alpine-Dry-Rope-safety-orange-boa.jpg",
      "",
      "",
    ],
  },
  {
    id: "2010-04310-01243-40",
    name: "Coardă 9.9 Gym Workhorse Classic Rope- 50 m",
    category: ["alpinism", "franghii"],
    price: "547",
    stoc: "5",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/12/9.9-Gym-Workhorse-Classic-Rope-Candy.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/12/9.9-Gym-Workhorse-Classic-Rope-candy-1.jpg",
      "",
    ],
  },
  {
    id: "2010-04280-11238-60",
    name: "Coardă Mammut 9.8 Crag Dry Rope",
    category: ["alpinism", "franghii"],
    price: "864",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Mammut_9.8_Crag_Dry_Rope_orange.jpg",
      "",
      "",
    ],
  },
  {
    id: "2010-04210-11236-60",
    name: "Coardă Mammut 9.0 Crag Sender Dry Rope",
    category: ["alpinism", "franghii"],
    price: "684",
    stoc: "20",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Mammut_9.0_Crag_Sender_Dry_Rope_80_m_ice_sunrise_.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD323040DUBL0401",
    name: "Coardă Black Diamond Rope 9.9",
    category: ["alpinism", "franghii"],
    price: "548",
    stoc: "24",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/BLACK_DIAMOND_-_9.9_Rope_-_Single_rope_dual_blue.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD323021GOLD0601",
    name: "Coardă Black Diamond Rope 9.4",
    category: ["alpinism", "franghii"],
    price: "730",
    stoc: "7",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_ROPE_9.4_MM_60_M_Gold-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD323017ULPK0601",
    name: "Coardă Black Diamond Dry Climbing Rope 8.9",
    category: ["alpinism", "franghii"],
    price: "864",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_ROPE_8.9MM_50m_DRY_Ultra_Pink-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD323005AQUA0601",
    name: "Coardă Black Diamond Dry Climbing Rope 7.0",
    category: ["alpinism", "franghii"],
    price: "730",
    stoc: "18",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/7.0_DRY_60M_CLIMBING_ROPE.jpg",
      "",
      "",
    ],
  },
  {
    id: "2010-04190-11230-1060",
    name: "Coardă Mammut 8.7 Alpine Sender Dry Rope- 50-60m",
    category: ["alpinism", "franghii"],
    price: "998",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/12/Mammut-Alpine-Sender-Dry-Rope-orange-black-2048x2048.jpg",
      "",
      "",
    ],
  },
  {
    id: "2010-04230-01227-1050",
    name: "Coardă Mammut 9,5 Crag Classic",
    category: ["alpinism", "franghii"],
    price: "595",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/01/Mammut_Crag_Classic_95-1024x1024-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/01/Mammut_Crag_Classic_95_1-1024x1024-1.jpg",
      "",
    ],
  },
  {
    id: "2010-04240-11217-1050",
    name: "Coardă Mammut 9.5 Crag Dry Rope- 50-60m",
    category: ["alpinism", "franghii"],
    price: "859",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/12/Mammut-Crag-Dry-Rope-blue-ocean.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/12/Mammut-Crag-Dry-Rope-blue-ocean-1.jpg",
      "",
    ],
  },
  {
    id: "2010-04200-11237-1050",
    name: "Coardă Mammut 9.0 Alpine Sender Dry Rope- 50-60m",
    category: ["alpinism", "franghii"],
    price: "912",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/12/Mammut-Alpine-Sender-Dry-Rope.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/12/Mammut-Alpine-Sender-Dry-Rope-1.jpg",
      "",
    ],
  },
  {
    id: "2010-04310-01244-40",
    name: "Coardă 9.9 Gym Workhorse Classic Rope- 50 m",
    category: ["alpinism", "franghii"],
    price: "547",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/12/2010-04310-01244_main-grey_160250-scaled.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/12/9.9-Gym-Workhorse-Classic-Rope-boa.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/12/9.9-Gym-Workhorse-Classic-Rope-inguana--scaled.jpg",
    ],
  },
  {
    id: "2010-04080-01214-1050",
    name: "Coardă Mammut 9.9 GYM CLASSIC – 50m",
    category: ["alpinism", "franghii"],
    price: "528",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/12/Mammut-GYM-CLASSIC-50M-Olive.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2020/12/mammut-gym-classic-50m-18b-mat-2010-04080-olive-surf-1.jpg",
      "",
    ],
  },
  {
    id: "2040-02550-15274",
    name: "Carabinieră Mammut Smart HMS 2.0",
    category: ["alpinism", "carabiniere"],
    price: "91",
    stoc: "20",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Mammut-smart-HMS-2.0-screw-gate-karabina.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Mammut-smart-HMS-2.0-screw-gate-karabina-1.jpg",
      "",
    ],
  },
  {
    id: "2040-02730-19200-10",
    name: "Buclă echipată Mammut Crag Wire Indicator Quick",
    category: ["alpinism", "carabiniere"],
    price: "57",
    stoc: "9",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Expreska_Mammut_Crag_Wire_Indicator_Quick_Mammut-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "2040-02550-1502",
    name: "Carabinieră Mammut Smart HMS 2.0",
    category: ["alpinism", "carabiniere"],
    price: "91",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/MAMMUT_-_Smart_HMS_2.0_-.jpg",
      "",
      "",
    ],
  },
  {
    id: "2040-02540-1602",
    name: "Carabinieră Mammut Sender Twistlock",
    category: ["alpinism", "carabiniere"],
    price: "72",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Mammut_Sender_Twistlock.jpg",
      "",
      "",
    ],
  },
  {
    id: "2040-02450-1571",
    name: "Carabinieră Mammut Sender Screwgate",
    category: ["alpinism", "carabiniere"],
    price: "62",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Mammut_KARABI%CC%81NA_SENDER_SCREWGATE.jpg",
      "",
      "",
    ],
  },
  {
    id: "2040-02410-1775",
    name: "Carabinieră Mammut Bionic Crosslock",
    category: ["alpinism", "carabiniere"],
    price: "158",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Mammut_Bionic_CrossLock_.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD620072YELOALL1",
    name: "Dispozitiv opt Black Diamond Super 8",
    category: ["alpinism", "carabiniere"],
    price: "68",
    stoc: "28",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_SUPER_8-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD2102770000ALL1",
    name: "Carabinieră cu siguranță Black Diamond Vaporlock Screwgate",
    category: ["alpinism", "carabiniere"],
    price: "68",
    stoc: "28",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_KARABI%CC%81NA_VAPORLOCK_SCREWGATE.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD2102560002ALL1",
    name: "Carabinieră cu siguranță Black Diamond Rocklock Screwgate",
    category: ["alpinism", "carabiniere"],
    price: "58",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_ROCKLOCK_SCREWGATE_CARABINER_Black.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD2101610002ALL1",
    name: "Carabinieră cu siguranță Black Diamond Hotforge Screwgate",
    category: ["alpinism", "carabiniere"],
    price: "53",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/HOTFORGE_SCREWGATE_-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD3811340002ALL1",
    name: "Carabinieră cu siguranță Black Diamond Pearlock Screwgate",
    category: ["alpinism", "carabiniere"],
    price: "58",
    stoc: "0",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_PEARLOCK_SCREWGATE.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD3811184005ALL1",
    name: "Buclă echipată Black Diamond Hotforge Hybrid Quickdraw 16cm",
    category: ["alpinism", "carabiniere"],
    price: "73",
    stoc: "31",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_HOTFORGE_HYBRID_QUICKDRAW_16_Blue1.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD3811186015ALL1",
    name: "Buclă echipată Black Diamond Hotforge Hybrid Quickdraw 16cm",
    category: ["alpinism", "carabiniere"],
    price: "73",
    stoc: "11",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/HOTFORGE_HYBRID_QUICKDRAW_16_Ultra_pink.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD3811174005ALL1",
    name: "Buclă echipată Black Diamond Hotforge Hybrid Quickdraw 12",
    category: ["alpinism", "carabiniere"],
    price: "68",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_EXPRESKA_KOMPLET_HOTFORGE_HYBRID_QUICKDRAW_blue.jpg",
      "",
      "",
    ],
  },
  {
    id: "BD3811236015ALL1",
    name: "Set bucle echipate Black Diamond Set Hotforge Hybrid Quickpack 12",
    category: ["alpinism", "carabiniere"],
    price: "365",
    stoc: "8",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Black_Diamond_SET_HOTFORGE_HYBRID_QUICKPACK_12_ultra_pink.jpg",
      "",
      "",
    ],
  },
  {
    id: "2120-00720-9148-10",
    name: "Bucla Mammut Crag Express Sling 24.0",
    category: ["alpinism", "carabiniere"],
    price: "12",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/01/Mammut-crag-express-sling-24.0-grey-2.jpg",
      "",
      "",
    ],
  },
  {
    id: "2810-00280-0001",
    name: "Suport pentru apă Mammut Lithium Add-on Bottle Holder",
    category: ["recipiente", "sticle"],
    price: "81",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut_Lithium_Add-on_Bottle_Holder_black-scaled.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut_Lithium_Add-on_Bottle_Holder_black4.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/04/Mammut_Lithium_Add-on_Bottle_Holder_black5.jpg",
    ],
  },
  {
    id: "00521-0900",
    name: "Muștiuc sport Salewa Aurino Sports Lid",
    category: ["recipiente", "sticle"],
    price: "22",
    stoc: "11",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Salewa-aurino-sports-lid-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "00513-4510",
    name: "Sticlă Salewa Aurino Stainless Steel Bottle 0,5 l",
    category: ["recipiente", "sticle"],
    price: "86",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Salewa-aurino-bottle-05-l-orange.jpg",
      "",
      "",
    ],
  },
  {
    id: "V08AMZAEKA",
    name: "Sticlă Mizu V8",
    category: ["recipiente", "sticle"],
    price: "168",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Mizu-V8-Army-pink.jpg",
      "",
      "",
    ],
  },
  {
    id: "M1120201-3008",
    name: "Sticlă Mizu V8",
    category: ["recipiente", "sticle"],
    price: "168",
    stoc: "24",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Mizu-V8-Army-light-ocan-blue.jpg",
      "",
      "",
    ],
  },
  {
    id: "M1120201-3031",
    name: "Sticlă Mizu V8",
    category: ["recipiente", "sticle"],
    price: "168",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Mizu-V8-Army-light-green.jpg",
      "",
      "",
    ],
  },
  {
    id: "M1120201-3010",
    name: "Sticlă Mizu V8",
    category: ["recipiente", "sticle"],
    price: "168",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/12/Mizu-V8-Army-green.jpg",
      "",
      "",
    ],
  },
  {
    id: "1263-0013",
    name: "Sticlă Nalgene On The Fly Kids 350 ml",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-OTF-375-ml-pink-0013.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-OTF-375-ml-pink-0013-1.jpg",
      "",
    ],
  },
  {
    id: "1263-0011",
    name: "Sticlă Nalgene On The Fly Kids 350 ml",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-OTF-375-ml-green-0011.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-OTF-375-ml-green-0011-1.jpg",
      "",
    ],
  },
  {
    id: "1263-0007",
    name: "Sticlă Nalgene On The Fly Kids 350 ml",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-OTF-375-ml-green-0007.jpg",
      "",
      "",
    ],
  },
  {
    id: "1263-0002",
    name: "Sticlă Nalgene On The Fly Kids 350 ml",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-OTF-375-ml-light-blue-0002.jpg",
      "",
      "",
    ],
  },
  {
    id: "Small 2078-2057",
    name: "Sticlă Nalgene Narrow Mouth",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-narrow-mouth-05-l-red-2057.jpg",
      "",
      "",
    ],
  },
  {
    id: "2178-2072",
    name: "Sticlă Nalgene Wide Mouth 0,5 l",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-05-L-orange-2072.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-05-L-orange-2072-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-05-L-orange-2072-2.jpg",
    ],
  },
  {
    id: "Small 2178-2068",
    name: "Sticlă Nalgene Wide Mouth 0,5 l",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "27",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-05-L-olive-2068.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-05-L-olive-2068-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-05-L-olive-2068-1_1.jpg",
    ],
  },
  {
    id: "5565-1324",
    name: "Sticlă Nalgene On The Fly 650 ml",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-OTF-075-L-Brown-blue-1324.jpg",
      "",
      "",
    ],
  },
  {
    id: "2178-2031",
    name: "Sticlă Nalgene Narrow Mouth 1 l",
    category: ["recipiente", "sticle"],
    price: "76",
    stoc: "32",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-1L-2031-green-black.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/11/Nalgene-Wild-mouth-1L-2031-green-black-1.jpg",
      "",
    ],
  },
  {
    id: "360SSB750MTBK",
    name: "Sticlă Sea To Summit 360 Stainless Steel Bottle 750 ml",
    category: ["recipiente", "sticle"],
    price: "67",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-360-STAINLESS-BOTTLE-750-ML-BLACK.jpg",
      "",
      "",
    ],
  },
  {
    id: "10000645",
    name: "Osprey Hydraulics Cleaning Kit",
    category: ["recipiente", "termosuri"],
    price: "158",
    stoc: "15",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Osprey-Hydraulics-Cleaning-Kit.jpg",
      "",
      "",
    ],
  },
  {
    id: "10000483",
    name: "Sac pentru hidratare Osprey Hydraulics LT 1,5L Reservoir",
    category: ["recipiente", "termosuri"],
    price: "182",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Osprey-Hydraulics-LT-15L.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Osprey-Hydraulics-LT-15L-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2022/05/Osprey-Hydraulics-LT-15L-2.jpg",
    ],
  },
  {
    id: "00522-5080",
    name: "Termos Salewa Rienza Thermo Bottle 0,5 l",
    category: ["recipiente", "termosuri"],
    price: "158",
    stoc: "11",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2022/03/Salewa-rienza-thermo-bottle-05l-green.jpg",
      "",
      "",
    ],
  },
  {
    id: "360BOTNRW750BK",
    name: "Sticlă de vid Sea To Summit 360 Narrow Mouth Bottle 750 ml",
    category: ["recipiente", "termosuri"],
    price: "110",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-NARROW-MOUTH-BLACK_1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-NARROW-MOUTH.jpg",
      "",
    ],
  },
  {
    id: "360BOTNRW750TQ",
    name: "Sticlă de vid Sea To Summit 360 Narrow Mouth Bottle 750 ml",
    category: ["recipiente", "termosuri"],
    price: "110",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-NARROW-MOUTH-TURQUOISE_1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-NARROW-MOUTH.jpg",
      "",
    ],
  },
  {
    id: "360BOTNRW750PM",
    name: "Sticlă de vid Sea To Summit 360 Narrow Mouth Bottle 750 ml",
    category: ["recipiente", "termosuri"],
    price: "110",
    stoc: "21",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-NARROW-MOUTH-ORANGE.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-NARROW-MOUTH.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-NARROW-MOUTH-ORANGE-1_1.jpg",
    ],
  },
  {
    id: "360SSVF750BK",
    name: "Sticlă de vid Sea To Summit 360 Stainless Flask 750 ml",
    category: ["recipiente", "termosuri"],
    price: "168",
    stoc: "16",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-Vacuum-Insulated-Flask-750ml-BLACK_1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-Vacuum-Insulated-Flask-750ml-BLACK-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-Vacuum-Insulated-Flask-750ml-BLACK-2.jpg",
    ],
  },
  {
    id: "360SSVF750TQ",
    name: "Sticlă de vid Sea To Summit 360 Stainless Flask 750 ml",
    category: ["recipiente", "termosuri"],
    price: "168",
    stoc: "22",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-Vacuum-Insulated-Flask-750ml-TURQUOISE-0.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-Vacuum-Insulated-Flask-750ml-TURQUOISE.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/08/SEA-TO-SUMMIT-Vacuum-Insulated-Flask-750ml-BLACK-2.jpg",
    ],
  },
  {
    id: "000789-CLBK-01",
    name: "Sticlă INOV-8 ULTRA FLASK 0,5 tube",
    category: ["recipiente", "termosuri"],
    price: "108",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/07/inov-8-ultra-flask-05-tube.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/inov-8-ultra-flask-05-tube-1.jpg",
      "https://outdoorlive.ro/wp-content/uploads/2021/07/inov-8-ultra-flask-05-tube-3.jpg",
    ],
  },
  {
    id: "48918-0101",
    name: "Husă Dynafit Flaskholder pentru sticlă Soft-Flask",
    category: ["recipiente", "termosuri"],
    price: "67",
    stoc: "11",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/05/Dynafit-flaskholder-1.png",
      "",
      "",
    ],
  },
  {
    id: "000933-CLBK-01",
    name: "Sticlă INOV-8 ULTRA FLASK 0,5 lockcap",
    category: ["recipiente", "termosuri"],
    price: "98",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/04/inov-8-ultra-flask-05-lockcap-1.jpg",
      "",
      "",
    ],
  },
  {
    id: "48170-0091",
    name: "Husă pentru recipient Dynafit Bottle Holder Universal",
    category: ["recipiente", "termosuri"],
    price: "58",
    stoc: "10",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/04/Dynafit-Bottle-holder-black-1.png",
      "",
      "",
    ],
  },
  {
    id: "1300",
    name: "Sac pentru hidratare Salewa Transflow Bag 3 l",
    category: ["recipiente", "termosuri"],
    price: "158",
    stoc: "6",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/03/Salewa-transflow-bag-3-l_1.png",
      "",
      "",
    ],
  },
  {
    id: "48916-0309",
    name: "Husă pentru recipient Dynafit Neoprene Bottle Holder",
    category: ["recipiente", "termosuri"],
    price: "67",
    stoc: "12",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2021/03/Dynafit-neoprene-bottle-holder-asphalt-1.png",
      "",
      "",
    ],
  },
  {
    id: "8830-9999",
    name: "Sticlă Dynafit Race Thermo Bottle 0,6 l",
    category: ["recipiente", "termosuri"],
    price: "89",
    stoc: "11",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2020/09/Dynafit_Race_Thermo_Bottle_transparent-1.png",
      "",
      "",
    ],
  },
  {
    id: "2313-0900",
    name: "Termos Salewa Thermo Bottle",
    category: ["recipiente", "termosuri"],
    price: "134",
    stoc: "14",
    img: [
      "https://outdoorlive.ro/wp-content/uploads/2019/10/Termoska_Salewa_ThermoBottle-4.jpg",
      "",
      "",
    ],
  },
];

// function selectActivePage() {
//   // adaug clasa de active pe btn conform nr. pagina
//   let allPageBtns = document.querySelectorAll(".page-item.numeric");
//   for (let i = 0; i < allPageBtns.length; i++) {
//     allPageBtns[i].addEventListener("click", function () {
//       console.log(allPageBtns[i]);
//       allPageBtns[i].classList.add("active");
//     });
//   }
// }

// fac un category.html?="categorie"
// functie care ia ?=, face for prin state.db si cauta toate elem care contin in arr "categorie"

// recuperare din firebase dupa prop, key
// abuz bootstrap

// adaug loading

// let reg = "Ana are mere.".replace(/[^a-z0-9]+/gi);

// + inseamna cel putin un caracter, tot ce a fost inainte macar odata;
// {2,3} - trebuie sa fie intre 2 si 3 caractere;
//
// .replace(/[ ]+/gi), " ") - inlocuieste cel putin un spatiu(>1) cu un singur spatiu
// (/[\n\r]+/gi," "); - inlocuieste toate break-rows, cel putin 1, cu un spatiu. +.trim() pt spatii de la inceput+sf.

// fac obiect pentru cart, fav.
// (/./) . inseamna orice caracter
// ^ - operatorul 'not'

// /[^0-9.]+/ - fals pentru orice nu e de la 0-9
// ^ $
// pentru grupuri ()
// tot ce e dupa plus la email-uri se ignora - gmail

// total teme - 5
