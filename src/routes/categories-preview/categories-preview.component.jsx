import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  SelectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/categories.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(SelectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={products}
            ></CategoryPreview>
          );
        })
      )}
    </>
  );
};

export default CategoriesPreview;
