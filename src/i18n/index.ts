import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh from './locales/zh';
import en from './locales/en';
import { Locale } from '../utils/enums';

const resources = {
  [Locale.ZH]: zh,
  [Locale.EN]: en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: Locale.ZH,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
