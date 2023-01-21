import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import UserDropdown from '../../components/user-dropdown/user-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/elements/elements.selector';
import { selectIsUserMenuOpen } from '../../store/elements/elements.selector';

import { setIsUserMenuOpen } from '../../store/elements/elements.action';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  StyledUserLogo,
} from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const isUserMenuOpen = useSelector(selectIsUserMenuOpen);

  const toggleIsUserMenuOpen = () =>
    dispatch(setIsUserMenuOpen(!isUserMenuOpen));

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <>
              <StyledUserLogo onClick={toggleIsUserMenuOpen} />
              {isUserMenuOpen && <UserDropdown />}
              {currentUser.displayName && currentUser.displayName.toUpperCase()}
            </>
          ) : (
            <NavLink to="/auth">Sign-in</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
