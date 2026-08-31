/* ==========================================================================
   Hero Color Swatch Switcher Interactivity
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const swatches = document.querySelectorAll(".swatch");
  const heroImage = document.getElementById("hero-tumbler-img");
  const colorLabel = document.getElementById("selected-color-label");
  const addToCartBtn = document.getElementById("hero-add-to-cart");

  let activeColorKey = "sage";

  swatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      swatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");

      const colorName = swatch.dataset.name;
      const imageSrc = swatch.dataset.img;
      activeColorKey = swatch.dataset.color;

      if (colorLabel) colorLabel.textContent = colorName;
      if (heroImage) heroImage.src = imageSrc;
    });
  });

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const selectedProduct = PRODUCTS.find(p => p.color === activeColorKey);
      if (selectedProduct) {
        addToCart(selectedProduct.id, activeColorKey, 1);
      }
    });
  }
});