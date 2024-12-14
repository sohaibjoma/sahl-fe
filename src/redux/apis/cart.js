import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithAuth } from '../helpers/baseQuery';
import { errorHandler } from '../helpers/errorHandler';
import { setCartItems } from '../../modules/Cart/state';

export const cartAPI = createApi({
  reducerPath: 'cartAPI',
  refetchOnReconnect: true,
  tagTypes: ['cart'],
  baseQuery: customBaseQueryWithAuth,
  endpoints: (build) => ({
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
  }),
});

export const {
  useLazyFetchCartItemsQuery,
  useAddItemToCartMutation,
  useUpdateItemInCartMutation,
  useDeleteItemFromCartMutation,
} = cartAPI;
