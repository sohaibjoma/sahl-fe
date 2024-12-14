import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';

export const orderAPI = createApi({
  reducerPath: 'orderAPI',
  refetchOnReconnect: true,
  tagTypes: ['order', 'cart'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
    fetchOrder: build.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      transformResponse: (result) => result.data,
      providesTags: ['order'],
    }),
    fetchOrders: build.query({
      query: () => ({
        url: '/orders',
        method: 'GET',
      }),
      transformResponse: (result) => result.data,
      providesTags: ['order'],
    }),
    checkOrderStatus: build.query({
      query: (id) => ({
        url: `/orders/validate/${id}`,
        method: 'GET',
      }),
      transformResponse: (result) => result.data,
      providesTags: ['order'],
    }),
    checkout: build.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      invalidatesTags: (result, error) => (error ? [] : ['order', 'cart']),
    }),
    checkoutWithCash: build.mutation({
      query: (data) => ({
        url: '/orders/pay-with-cash',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      invalidatesTags: (result, error) => (error ? [] : ['order', 'cart']),
    }),
  }),
});

export const {
  useFetchOrderQuery,
  useFetchOrdersQuery,
  useCheckOrderStatusQuery,
  useCheckoutMutation,
  useCheckoutWithCashMutation,
} = orderAPI;
