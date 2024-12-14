import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './resources';

i18n.use(initReactI18next).init({
  resources,
  lng:
    localStorage?.getItem('language') != null
      ? localStorage?.getItem('language')
      : 'ar',
  fallbackLng: 'en',
  supportedLngs: ['ar', 'en'],

  defaultNS: 'fallback',
  fallbackNS: 'fallback',

  keySeparator: '.',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
