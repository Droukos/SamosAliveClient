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
      getGreatestRole: (roles) => {
        return roles.reduce(function (accumulator, currentValue) {
          if(accumulator != currentValue) {
            let sp1 = accumulator.code.split("\\.");
            let sp2 = currentValue.code.split("\\.");
            let lvl0R1 = parseInt(sp1[0]);
            let lvl1R1 = parseInt(sp1[1]);
            let lvl0R2 = parseInt(sp2[0]);
            let lvl1R2 = parseInt(sp2[1]);
            if(lvl0R1 > lvl0R2) return currentValue;
            else if(lvl0R1 == lvl0R2) return (lvl1R1> lvl1R2)? accumulator : currentValue ;
            else return accumulator;
          }
          return accumulator;
        });
      },
      getRoleForLocale: (role) => {
        console.log(role);
        
        let splitRole = role.code.split(".");

        if (splitRole[0] == "0") return "admins."+splitRole[1];
        else if(splitRole[0] == "10000") return "users."+splitRole[1];
      },
      getAdminColor: (adminRole) => {
      
      },
      getUserColor: (userRole) => {
        if(userRole == "10000") return "|blue--text text--lighten-2"; //"User";
      },
      getUserRoleColorLabel: (role) => {
        role = role.code;
        //let splitRole = role[0].code.split(".");

        
        if(role == "0.0") return "|red--text text--darken-4"; //"General Admin";
        else if (role == "0.1000") return "|purple--text text--lighten-1"; //"Area Admin";

        //if (role == "0.0") return "red--text text--darken-4"; //"General Admin";
        //else if (role == "0.10") return "purple--text text--lighten-1"; //"Area Admin";
        //else if (role == 100) return "Rescuer";
        //else if (role == 101) return "Defribrillator Manager";
        //else if (role == 102) return "Defribrillator Company Service";
        //else if (role == 200) return "EKAB";
        else if (role == "10000.10000") return "blue--text text--lighten-2"; //"User";
        //else if (role == 10000) return "Guest";
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