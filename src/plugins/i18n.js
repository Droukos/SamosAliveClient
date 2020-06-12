import Vue from "vue";
import VueI18n from "vue-i18n";
import english from '@plugins/locales/en.js';
import greek from '@plugins/locales/el.js';

Vue.use(VueI18n);

const messages = {
    en: english,
    el: greek
};

const dateTimeFormats = {
    'en': {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
      }
    },
    'el': {
        short: {
            year: 'numeric', month: 'short', day: 'numeric'
        },
        long: {
          year: 'numeric', month: 'short', day: 'numeric',
          weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
        }
    }
    
  };


const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
    dateTimeFormats
});

export default i18n;