import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  @media screen and (max-width: 800px) {
    text-align: center;
  }

  @media screen and (max-width: 450px) {
    font-size: 16px;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  @media screen and (max-width: 800px) {
    width: 28%;
  }

  @media screen and (max-width: 450px) {
    padding-right: 8px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Name = styled.span`
  width: 23%;

  @media screen and (max-width: 800px) {
    width: 40%;
  }

  @media screen and (max-width: 450px) {
    width: 30%;
  }
`;

export const Quantity = styled.span`
  width: 23%;
  display: flex;

  @media screen and (max-width: 800px) {
    width: 20%;
    justify-content: center;
  }

  @media screen and (max-width: 450px) {
    width: 16%;
  }
`;

export const Price = styled.span`
  width: 23%;

  @media screen and (max-width: 800px) {
    width: 12%;
  }

  @media screen and (max-width: 450px) {
    width: 16%;
  }
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;

  @media screen and (max-width: 450px) {
    margin: 0 8px;
  }
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    width: 8%;
  }

  @media screen and (max-width: 450px) {
    width: 10%;
  }
`;
