import { createSelector } from 'reselect';

const selectUserSlice = (state) => state.user;

export const selectOrderHistoryPopupItems = createSelector(
  [selectUserSlice],
  (user) => user.orderHistoryPopupItems
);

export const selectCurrentUser = createSelector(
  [selectUserSlice],
  (user) => user.currentUser
);

export const selectUserSettingsMenu = createSelector(
  [selectUserSlice],
  (user) => user.userSettingsMenu
);

export const selectUserOrderHistory = createSelector(
  [selectCurrentUser],
  (user) => user.orderHistory
);

export const selectOrderDetails = createSelector(
  [selectUserOrderHistory],
  (orderHistory) =>
    orderHistory.map((order) => {
      const { date, id, amount, numItems } = order;
      const newDate = date.slice(0, 6) + ',' + date.slice(6);
      const orderId = `ID-${id.substring(id.length - 6).toUpperCase()}`;
      return {
        numItems,
        date: newDate,
        id,
        orderId,
        amount: `$${(amount / 100).toFixed(2)}`,
      };
    })
);
