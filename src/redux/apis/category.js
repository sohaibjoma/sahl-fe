import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';
import { setCategories } from '../../modules/Home/state';

export const categoryAPI = createApi({
  reducerPath: 'categoryAPI',
  refetchOnReconnect: true,
  tagTypes: ['category'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchCategory: build.query({
      query: (slug) => ({
        url: `/categories/products/${slug}`,
      }),
      transformResponse: (result) => result.data,
      providesTags: ['category'],
    }),
    fetchCategories: build.query({
      query: () => ({
        url: '/categories',
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(setCategories(result.data));
          })
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['category'],
    }),
  }),
});

export const { useFetchCategoryQuery, useFetchCategoriesQuery } = categoryAPI;
