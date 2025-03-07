import { createApi } from '@reduxjs/toolkit/query/react';
import {
  customBaseQueryWithAuth,
  customBaseQueryWithoutAuth,
} from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';
import { setProducts } from '../../modules/Home/state';

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
      query: (filter) => {
        const params = new URLSearchParams({
          category: filter.slug,
          page: filter.page || 1,
          per_page: filter.per_page || 4,
        });

        if (filter.min_price) params.append('min_price', filter.min_price);
        if (filter.max_price) params.append('max_price', filter.max_price);

        return {
          url: `/products?${params.toString()}`,
        };
      },
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
