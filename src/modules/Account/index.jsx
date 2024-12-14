import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Account from './views/AccountRoot';
import MyOrders from './views/MyOrders';
import MyAddresses from './views/MyAddresses';
import MyFavorites from './views/MyFavorites';
import OrderDetails from './views/OrderDetails';
import EmailVerification from './views/EmailVerification';

export default function AccountRoot() {
  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>

      <Routes>
        <Route index element={<Account />} />
        <Route element={<MyFavorites />} path='/favorites' />
        <Route element={<MyOrders />} path='/orders' />
        <Route element={<OrderDetails />} path='/orders/:id' />
        <Route element={<MyAddresses />} path='/addresses' />
        <Route element={<EmailVerification />} path='/email' />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </>
  );
}
