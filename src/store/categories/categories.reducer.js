import { CART_ACTION_TYPES } from '../cart/cart.types';
import { CATGORIES_ACTION_TYPES } from './categories.types';

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

// structure for thunk
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CATGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
// export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CATGORIES_ACTION_TYPES.SET_CATEGORIES:
//       return {
//         ...state,
//         categories: payload,
//       };
//     default:
//       return state;
//   }
// };
