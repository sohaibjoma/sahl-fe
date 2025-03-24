import { useSelector } from 'react-redux';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import Layout from './shared/layout/GeneralLayout';

import Page404 from './modules/404';
import AuthModule from '../src/modules/Auth';
import HomeModule from '../src/modules/Home';
import ProductModule from '../src/modules/Product';
import CartModule from '../src/modules/Cart';
import AccountModule from '../src/modules/Account';
import { authSelector } from './modules/Auth/state';

export default function Router() {
  const { token } = useSelector(authSelector);

  const routes = useRoutes(
    token
      ? [
          {
            path: '/*',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: (
                  <Layout>
                    <HomeModule />
                  </Layout>
                ),
              },
              {
                path: 'product/*',
                element: (
                  <Layout>
                    <ProductModule />
                  </Layout>
                ),
              },
              {
                path: 'cart/*',
                element: (
                  <Layout>
                    <CartModule />
                  </Layout>
                ),
              },
              {
                path: 'account/*',
                element: (
                  <Layout>
                    <AccountModule />
                  </Layout>
                ),
              },
              {
                path: '*',
                element: <Navigate to='/404' replace />,
              },
            ],
          },
          {
            path: 'auth/login',
            element: <Navigate to='/auth/login' replace />,
          },
          {
            path: '404',
            element: <Page404 />,
          },
        ]
      : [
          {
            path: '/*',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: (
                  <Layout>
                    <HomeModule />
                  </Layout>
                ),
              },
              {
                path: 'product/*',
                element: (
                  <Layout>
                    <ProductModule />
                  </Layout>
                ),
              },
              {
                path: 'cart/*',
                element: (
                  <Layout>
                    <CartModule />
                  </Layout>
                ),
              },
              {
                path: 'auth/*',
                element: <AuthModule />,
              },
              {
                path: '*',
                element: <Navigate to='/404' replace />,
              },
            ],
          },
          {
            path: '404',
            element: <Page404 />,
          },
        ]
  );

  return routes;
}
