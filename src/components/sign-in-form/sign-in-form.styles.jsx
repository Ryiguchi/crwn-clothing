import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  span:nth-child(4) {
    font-size: 12px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 12px;
  color: blue;
`;
