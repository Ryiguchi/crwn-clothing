import { useSelector } from 'react-redux';

import { selectUserSettingsMenu } from '../../store/user/user.selector';

import {
  StyledCaretIcon,
  MenuContainer,
  MenuItem,
} from './account-sidebar.styles';

const AccountSidebar = ({ callBack }) => {
  const activeMenu = useSelector(selectUserSettingsMenu);

  return (
    <MenuContainer>
      <MenuItem
        activeMenu={activeMenu}
        name="changeName"
        onClick={() => callBack('changeName')}
      >
        Change display name
        <StyledCaretIcon />
      </MenuItem>
      <MenuItem
        activeMenu={activeMenu}
        name="changeEmail"
        onClick={() => callBack('changeEmail')}
      >
        Change email
        <StyledCaretIcon />
      </MenuItem>
      <MenuItem activeMenu={activeMenu} name="changePassword">
        Change password
        <StyledCaretIcon />
      </MenuItem>
    </MenuContainer>
  );
};

export default AccountSidebar;
