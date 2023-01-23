import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as UserLogo } from '../../assets/user.svg';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 450px) {
    height: 40px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 450px) {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 40px;
    }
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const NavLink = styled(Link)`
  text-transform: uppercase;
  padding: 10px 15px;
  cursor: pointer;

  @media screen and (max-width: 450px) {
    padding: 10px;
  }
`;

export const StyledUserLogo = styled(UserLogo)`
  cursor: pointer;
  margin-right: 5px;
`;
