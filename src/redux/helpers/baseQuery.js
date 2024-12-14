import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const buildURLQueryParams = (queryParams) => {
  const urlParams = new URLSearchParams();

  for (const key in queryParams) {
    if (queryParams[key] && typeof queryParams[key] !== 'object') {
      urlParams.append(key, queryParams[key]);
    } else if (queryParams[key] instanceof Array && !!queryParams[key].length) {
      urlParams.append(key, queryParams[key].join(','));
    }
  }

  return urlParams.toString();
};

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    headers.set('Accept', `application/json`);
    headers.set('Content-Type', `application/json`);
    headers.set('Authorization', `Bearer ${token}`);
    headers.set(
      'locale',
      localStorage?.getItem('language') != null
        ? localStorage?.getItem('language')
        : 'ar'
    );

    return headers;
  },
  paramsSerializer: buildURLQueryParams,
});

export const customBaseQueryWithAuth = async (args, api, extraOptions) => {
  return await baseQueryWithAuth(args, api, extraOptions);
};

const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Accept', `application/json`);
    headers.set('Content-Type', `application/json`);
    headers.set(
      'locale',
      localStorage?.getItem('language') != null
        ? localStorage?.getItem('language')
        : 'ar'
    );

    return headers;
  },
  paramsSerializer: buildURLQueryParams,
});

export const customBaseQueryWithoutAuth = async (args, api, extraOptions) => {
  return await baseQueryWithoutAuth(args, api, extraOptions);
};
