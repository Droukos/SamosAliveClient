import Vue from "vue";
import VueI18n from "vue-i18n";
import english from "@/plugins/i18n/locales/en.json";
import greek from "@/plugins/i18n/locales/el.json";

Vue.use(VueI18n);

const messages = {
  en: {
    ...english
  },
  el: {
    ...greek
  }
};

const dateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  },
  el: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  }
};

export default new VueI18n({
  locale: "en", // set locale
  messages, // set locale messages
  dateTimeFormats
});
