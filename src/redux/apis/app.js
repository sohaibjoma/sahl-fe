import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';
import { setCurrentUser } from '../../modules/App/state';

export const appAPI = createApi({
  reducerPath: 'appAPI',
  refetchOnReconnect: true,
  tagTypes: ['app'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: '/auth/me',
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(setCurrentUser(result.data));
          })
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['app'],
    }),
    sendEmailVerification: build.mutation({
      query: () => ({
        url: '/auth/email/send-verify',
        method: 'POST',
      }),
      transformResponse: (result) => result,
      invalidatesTags: (result, error) => (error ? [] : ['auth']),
    }),
  }),
});

export const { useLazyGetUserQuery, useSendEmailVerificationMutation } = appAPI;
