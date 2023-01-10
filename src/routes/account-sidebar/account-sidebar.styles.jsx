import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { ReactComponent as CaretRightIcon } from '../../assets/caret-right.svg';

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 250px;

  margin-top: 60px;
`;

export const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 20px;

  cursor: pointer;

  border-left: ${(props) =>
    props.name === props.activemenu ? '2px solid #000' : '2px solid #fff'};
`;

export const StyledCaretIcon = styled(CaretRightIcon)``;
