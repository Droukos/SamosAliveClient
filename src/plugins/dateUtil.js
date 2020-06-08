import i18n from './i18n.js';

const createDate = (date) => {
    return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
};

export default {
    install: (Vue, options) => {
      Vue.prototype.$dateUtils = {
            convDate: (date, format, lang) => {
                return i18n.d(createDate(date), format, lang);
            },
            compDate: (date1, date2) => {

            },
            

      };

    }
};