const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung S24",
    price: 22990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 3,
    name: "Pixel 9",
    price: 19990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 4,
    name: "MacBook Pro",
    price: 45990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 5,
    name: "Dell XPS 15",
    price: 35990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 6,
    name: "ThinkPad X1",
    price: 32990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: false,
  },
  {
    id: 7,
    name: "iPad Air",
    price: 16990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 8,
    name: "Xiaomi Pad 6",
    price: 7990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.2,
    inStock: true,
  },
  {
    id: 9,
    name: "Galaxy Tab",
    price: 12990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.1,
    inStock: false,
  },
  {
    id: 10,
    name: "AirPods Pro",
    price: 6990000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.3,
    inStock: true,
  },
  {
    id: 11,
    name: "Galaxy Buds",
    price: 3490000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.1,
    inStock: true,
  },
  {
    id: 12,
    name: "Apple Watch",
    price: 9990000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.6,
    inStock: true,
  },
];

const app = document.querySelector("#app");

let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";
let cartCount = 0;

function formatMoney(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function createLayout() {
  const container = document.createElement("div");
  container.classList.add("container");

  const header = document.createElement("div");
  header.classList.add("header");

  const title = document.createElement("h1");
  title.textContent = "Product Catalog";

  const headerActions = document.createElement("div");
  headerActions.classList.add("header-actions");

  const darkBtn = document.createElement("button");
  darkBtn.classList.add("dark-btn");
  darkBtn.id = "darkModeBtn";
  darkBtn.textContent = "Dark Mode";

  const cart = document.createElement("div");
  cart.classList.add("cart");
  cart.textContent = "🛒";

  const badge = document.createElement("span");
  badge.classList.add("cart-badge");
  badge.id = "cartBadge";
  badge.textContent = "0";

  cart.appendChild(badge);
  headerActions.appendChild(darkBtn);
  headerActions.appendChild(cart);
  header.appendChild(title);
  header.appendChild(headerActions);

  const controls = document.createElement("div");
  controls.classList.add("controls");

  const searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.id = "searchInput";
  searchInput.type = "text";
  searchInput.placeholder = "Tìm sản phẩm...";

  const sortSelect = document.createElement("select");
  sortSelect.classList.add("sort-select");
  sortSelect.id = "sortSelect";

  const options = [
    { value: "default", text: "Mặc định" },
    { value: "price-asc", text: "Giá tăng" },
    { value: "price-desc", text: "Giá giảm" },
    { value: "name-asc", text: "Tên A-Z" },
    { value: "rating-desc", text: "Đánh giá cao nhất" },
  ];

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("option");
    option.value = options[i].value;
    option.textContent = options[i].text;
    sortSelect.appendChild(option);
  }

  controls.appendChild(searchInput);
  controls.appendChild(sortSelect);

  const categoryButtons = document.createElement("div");
  categoryButtons.classList.add("category-buttons");

  const categories = ["all", "phone", "laptop", "tablet", "accessory"];

  for (let i = 0; i < categories.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("category-btn");
    btn.dataset.category = categories[i];
    btn.textContent = categories[i];

    if (categories[i] === "all") {
      btn.classList.add("active");
    }

    categoryButtons.appendChild(btn);
  }

  const productGrid = document.createElement("div");
  productGrid.classList.add("product-grid");
  productGrid.id = "productGrid";

  container.appendChild(header);
  container.appendChild(controls);
  container.appendChild(categoryButtons);
  container.appendChild(productGrid);

  app.appendChild(container);
}

function filterByCategory(productList) {
  if (currentCategory === "all") {
    return productList;
  }

  return productList.filter((product) => product.category === currentCategory);
}

function searchProducts(productList) {
  return productList.filter((product) =>
    product.name.toLowerCase().includes(currentSearch.toLowerCase()),
  );
}

function sortProducts(productList) {
  const copiedProducts = [...productList];

  if (currentSort === "price-asc") {
    return copiedProducts.sort((a, b) => a.price - b.price);
  }

  if (currentSort === "price-desc") {
    return copiedProducts.sort((a, b) => b.price - a.price);
  }

  if (currentSort === "name-asc") {
    return copiedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (currentSort === "rating-desc") {
    return copiedProducts.sort((a, b) => b.rating - a.rating);
  }

  return copiedProducts;
}

function getFinalProducts() {
  let result = products;
  result = filterByCategory(result);
  result = searchProducts(result);
  result = sortProducts(result);
  return result;
}

function renderProducts() {
  const productGrid = document.querySelector("#productGrid");
  productGrid.textContent = "";

  const finalProducts = getFinalProducts();

  for (let i = 0; i < finalProducts.length; i++) {
    const product = finalProducts[i];

    const card = document.createElement("div");
    card.classList.add("product-card");
    card.dataset.id = product.id;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = formatMoney(product.price);

    const category = document.createElement("p");
    category.textContent = "Category: " + product.category;

    const rating = document.createElement("p");
    rating.textContent = "Rating: " + product.rating;

    const stock = document.createElement("p");
    stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";
    stock.classList.add(product.inStock ? "in-stock" : "out-stock");

    const button = document.createElement("button");
    button.textContent = "Thêm giỏ";
    button.classList.add("add-cart-btn");
    button.dataset.id = product.id;

    if (product.inStock === false) {
      button.disabled = true;
      button.textContent = "Hết hàng";
    }

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(rating);
    card.appendChild(stock);
    card.appendChild(button);

    productGrid.appendChild(card);
  }
}

function openModal(product) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  const title = document.createElement("h2");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = "Giá: " + formatMoney(product.price);

  const category = document.createElement("p");
  category.textContent = "Danh mục: " + product.category;

  const rating = document.createElement("p");
  rating.textContent = "Đánh giá: " + product.rating;

  const stock = document.createElement("p");
  stock.textContent = product.inStock
    ? "Tình trạng: Còn hàng"
    : "Tình trạng: Hết hàng";

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.textContent = "Đóng";

  closeBtn.addEventListener("click", function () {
    overlay.remove();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  modal.appendChild(img);
  modal.appendChild(title);
  modal.appendChild(price);
  modal.appendChild(category);
  modal.appendChild(rating);
  modal.appendChild(stock);
  modal.appendChild(closeBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function updateCartBadge() {
  const cartBadge = document.querySelector("#cartBadge");
  cartBadge.textContent = cartCount;
}

function bindEvents() {
  const searchInput = document.querySelector("#searchInput");
  const sortSelect = document.querySelector("#sortSelect");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productGrid = document.querySelector("#productGrid");
  const darkModeBtn = document.querySelector("#darkModeBtn");

  searchInput.addEventListener("input", function () {
    currentSearch = searchInput.value;
    renderProducts();
  });

  sortSelect.addEventListener("change", function () {
    currentSort = sortSelect.value;
    renderProducts();
  });

  for (let i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].addEventListener("click", function () {
      currentCategory = this.dataset.category;

      for (let j = 0; j < categoryButtons.length; j++) {
        categoryButtons[j].classList.remove("active");
      }

      this.classList.add("active");
      renderProducts();
    });
  }

  productGrid.addEventListener("click", function (e) {
    const button = e.target.closest(".add-cart-btn");

    if (button) {
      e.stopPropagation();
      cartCount++;
      updateCartBadge();
      return;
    }

    const card = e.target.closest(".product-card");

    if (card) {
      const id = Number(card.dataset.id);
      const product = products.find((product) => product.id === id);
      openModal(product);
    }
  });

  darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
}

createLayout();
renderProducts();
bindEvents();
