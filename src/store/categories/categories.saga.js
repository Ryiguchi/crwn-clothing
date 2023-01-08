import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './categories.action';

import { CATEGORIES_ACTION_TYPES } from './categories.types';

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());

//   try {
//     const categoriesArray = await getCategoriesAndDocuments('categories');
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };

export function* fetchCategoriesAsync() {
  try {
    // use yield call() instead of await
    // pass call() a method and then the parameters
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    // use put instead of dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // takes the latest call and ignores the rest if there are multiple same calls
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}

// Saga flow
// 1. The component dispatches an action.
// 2. It reaches the saga middleware which is listening for the action_type
// 3. onFetchCategories takes the latest action and initializes the async function (saga)
// 4. The saga will attempt to fetch the array and if successful it will put(), like dispatch, the success action with the array
// 5. If it fails, it will put() the faied action, with th error
// 6. The actions will go back into the redux flow and update the reducers or any sagas that are listening for these actions
