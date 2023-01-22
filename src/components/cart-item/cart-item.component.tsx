import { FC } from 'react';
import { CartItem as CartItemType } from '../../store/cart/cart.types';
import { CartItemContainer, Img, ItemDetails, Name } from './cart-item.styles';

type CartItemProps = {
  cartItem: CartItemType;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <Img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span className="price">
          {quantity} x ${price}{' '}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
