import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import SuccessfulReg from './components/SuccessfulReg';
import Register from './views/Register';
import { Helmet } from 'react-helmet-async';

export default function AuthRoot() {
  return (
    <>
      <Helmet>
        <title>Auth</title>
      </Helmet>

      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<SuccessfulReg />} path='/register/successful' />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </>
  );
}
