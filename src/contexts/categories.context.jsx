import { createContext, useReducer, useEffect } from 'react';

import { createAction } from '../utils/reducer.utils';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: 'categories/SET_CATEGORIES_MAP',
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        categoriesMap: payload,
      };
    default:
      throw new Error('Wrong user type');
  }
};

const INITIAL_STATE = {
  categoriesMap: {},
};

export const CategoriesProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );

  const setCategoriesMap = (categoryMap) => {
    dispatch(
      createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoryMap)
    );
  };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();

      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
