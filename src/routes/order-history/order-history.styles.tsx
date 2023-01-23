import styled from 'styled-components';
import Table from '../../components/table/table.component';

export const TableContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;

  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;
export const StyledTable = styled(Table)``;
