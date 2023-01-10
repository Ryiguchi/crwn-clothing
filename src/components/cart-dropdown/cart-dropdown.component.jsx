import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../store/cart/cart.selectors';
import { setIsCartOpen } from '../../store/cart/cart.action';

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    dispatch(setIsCartOpen(false));
    navigate('/checkout');
  };

  // if (!isCartOpen) return;
  return (
    <CartDropdownContainer>
      <CartItems />
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
      ) : (
        <EmptyMessage>Your cart is empty</EmptyMessage>
      )}

      <Button onClick={goToCheckoutHandler}>Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
