import styled from 'styled-components';

import Button from '../button/button.component';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 300px;
  padding: 20px;
`;

export const StyledButton = styled(Button)`
  width: 100px;
  align-self: flex-end;
`;
