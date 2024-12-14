import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    addresses: [],
    defaultAddress: {},
  },
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setDefaultAddress: (state, action) => {
      state.defaultAddress = action.payload;
    },
  },
});

export const { setAddresses, setDefaultAddress } = accountSlice.actions;

export const accountSelector = (state) => state.account;
