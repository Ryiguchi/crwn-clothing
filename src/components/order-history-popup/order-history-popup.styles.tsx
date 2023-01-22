import styled from 'styled-components';
import { X } from 'phosphor-react';

export const PopupContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  border: 1px solid #aaa;
  padding: 20px;
  margin: 20px auto;
`;

export const StyledX = styled(X)`
  color: #333;
  font-size: 24px;
  font-weight: 700;
  align-self: flex-end;
`;
