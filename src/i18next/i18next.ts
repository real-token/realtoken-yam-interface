import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';

import { resources } from './locales';

export const DEFAULT_NS = 'common';
export const FALLBACK_LNG = 'en';

i18next.use(initReactI18next).init({
  resources: resources,
  defaultNS: DEFAULT_NS,
  fallbackLng: FALLBACK_LNG,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
});

export { i18next };
