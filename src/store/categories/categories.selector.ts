import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CategoryMap } from './categories.types';

const selectCategoriesState = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectIsCategoriesIsLoading = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.isLoading
);
