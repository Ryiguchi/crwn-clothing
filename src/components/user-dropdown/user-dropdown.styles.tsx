import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const UserDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  // height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

export const UserMenuItems = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
`;
