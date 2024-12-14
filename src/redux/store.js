import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import All APIs
import { apiHub } from './apis/apiHub';
import { appAPI } from './apis/app';
import { accountAPI } from './apis/account';
import { authAPI } from './apis/auth';
// import { cartAPI } from './apis/cart';
import { categoryAPI } from './apis/category';
// import { orderAPI } from './apis/order';
import { productAPI } from './apis/product';

// Import all slices
import { appSlice } from '../modules/App/state';
import { accountSlice } from '../modules/Account/state';
import { authSlice } from '../modules/Auth/state';
import { cartSlice } from '../modules/Cart/state';
import { homeSlice } from '../modules/Home/state';

// Import 401 handler middleware
import { requestInterceptor } from './middlewares/requestInterceptor';

const apis = [
  apiHub,
  appAPI,
  accountAPI,
  authAPI,
  // cartAPI,
  categoryAPI,
  // orderAPI,
  productAPI,
];

const slices = [appSlice, accountSlice, authSlice, cartSlice, homeSlice];

const store = configureStore({
  reducer: {
    ...apis.reduce(
      (acc, api) => ({ ...acc, [api.reducerPath]: api.reducer }),
      {}
    ),
    ...slices.reduce(
      (acc, slice) => ({ ...acc, [slice.name]: slice.reducer }),
      {}
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apis.map((api) => api.middleware))
      .concat(requestInterceptor),
});

setupListeners(store.dispatch);

export default store;
