import i18n from "@/plugins/i18n";
import { TranslateResult } from "vue-i18n";
import { Role } from "@/types";
import { roles } from "@/plugins/enums/roles";
import {availability} from "@/plugins/enums/user/status/status";

const createDate = (date: number[]) => {
  return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
};
const parseISOLocal = (data: string) => {
  const b = data.split(/\D/);
  return new Date(
    parseInt(b[0]),
    parseInt(b[1]) - 1,
    parseInt(b[2]),
    parseInt(b[3]),
    parseInt(b[4]),
    parseInt(b[5])
  );
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
  adjustColor(color: string, amount: number) {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color: string) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
              16
            )
          ).substr(-2)
        )
    );
  }
  getColorLuma(color: string) {
    const c = color.substring(1); // strip #
    const rgb = parseInt(c, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue

    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }
  convDate(date: number[], format: string, lang: string) {
    return i18n.d(createDate(date), format, lang);
  }

  convDate2(date: string, format: string, lang: string) {
    return i18n.d(parseISOLocal(date), format, lang);
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
  getUserRoleColorLabel(roleCode: string) {
    if (roleCode == roles.GENERAL_ADMIN || roleCode == "0.0")
      return "red darken-4";
    //"General Admin";
    else if (roleCode == roles.RESCUER || roleCode == "100.100")
      return "purple lighten-1";
    else if (roleCode == roles.TECHNICIAN || roleCode == "110.100")
      return "orange darken-2";
    //"Area Admin";
    //if (role == "0.0") return "red--text text--darken-4"; //"General Admin";
    //else if (role == "0.10") return "purple--text text--lighten-1"; //"Area Admin";
    //else if (role == 100) return "Rescuer";
    //else if (role == 101) return "Defribrillator Manager";
    //else if (role == 102) return "Defribrillator Company Service";
    //else if (role == 200) return "EKAB";
    else if (roleCode == roles.USER || roleCode == "10000.10000")
      return "blue lighten-2"; //"User";
    //else if (role == 10000) return "Guest";
  }
  getUserRoleColorText(roleCode: string) {
    if (roleCode == roles.GENERAL_ADMIN) return "red--text text--darken-4";
    //"General Admin";
    else if (roleCode == roles.TECHNICIAN)
      return "purple--text text--lighten-1";
    else if (roleCode == roles.RESCUER) return "orange--text text--darken-2";
    //"Area Admin";
    //if (role == "0.0") return "red--text text--darken-4"; //"General Admin";
    //else if (role == "0.10") return "purple--text text--lighten-1"; //"Area Admin";
    //else if (role == 100) return "Rescuer";
    //else if (role == 101) return "Defribrillator Manager";
    //else if (role == 102) return "Defribrillator Company Service";
    //else if (role == 200) return "EKAB";
    else if (roleCode == roles.USER) return "blue--text text--lighten-2"; //"User";
  }
  getUserStatusColorLabel(status: any) {
    status = parseInt(status);
    if (status == availability.OFFLINE) return "grey--text text--darken-1";
    else if (status == availability.ONLINE) return "blue--text text--lighten-2";
    else if (status == availability.BUSY) return "red--text text--darken-4";
    else if (status == availability.ON_DUTY) return "deep-purple--text text--accent-2";
    else if (status == availability.AWAY) return "orange--text text--lighten-2";
    else if (status == availability.TEMP_BANNED) return "red--text text--darken-2";
    else if (status == availability.PERM_BANNED) return "red--text text--darken-1";
  }
  isGeneralAdmin(roles: Role[]): boolean {
    const adminRole = roles.find(role => {
      return role.code == "0.0";
    });
    return adminRole != null || adminRole != undefined;
  }

  isAreaAdmin(roles: Role[]): boolean {
    const adminRole = roles.find(role => {
      return role.code == "0.1000";
    });
    return adminRole != null || adminRole != undefined;
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
      convDate2(date: string, format: string, lang: string): TranslateResult;
      getGreatestRole(roles: Role[]): Role;
      usernameHashCode(str: string): string;
      adjustColor(color: string, amount: number): string;
      getColorLuma(color: string): number;
      getRoleForLocale(role: Role): string;
      getUserRoleColorText(roleCode: string): string;
      getUserRoleColorLabel(roleCode: string): string;
      getUserStatusColorLabel(status: any): string;
      isGeneralAdmin(roles: Role[]): boolean;
      isAreaAdmin(roles: Role[]): boolean;
    };
  }
}
