import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cart from './views/Cart';
import Checkout from './views/Checkout';

export default function CartRoot() {
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <Routes>
        <Route index element={<Cart />} />
        <Route element={<Checkout />} path='/checkout' />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </>
  );
}
