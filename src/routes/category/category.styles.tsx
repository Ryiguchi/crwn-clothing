import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  column-gap: 20px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const CategoryTitleH2 = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;

  @media screen and (max-width: 450px) {
    font-size: 30px;
    margin-bottom: 20px;
  }
`;
