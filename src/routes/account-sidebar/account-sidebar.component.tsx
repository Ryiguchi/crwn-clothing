import { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectUserSettingsMenu } from '../../store/user/user.selector';
import { USER_SETTINGS_MENU_OPTIONS } from '../../store/user/user.types';

import {
  StyledCaretIcon,
  MenuContainer,
  MenuItem,
} from './account-sidebar.styles';

type AccountSidebarProps = {
  callBack: (menu: USER_SETTINGS_MENU_OPTIONS) => void;
};

const AccountSidebar: FC<AccountSidebarProps> = ({ callBack }) => {
  const activeMenu = useSelector(selectUserSettingsMenu);

  return (
    <MenuContainer>
      <MenuItem
        activemenu={activeMenu}
        name={USER_SETTINGS_MENU_OPTIONS.CHANGE_NAME}
        onClick={() => callBack(USER_SETTINGS_MENU_OPTIONS.CHANGE_NAME)}
      >
        Change display name
        <StyledCaretIcon />
      </MenuItem>
      <MenuItem
        activemenu={activeMenu}
        name={USER_SETTINGS_MENU_OPTIONS.CHANGE_EMAIL}
        onClick={() => callBack(USER_SETTINGS_MENU_OPTIONS.CHANGE_EMAIL)}
      >
        Change email
        <StyledCaretIcon />
      </MenuItem>
      <MenuItem
        activemenu={activeMenu}
        name={USER_SETTINGS_MENU_OPTIONS.CHANGE_PASSWORD}
        onClick={() => callBack(USER_SETTINGS_MENU_OPTIONS.CHANGE_PASSWORD)}
      >
        Change password
        <StyledCaretIcon />
      </MenuItem>
    </MenuContainer>
  );
};

export default AccountSidebar;
