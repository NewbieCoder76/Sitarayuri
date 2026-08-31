/* ==========================================================================
   LocalStorage Helper Functions
   ========================================================================== */
const STORAGE_KEYS = {
  CART: "sitarayuri_cart",
  WISHLIST: "sitarayuri_wishlist"
};

function getCart() {
  const data = localStorage.getItem(STORAGE_KEYS.CART);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function getWishlist() {
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return data ? JSON.parse(data) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
}