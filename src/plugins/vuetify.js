import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import {
 mdiAccount,
 mdiKey,
 mdiEye,
 mdiEyeOff,
 mdiClose,
 mdiWhiteBalanceSunny,
 mdiWeatherNight,
 mdiMessage,
 mdiHome,
 mdiNewspaperVariant,
 mdiCog,
 mdiMagnify,
 mdiArrowLeft
} from '@mdi/js';

Vue.use(Vuetify);

const MY_ICONS = {
  account: mdiAccount,
  key: mdiKey,
  eye: mdiEye,
  eyeoff: mdiEyeOff,  
  close: mdiClose,
  home: mdiHome,
  moon: mdiWeatherNight,
  sun: mdiWhiteBalanceSunny,
  messages: mdiMessage,
  news: mdiNewspaperVariant,
  profile: 'fas fa-address-card', 
  infos: 'fas fa-info-circle',
  settings: mdiCog,
  search: mdiMagnify,
  back: mdiArrowLeft,
  appbar: 'deep-purple darken-3'
};

export default new Vuetify({
  icons: {
    values: MY_ICONS,
    iconfont: 'mdiSvg',
 },
  theme: {
    //  options: {
    //    customProperties: true,
    //  },
    themes: {
      light: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
