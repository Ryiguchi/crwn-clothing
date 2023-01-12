import styled from 'styled-components';

export const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0 3px;
`;

export const TableHeader = styled.th`
  color: #aaa;
  font-weight: 600;
  text-align: left;
  font-size: 12px;
  padding: 15px 10px;

  &:first-child {
    width: 300px;
  }

  &:nth-child(2) {
    width: 200px;
  }
  &:nth-child(3) {
    width: 200px;
  }
  &:nth-child(4) {
    width: 200px;
  }
  &:last-child {
    width: 50px;
  }
`;

export const TableData = styled.td`
  padding: 15px;

  &:first-child {
    /* border-radius: 10px 0 0 10px; */
    box-shadow: inset 0 1px #ccc, inset 1px -1px #ccc;
  }
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    box-shadow: inset 0 -1px #ccc, inset 0 1px #ccc;
  }

  &:last-child {
    box-shadow: inset 0 -1px #ccc, inset -1px 1px #ccc;
    /* border-radius: 0 10px 10px 0; */
  }
`;
export const TableRow = styled.tr`
  margin-bottom: 3px;
  /* box-shadow: -1px 1px 10px rgb(0, 0, 0, 0.05); */
`;

export const Pagination = styled.div`
  button {
    &:first-child {
      border: none;
    }
  }
`;

export const PagList = styled.ul`
  list-style: none;
  display: flex;
  align-content: center;
  justify-content: center;

  gap: 10px;
`;

export const PagNum = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: ${(props) => (props.active === props.id ? '1px solid #aaa' : '')};
  cursor: pointer;
`;
