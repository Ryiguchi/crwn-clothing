import { MouseEvent, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Column } from 'react-table';

import OrderHistoryPopup from '../../components/order-history-popup/order-history-popup.component';

import {
  selectOrderDetails,
  selectUserOrderHistory,
  selectOrderHistoryPopupItems,
  selectCurrentUser,
} from '../../store/user/user.selector';
import { selectIsOrderHistoryPopupOpen } from '../../store/elements/elements.selector';

import { setOrderHistoryPopupItems } from '../../store/user/user.action';
import { setIsOrderHistoryPopupOpen } from '../../store/elements/elements.action';

import { TableContainer, StyledTable } from './order-history.styles';
import { DotsThreeVertical } from 'phosphor-react';
import { Order } from '../../components/payment-form/payment-form.component';

export type OrderData = {
  numItems: number;
  date: string;
  id: string;
  orderId: string;
  amount: string;
};

const OrderHistory = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const data = useSelector(selectOrderDetails);
  const orderHistory = useSelector(selectUserOrderHistory);
  const isOrderHistoryPopupOpen = useSelector(selectIsOrderHistoryPopupOpen);
  const orderHistoryPopupItems = useSelector(
    selectOrderHistoryPopupItems
  ) as Order;

  const doSomething = (e: MouseEvent<SVGSVGElement>) => {
    const target = e.target as HTMLTableCellElement;
    const index = +target.parentElement!.id;
    if (orderHistory) {
      dispatch(setOrderHistoryPopupItems(orderHistory[index]));
      dispatch(setIsOrderHistoryPopupOpen(true));
    }
  };

  const columns: ReadonlyArray<Column<OrderData>> = useMemo(
    () => [
      {
        Header: 'Purchase date:',
        accessor: 'date',
      },
      {
        Header: 'Order id:',
        accessor: 'orderId',
      },
      {
        Header: '# of items:',
        accessor: 'numItems',
      },
      {
        Header: 'Total:',
        accessor: `amount`,
      },
      {
        Header: '',
        id: `icon`,
        Cell: () => (
          <DotsThreeVertical
            onClick={doSomething}
            size={20}
            color="#363636"
            weight="bold"
          />
        ),
      },
    ],
    []
  );

  if (!data) return;
  if (!user) return;
  return (
    <>
      {isOrderHistoryPopupOpen ? (
        <OrderHistoryPopup items={orderHistoryPopupItems} />
      ) : (
        <TableContainer>
          <StyledTable data={data} columns={columns}></StyledTable>
        </TableContainer>
      )}
    </>
  );
};

export default OrderHistory;
