export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
}

export type CartItem = {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
};
