import styled from 'styled-components';

import { ReactComponent as CaretRightIcon } from '../../assets/caret-right.svg';
import { USER_SETTINGS_MENU_OPTIONS } from '../../store/user/user.types';

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 250px;

  margin-top: 60px;
`;

type MenuItemProps = {
  name: USER_SETTINGS_MENU_OPTIONS;
  activemenu: USER_SETTINGS_MENU_OPTIONS;
};

export const MenuItem = styled.div<MenuItemProps>`
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
