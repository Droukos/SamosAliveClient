import Vue from "vue";
import Vuetify from "vuetify/lib";
import {
  mdiAccount,
  mdiApps,
  mdiAccountOutline,
  mdiDoorOpen,
  mdiKey,
  mdiKeyOutline,
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
  mdiInformation,
  mdiTranslate,
  mdiArrowLeft,
  mdiMenu,
  mdiChevronDown,
  mdiChevronRight,
  mdiThemeLightDark,
  mdiDatabase,
  mdiAt,
  mdiCheckOutline,
  mdiHelpCircleOutline,
  mdiCancel,
  mdiAlarmLight,
  mdiHospitalBox,
  mdiMedicalBag,
  mdiAccessPoint,
  mdiHistory,
  mdiAntenna,
  mdiCamera,
  mdiOpenInNew
} from "@mdi/js";

Vue.use(Vuetify);

const MY_ICONS = {
  account: mdiAccount,
  accountOut: mdiAccountOutline,
  key: mdiKey,
  keyOut: mdiKeyOutline,
  eye: mdiEye,
  eyeOff: mdiEyeOff,
  email: mdiAt,
  close: mdiClose,
  home: mdiHome,
  theme: mdiThemeLightDark,
  moon: mdiWeatherNight,
  sun: mdiWhiteBalanceSunny,
  messages: mdiMessage,
  news: mdiNewspaperVariant,
  profile: "fas fa-address-card",
  translate: mdiTranslate,
  menu: mdiMenu,
  info: mdiInformation,
  settings: mdiCog,
  search: mdiMagnify,
  doorOpen: mdiDoorOpen,
  back: mdiArrowLeft,
  chevDown: mdiChevronDown,
  chevRight: mdiChevronRight,
  checkOut: mdiCheckOutline,
  helpCircleOut: mdiHelpCircleOutline,
  cancel: mdiCancel,
  database: mdiDatabase,
  history: mdiHistory,
  apps: mdiApps,
  alarm: mdiAlarmLight,
  hospital: mdiHospitalBox,
  medicalBag: mdiMedicalBag,
  accessPoint: mdiAccessPoint,
  openNew: mdiOpenInNew,
  liveEv: mdiAccessPoint,
  livePr: mdiAntenna,
  camera: mdiCamera,
  liveEvent: "fas fa-heartbeat",
  appbar: "deep-purple darken-3"
};

export default new Vuetify({
  icons: {
    values: MY_ICONS,
    iconfont: "mdiSvg"
  },
  theme: {
    themes: {
      light: {
        primary: "#443dd1",
        secondary: "#21612d",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  }
});
