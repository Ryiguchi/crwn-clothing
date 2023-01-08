import { USER_ACTION_TYPES } from './user.types';

import { createAction } from '../../utils/reducer.utils';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRRET_USER, user);
