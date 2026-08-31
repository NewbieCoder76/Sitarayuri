/* ==========================================================================
   Products Catalog Rendering & Filter Logic
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog("all");
  initFilters();
});

function initFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      renderCatalog(filter);
    });
  });
}

function renderCatalog(filter) {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  const filteredProducts = filter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.color === filter);

  grid.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div>
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-price">$${product.price.toFixed(2)}</p>
        <button class="btn-secondary full-width" onclick="addToCart('${product.id}', '${product.color}', 1)">Add to Cart</button>
      </div>
    </div>
  `).join("");
}