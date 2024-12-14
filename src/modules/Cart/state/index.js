import { createSlice } from '@reduxjs/toolkit';
import secureLocalStorage from 'react-secure-storage';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems:
      localStorage?.getItem('token') === null
        ? []
        : JSON.parse(secureLocalStorage.getItem('cartItems') ?? '[]'),
  },
  reducers: {
    setCartItems: (state, { payload }) => {
      state.cartItems = payload;
      secureLocalStorage.setItem('cartItems', JSON.stringify(payload));
    },
    setCartItemsQuantity: (state, { payload }) => {
      const { id, quantity } = payload;
      const index = state.cartItems.findIndex((item) => item.id === id);
      state.cartItems[index].quantity = quantity;
      secureLocalStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { setCartItems, setCartItemsQuantity } = cartSlice.actions;

export const cartSelector = (state) => state.cart;
