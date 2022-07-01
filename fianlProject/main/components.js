class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `    

        <nav
            class="navbar navbar-expand-md bg-dark navbar-dark px-3 d-flex justify-content-between gap-5 sticky-top"
            >
            <div class="container-sm">            
            <a href="index.html" class="navbar-brand">SIIT Outdoor</a>
            <button
            class="navbar-toggler order-sm-last order-last"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
            >
            <span class="navbar-toggler-icon d-flex"></span>
            </button>
            <div
            class="collapse navbar-collapse flex-md-grow-3 flex-lg-grow-3 flex-xl-grow-3"
            id="navmenu"
            >
            <ul class="navbar-nav justify-content-center">
                <li class="nav-item">
                <a href="products.html" class="nav-link">Totate produsele</a>
                </li>
                <li class="nav-item">
                <a href="categories.html?categ=drumetie" class="nav-link"
                    >Drumetie</a
                >
                </li>
                <li class="nav-item">
                <a href="categories.html?categ=ochelari" class="nav-link"
                    >Ochelari</a
                >
                </li>
                <li class="nav-item">
                <a href="categories.html?categ=alpinism" class="nav-link"
                    >Alpinism</a
                >
                </li>
                <li class="nav-item">
                <a href="latest.html" 
                class="nav-link">Noutati</a>
                </li>
                <li class="nav-item">
                <a href="admin.html" 
                class="nav-link text-danger">Admin</a>
                </li>
                <!-- <li class="nav-item">
                <a href="#" disabled class="nav-link">Loader</a>
                </li> -->
            </ul>
            </div>
            <div
            class="navbar"
            >
            <ul
                class="navbar-nav ms-auto flex-row flex-fill justify-content-between justify-content-xs-between justify-content-sm-between justify-content-md-center justify-content-lg-center justify-content-xl-center"
            >
            <li class="nav-item d-flex align-items-center">
            <a class="nav-link">
                <div class="spinner-border spinner-border-sm text-light fs-6 d-none" role="status">
                    <div class="visually-hidden">Loading...</div>
                </div>
                </a>
            </li>
                <li class="nav-item">
                <a href="favorites.html" class="nav-link favorites">
                    <button class="btn position-relative">
                    <i class="bi bi-heart link-danger"></i>
                    </button>
                </a>
                </li>
                <li class="nav-item">
                <a href="cart.html" class="nav-link cart">
                    <button class="btn position-relative">
                    <i class="bi bi-cart link-primary"></i>
                    </button>
                </a>
                </li>
            </ul>
            </div>
            </div>
      </nav>`;
  }
}

customElements.define("navbar-component", Navbar);

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="footer container-fluid d-flex m-0 p-3 fs-6 bg-dark">
    <div class="container">
      <div class="row align-items-center">
        <ul class="footer-card-icons col-12 col-md-6 d-flex align-self-center justify-content-center justify-content-md-start gap-3 m-0">
          <li><i class="fa fa-credit-card text-light" style="font-size:24px"></i></li>
          <li><i class="fa fa fa-cc-visa text-light" style="font-size:24px"></i></li>
          <li><i class="fa fa-cc-mastercard text-light" style="font-size:24px"></i></li>
          <li><i class="fa fa-cc-paypal text-light" style="font-size:24px"></i></li>
          <li><i class="fa 	fa fa-google-wallet text-light" style="font-size:24px"></i></li>
        </ul>
        <div class="col-12 col-md-5">
          <div
            class="container d-flex justify-content-center justify-content-md-end"
          >
            <div class="row flex-row">
              <div class="col-6 col-md-6 text-light fs-6 fw-lighter copyright">
                &copy; All rights reserved
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `;
  }
}
customElements.define("footer-component", Footer);
