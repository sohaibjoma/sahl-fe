import { Helmet } from 'react-helmet-async';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './views/Product';
import CategoryProducts from './views/CategoryProducts';
import SearchedProducts from './views/SearchedProducts';

export default function ProductRoot() {
  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>

      <Routes>
        <Route index element={<Product />} path='/:slug' />
        <Route element={<CategoryProducts />} path='/c/:slug' />
        <Route element={<SearchedProducts />} path='/s/:search' />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </>
  );
}
