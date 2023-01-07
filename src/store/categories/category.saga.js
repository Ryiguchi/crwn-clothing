import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './categories.action';

import { CATGORIES_ACTION_TYPES } from './categories.types';

// FOR THUNK
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {

//     const categoriesArray = await getCategoriesAndDocuments();

//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };

export function* fetchCategoriesAsync() {
  try {
    // call - to turn a function into an effect
    // passed a method and the params
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    // put - lilke dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // gets the latest action
  yield takeLatest(
    CATGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// accumulator that holds all the sagas for the category
export function* categoriesSaga() {
  // all - effect that says run everything inside and only complete when all is done
  yield all([call(onFetchCategories)]);
}
