import i18n from '@/plugins/i18n.js';

const createDate = (date) => {
    return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
};
export default {
  install: (Vue) => {
    Vue.prototype.$helper = {
      usernameHashCode: (str) => {
        if (typeof str !== 'string') return;
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        var c = (hash & 0x00ffffff).toString(16).toUpperCase();
        return "#"+"00000".substring(0, 6 - c.length) + c;
      },
      convDate: (date, format, lang) => {
        return i18n.d(createDate(date), format, lang);
      }, 
      getUserRoleColorLabel: (role) => {
        role = parseInt(role);
        if (role == 0) return "red--text text--darken-4"; //"General Admin";
        else if (role == 10) return "purple--text text--lighten-1"; //"Area Admin";
        else if (role == 100) return "Rescuer";
        else if (role == 101) return "Defribrillator Manager";
        else if (role == 102) return "Defribrillator Company Service";
        else if (role == 200) return "EKAB";
        else if (role == 1000) return "blue--text text--lighten-2"; //"User";
        else if (role == 10000) return "Guest";
      },
      getUserStatusColorLabel: (status) => {
        status = parseInt(status);
        if (status == 0) return "grey--text text--darken-1"; //Offline
        else if (status == 1) return "blue--text text--lighten-2"; //Online
        else if (status == 2) return "red--text text--darken-4"; //Busy
        else if (status == 3) return "deep-purple--text text--accent-2"; //On Duty
        else if (status == 4) return "orange--text text--lighten-2"; //Away
      },
      isGeneralAdmin: (role) => {
        return role == 0;
      },
      isAreaAdmin: (role) => {
        return role == 10;
      }
      
    };
  }
};