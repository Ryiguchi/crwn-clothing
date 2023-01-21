import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectElements = (state: RootState) => state.elements;

export const selectIsUserMenuOpen = createSelector(
  [selectElements],
  (elements) => elements.isUserMenuOpen
);

export const selectIsCartOpen = createSelector(
  [selectElements],
  (elements) => elements.isCartOpen
);

export const selectIsOrderHistoryPopupOpen = createSelector(
  [selectElements],
  (elements) => elements.isOrderHistoryPopupOpen
);
