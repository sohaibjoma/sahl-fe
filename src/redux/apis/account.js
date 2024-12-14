import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';
import { setAddresses, setDefaultAddress } from '../../modules/Account/state';

export const accountAPI = createApi({
  reducerPath: 'accountAPI',
  refetchOnReconnect: true,
  tagTypes: ['account'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchAddress: build.query({
      query: ({ id }) => ({
        url: `/addresses/${id}`,
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['account'],
    }),
    fetchAddresses: build.query({
      query: () => ({
        url: '/addresses',
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(setAddresses(result.data));
            dispatch(
              setDefaultAddress(
                result.data.find((address) => address.default) || {}
              )
            );
          })
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['account'],
    }),
    addAddress: build.mutation({
      query: (body) => ({
        url: '/addresses',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      invalidatesTags: ['account'],
    }),
    updateAddress: build.mutation({
      query: (body) => ({
        url: `/addresses/${body.id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      invalidatesTags: ['account'],
    }),
    fetchCities: build.query({
      query: ({ provinceId }) => ({
        url: `/cities?province_id=${provinceId}`,
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['account'],
    }),
    fetchProvinces: build.query({
      query: () => ({
        url: '/provinces',
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['account'],
    }),
  }),
});

export const {
  useFetchAddressQuery,
  useFetchAddressesQuery,
  useLazyFetchAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useFetchCitiesQuery,
  useLazyFetchCitiesQuery,
  useFetchProvincesQuery,
  useLazyFetchProvincesQuery,
} = accountAPI;
