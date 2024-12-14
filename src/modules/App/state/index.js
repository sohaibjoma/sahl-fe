import { createSlice } from '@reduxjs/toolkit';
import secureLocalStorage from 'react-secure-storage';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    currentUser: {},
    language: localStorage.getItem('language')
      ? localStorage.getItem('language')
      : 'en',
    snackbar: {
      open: false,
      message: '',
      severity: '',
    },
  },
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload;
      localStorage.setItem('language', payload);
      document.dir = payload.language === 'en' ? 'ltr' : 'rtl';
      window.location.reload();
    },
    toggleSnackbar: (state, { payload }) => {
      state.snackbar.open = payload.open;
      state.snackbar.message = payload.message;
      state.snackbar.severity = payload.severity;
    },
    setCurrentUser: (state, { payload }) => {
      secureLocalStorage.setItem('user', JSON.stringify(payload));
      state.currentUser = payload;
    },
    toggleIsLoading: (state, { payload }) => {
      state.isLoading = payload.isLoading;
    },
  },
});

export const { toggleIsLoading, setLanguage, toggleSnackbar, setCurrentUser } =
  appSlice.actions;

export const appSelector = (state) => state.app;
