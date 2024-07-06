import i18n from "i18next";
import 'intl-pluralrules';
import DeviceInfo from "react-native-device-info";
import { initReactI18next } from "react-i18next";

import en from '@assets/locales/en/strings.json';
import vn from '@assets/locales/vn/strings.json';

const languageDetector = {
    type: "languageDetector",
    detect: () => DeviceInfo.getDeviceLocale(),
    init: () => { },
    cacheUserLanguage: () => { }
};

const resources = {
    en: {
      translation: en,
    },
    vn: {
      translation: vn
    }
  };

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    //.use(languageDetector)
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;