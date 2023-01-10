import {
  StyledCaretIcon,
  MenuContainer,
  MenuItem,
} from './account-sidebar.styles';

const AccountSidebar = ({ callBack }) => {
  return (
    <MenuContainer>
      <MenuItem onClick={() => callBack('changeName')}>
        Change display name
        <StyledCaretIcon />
      </MenuItem>
      <MenuItem onClick={() => callBack('changeEmail')}>
        Change email adddress
        <StyledCaretIcon />
      </MenuItem>
      <MenuItem>
        Change password
        <StyledCaretIcon />
      </MenuItem>
    </MenuContainer>
  );
};

export default AccountSidebar;
