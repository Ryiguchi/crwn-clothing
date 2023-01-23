import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Roboto', 'Sans Serif';
  margin: 0;
  padding: 20px 40px;

  @media screen and (max-width: 800px) {
    padding: 20px;
  }

  @media screen and (max-width: 450px) {
    padding: 20px 10px;
  }
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a {
  text-decoration: none;
  color: black;
}

button {
  font-family: 'Roboto';
}
`;
