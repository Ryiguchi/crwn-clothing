const OrderHistoryPopupItem = () => {
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

export default OrderHistoryPopupItem;
