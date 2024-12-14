import { createApi } from '@reduxjs/toolkit/query/react';
import { login } from '../../modules/Auth/state';
import { errorHandler } from '../helpers/errorHandler';
import { customBaseQueryWithoutAuth } from '../helpers/baseQuery';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  refetchOnReconnect: true,
  tagTypes: ['auth'],
  baseQuery: customBaseQueryWithoutAuth,
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (result) => result,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: result }) => {
            dispatch(login({ token: result?.meta?.token }));
          })
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      invalidatesTags: (result, error) => (error ? [] : ['auth']),
    }),
    register: build.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (result) => result,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: result }) => {
            dispatch(login({ token: result?.meta?.token }));
          })
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      invalidatesTags: (result, error) => (error ? [] : ['auth']),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authAPI;
