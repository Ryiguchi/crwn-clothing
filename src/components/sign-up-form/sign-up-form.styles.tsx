import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 450px) {
    width: 100%;

    h2 {
      font-size: 20px;
    }
  }
`;
