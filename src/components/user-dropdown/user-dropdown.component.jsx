import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';

import { signOutStart } from '../../store/user/user.action';
import { setIsUserMenuOpen } from '../../store/user/elements/elements.action';

import { selectIsUserMenuOpen } from '../../store/user/elements/elements.selector';

import { UserDropdownContainer, UserMenuItems } from './user-dropdown.styles';

import { ReactComponent as GearIcon } from '../../assets/gear.svg';
import { ReactComponent as OrderIcon } from '../../assets/bag.svg';

const UserDropdown = () => {
  const dispatch = useDispatch();

  const isUserMenuOpen = useSelector(selectIsUserMenuOpen);

  const signOutUser = () => dispatch(signOutStart());

  const toggleIsUserMenuOpen = () =>
    dispatch(setIsUserMenuOpen(!isUserMenuOpen));

  return (
    <UserDropdownContainer>
      <UserMenuItems to="/account" onClick={toggleIsUserMenuOpen}>
        <GearIcon style={{ marginRight: '10px' }} />
        Account settings
      </UserMenuItems>
      <UserMenuItems to="/history" onClick={toggleIsUserMenuOpen}>
        <OrderIcon style={{ marginRight: '10px' }} />
        Order History
      </UserMenuItems>
      <Button onClick={signOutUser}>SIGN OUT</Button>
    </UserDropdownContainer>
  );
};

export default UserDropdown;
