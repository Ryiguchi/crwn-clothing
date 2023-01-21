import { useState } from 'react';

import { useTable, usePagination } from 'react-table';
// import { useSelector } from 'react-redux';

// import { selectCurrentUser } from '../../store/user/user.selector';

import {
  TableHeader,
  TableData,
  TableRow,
  StyledTable,
  Pagination,
  PagNum,
  PagList,
} from './table.styles';

import { CaretLeft, CaretRight } from 'phosphor-react';

const Table = ({ data, columns }) => {
  const [activePage, setActivePage] = useState(0);
  // const currentUser = useSelector(selectCurrentUser);
  // const { orderHistory } = currentUser;
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    page, // rows for the table based on the data passed
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = useTable(
    { columns, data, initialState: { pageSize: 5, pageIndex: 0 } },
    usePagination
  );

  const getPagination = () => {
    let markup = [];
    for (let i = 0; i < pageCount; i++) {
      markup.push(
        <PagNum
          id={i}
          key={i + 1}
          active={activePage}
          onClick={() => {
            gotoPage(i);
            setActivePage(i);
          }}
        >
          {i + 1}
        </PagNum>
      );
    }
    return markup;
  };

  const changePage = (page) => {
    if (page === 'next' && activePage !== pageCount - 1) {
      setActivePage(activePage + 1);
    }
    if (page === 'previous' && activePage !== 0) {
      setActivePage(activePage - 1);
    }
  };

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableData id={i} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </StyledTable>

      <Pagination className="pagination">
        <PagList>
          <CaretLeft
            size={24}
            color="#363636"
            onClick={() => {
              changePage('previous');
              previousPage();
            }}
            disabled={!canPreviousPage}
          />
          {getPagination()}
          <CaretRight
            size={24}
            color="#363636"
            onClick={() => {
              changePage('next');
              nextPage();
            }}
            disabled={!canNextPage}
          />
        </PagList>
        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span></span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </Pagination>
    </>
  );
};

export default Table;
