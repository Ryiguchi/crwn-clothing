import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  SelectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/categories.selector';

import { CategoryContainer, CategoryTitleH2 } from './category.styles';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(SelectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitleH2>{category.toUpperCase()}</CategoryTitleH2>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;
