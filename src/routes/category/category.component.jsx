import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, CategoryTitleH2 } from './category.styles';

const Category = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
    console.log(categoriesMap[category]);
    console.log(categoriesMap);
    console.log(category);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitleH2>{category.toUpperCase()}</CategoryTitleH2>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
