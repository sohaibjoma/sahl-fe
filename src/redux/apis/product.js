import { createApi } from '@reduxjs/toolkit/query/react';
import {
  customBaseQueryWithAuth,
  customBaseQueryWithoutAuth,
} from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';
import { setProducts } from '../../modules/Home/state';
import { generateUrlParams } from '../../utils/paramsUtil';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  refetchOnReconnect: true,
  tagTypes: ['product'],
  baseQuery: localStorage.getItem('token')
    ? customBaseQueryWithAuth
    : customBaseQueryWithoutAuth,
  endpoints: (build) => ({
    fetchProduct: build.query({
      query: (slug) => ({
        url: `/products/${slug}`,
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['product'],
    }),
    fetchProducts: build.query({
      query: (params) => ({
        url: `/products?${
          params.filters ? generateUrlParams([...params.filters]) : ''
        }`,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(setProducts(result.data));
          })
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['product'],
    }),
  }),
});

export const {
  useFetchProductQuery,
  useLazyFetchProductsQuery,
  useFetchProductsQuery,
} = productAPI;
