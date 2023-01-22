import { useDispatch } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';

import { setIsOrderHistoryPopupOpen } from '../../store/elements/elements.action';

import { PopupContainer, StyledX } from './order-history-popup.styles';
import { FC } from 'react';
import { Order } from '../payment-form/payment-form.component';

type OrderHistoryPopupProps = {
  items: Order;
};

const OrderHistoryPopup: FC<OrderHistoryPopupProps> = ({ items }) => {
  const { amount, date, id } = items;
  const orderId = `ID-${id.substring(id.length - 6).toUpperCase()}`;
  const dispatch = useDispatch();

  const closePopup = () => dispatch(setIsOrderHistoryPopupOpen(false));

  return (
    <>
      <PopupContainer>
        <StyledX onClick={closePopup} size={20} color="#363636" weight="bold" />
        <div>{`Order ID: ${orderId}`}</div>
        <div>{`OrderDate: ${date}`}</div>
        <div>
          {items.orderItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
        <div>{`Total: $${(amount / 100).toFixed(2)}`}</div>
      </PopupContainer>
    </>
  );
};

export default OrderHistoryPopup;
