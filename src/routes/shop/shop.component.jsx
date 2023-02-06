import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Route, Routes } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { setCategories } from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
  }, [
    dispatch /* it never changes but eslint shows err, so it doesn't need to be here */,
  ]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
