// import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
  // useEffect(() => {
  //    fetchCategoriesStart =  async () =>  {
  //     try {
  //       const categoriesArray = await getCategoriesAndDocuments();

  //       dispatch(fetchCategoriesSuccess(categoriesArray));
  //     } catch (error) {
  //       dispatch(fetchCategoriesFailed(error));
  //     }
  //   };
  //   fetchCategoriesStart();
  // }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  );
};

export default Shop;
