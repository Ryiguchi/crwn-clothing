const selectCartSlice = (state) => state.cart;

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);

export const selectCartCount = (state) =>
  state.cart.cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

export const selectIsCartOpen = (state) => state.cart.isCartOpen;
