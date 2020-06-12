import Vue from 'vue';
//import Vuetify from 'vuetify';
import Vuetify from 'vuetify/lib';
//import colors from 'vuetify/lib/util/colors';
//import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

const MY_ICONS = {
    account: 'fas fa-user',
    key: 'fas fa-key',
    home: 'fas fa-home',
    moon: 'fas fa-moon',
    sun: 'fas fa-sun',
    messages: 'fas fa-envelope',
    news: 'fas fa-newspaper',
    profile: 'fas fa-address-card', 
    infos: 'fas fa-info-circle',
    settings: 'fas fa-cogs',
    search: 'fas fa-search',
    back: 'fas fa-arrow-alt-circle-left',
    appbar: 'deep-purple darken-3'
  };

  const COMPONENTS_COLORS = {
      appbar: 'deep-purple darken-3'
  };

const opts = {
    icons: {
        values: MY_ICONS,
     },
    theme: {
        themes: {
          light: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
         options: { variations: false },
      },
};

export default new Vuetify(opts);