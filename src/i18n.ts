import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vn from './data/vn.json';
import en from './data/en.json';
import cn from './data/cn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vn: { translation: vn },
      en: { translation: en },
      cn: { translation: cn },
    },
    lng: localStorage.getItem('language') || 'vn',
    fallbackLng: 'vn',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;