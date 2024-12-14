import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage?.getItem('token') ?? null,
  },
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      state.token = payload.token;
    },
    logout: (state) => {
      state.token = '';
      localStorage.clear();
      window.location.reload();
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authSelector = (state) => state.auth;
