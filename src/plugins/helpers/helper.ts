import i18n from "@/plugins/i18n";
import { TranslateResult } from "vue-i18n";
import { Role } from "@/types";

const createDate = (date: number[]) => {
  return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
};
export default new (class Helper {
  public install(Vue: any) {
    Vue.prototype.$helper = this;
  }
  usernameHashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  }
  convDate(date: number[], format: string, lang: string) {
    return i18n.d(createDate(date), format, lang);
  }
  getGreatestRole(roles: any) {
    return roles.reduce(function(
      accumulator: { code: string },
      currentValue: { code: string }
    ) {
      if (accumulator != currentValue) {
        const sp1 = accumulator.code.split("\\.");
        const sp2 = currentValue.code.split("\\.");
        const lvl0R1 = parseInt(sp1[0]);
        const lvl1R1 = parseInt(sp1[1]);
        const lvl0R2 = parseInt(sp2[0]);
        const lvl1R2 = parseInt(sp2[1]);
        if (lvl0R1 > lvl0R2) return currentValue;
        else if (lvl0R1 == lvl0R2)
          return lvl1R1 > lvl1R2 ? accumulator : currentValue;
        else return accumulator;
      }
      return accumulator;
    });
  }
  //getAdminColor: (adminRole) => {
  //
  //},
  //getUserColor: (userRole) => {
  //  if(userRole == "10000") return "|blue--text text--lighten-2"; //"User";
  //},
  getUserRoleColorLabel(role: string) {
    const roleCode = role;

    if (roleCode == "0.0") return "red darken-4";
    //"General Admin";
    else if (roleCode == "0.1000") return "purple lighten-1";
    //"Area Admin";
    //if (role == "0.0") return "red--text text--darken-4"; //"General Admin";
    //else if (role == "0.10") return "purple--text text--lighten-1"; //"Area Admin";
    //else if (role == 100) return "Rescuer";
    //else if (role == 101) return "Defribrillator Manager";
    //else if (role == 102) return "Defribrillator Company Service";
    //else if (role == 200) return "EKAB";
    else if (roleCode == "10000.10000") return "blue lighten-2"; //"User";
    //else if (role == 10000) return "Guest";
  }
  getUserStatusColorLabel(status: any) {
    status = parseInt(status);
    if (status == 0) return "grey--text text--darken-1";
    //Offline
    else if (status == 1) return "blue--text text--lighten-2";
    //Online
    else if (status == 2) return "red--text text--darken-4";
    //Busy
    else if (status == 3) return "deep-purple--text text--accent-2";
    //On Duty
    else if (status == 4) return "orange--text text--lighten-2"; //Away
  }
  isGeneralAdmin(roles: Role[]): boolean {
    //return roles == 0;
    return true;
  }

  isAreaAdmin(roles: Role[]): boolean {
    //return roles == 10;
    return true;
  }

  filterInfo(jsonData: any) {
    return jsonData != undefined && true ? jsonData : "";
  }
})();

declare module "vue/types/vue" {
  interface Vue {
    $helper: {
      filterInfo(jsonData: any): any;
      convDate(date: number[], format: string, lang: string): TranslateResult;
      getGreatestRole(roles: Role[]): Role;
      usernameHashCode(str: string): string;
      getRoleForLocale(role: Role): string;
      getUserRoleColorLabel(role: string): string;
      getUserStatusColorLabel(status: any): string;
      isGeneralAdmin(roles: Role[]): boolean;
      isAreaAdmin(roles: Role[]): boolean;
    };
  }
}
