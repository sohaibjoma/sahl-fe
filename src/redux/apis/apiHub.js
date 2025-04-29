import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';
import { setCartItems } from '../../modules/Cart/state';
import { generateUrlParams } from '../../utils/paramsUtil';

export const apiHub = createApi({
  baseQuery: customBaseQueryWithAuth,
  refetchOnReconnect: true,
  tagTypes: ['cart', 'order'],
  endpoints: (build) => ({
    // Cart Endpoints
    fetchCartItems: build.query({
      query: () => ({
        url: '/cart',
      }),
      transformResponse: (result) => result,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            dispatch(
              setCartItems({
                items: result.data.data.products,
                meta: result.data?.meta,
              })
            );
          })
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['cart'],
    }),
    addItemToCart: build.mutation({
      query: (body) => ({
        url: '/cart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    updateItemInCart: build.mutation({
      query: (body) => ({
        url: `/cart/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    deleteItemFromCart: build.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cart'],
    }),

    // Order Endpoints
    fetchOrder: build.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      transformResponse: (result) => result.data,
      providesTags: ['order'],
    }),

    fetchOrders: build.query({
      query: (params = {}) => ({
        url: `/orders?${
          params?.filters ? generateUrlParams([...params.filters]) : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['order'],
    }),

    checkOrderStatus: build.query({
      query: (id) => ({
        url: `/orders/validate/${id}`,
        method: 'GET',
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {})
          .catch(({ error: err }) => {
            errorHandler(dispatch, err.data);
          });
      },
      providesTags: ['order'],
    }),
    checkout: build.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      transformResponse: (result) => result.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((result) => {
            window.location.href = result.data.redirect_url;
          })
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
  useLazyFetchCartItemsQuery,
  useAddItemToCartMutation,
  useUpdateItemInCartMutation,
  useDeleteItemFromCartMutation,
  useFetchOrderQuery,
  useFetchOrdersQuery,
  useLazyCheckOrderStatusQuery,
  useCheckoutMutation,
  useCheckoutWithCashMutation,
} = apiHub;
