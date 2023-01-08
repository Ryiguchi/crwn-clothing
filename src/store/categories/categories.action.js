import { CATEGORIES_ACTION_TYPES } from './categories.types';

import { createAction } from '../../utils/reducer.utils';

export const setCategoriesMap = (categoryMap) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoryMap);
