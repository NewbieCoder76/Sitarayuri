/* ==========================================================================
   Slide-out Cart & Drawer Controller
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initCartDrawer();
  renderCart();
});

function initCartDrawer() {
  const cartBtn = document.getElementById("cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartDrawer = document.getElementById("cart-drawer");

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
}

function openCart() {
  document.getElementById("cart-drawer")?.classList.add("is-open");
  document.getElementById("cart-overlay")?.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.getElementById("cart-drawer")?.classList.remove("is-open");
  document.getElementById("cart-overlay")?.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function addToCart(productId, colorKey, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId) || COLLABS.find(c => c.id === productId);
  if (!product) return;

  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId && item.color === colorKey);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: colorKey,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart(cart);
  renderCart();
  openCart();
}

function removeFromCart(productId, colorKey) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.color === colorKey));
  saveCart(cart);
  renderCart();
}

function updateQuantity(productId, colorKey, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId && i.color === colorKey);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId, colorKey);
      return;
    }
    saveCart(cart);
    renderCart();
  }
}

function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById("cart-drawer-items");
  const cartCountBadge = document.getElementById("cart-count");
  const cartSubtotalEl = document.getElementById("cart-subtotal");

  // Update total count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountBadge) cartCountBadge.textContent = totalItems;

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
    if (cartSubtotalEl) cartSubtotalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="cart-item" style="display:flex; gap:1rem; margin-bottom:1.5rem; align-items:center;">
        <img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:contain; background:#F4F2EE; border-radius:4px;">
        <div style="flex:1;">
          <h4 style="font-size:0.9rem; margin-bottom:0.2rem;">${item.name}</h4>
          <p style="font-size:0.85rem; color:#666;">$${item.price.toFixed(2)}</p>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.4rem;">
            <button onclick="updateQuantity('${item.id}', '${item.color}', -1)" style="padding:0 6px; cursor:pointer;">-</button>
            <span style="font-size:0.85rem;">${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', '${item.color}', 1)" style="padding:0 6px; cursor:pointer;">+</button>
          </div>
        </div>
        <button onclick="removeFromCart('${item.id}', '${item.color}')" style="background:none; border:none; color:#888; cursor:pointer;">&times;</button>
      </div>
    `;
  }).join("");

  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}