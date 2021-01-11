import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { PreviewUser } from "@/types";
import { searchPreviewUsers } from "@/plugins/search-util";
import {
  BannedUsers,
  BanUsers,
  ChangeRolePreviewUser,
  ChangeRoles,
  IMutToAdminList,
  BanPreviewUser,
  UpdatePreviewUser,
  UpRoles,
  ReplacePrUser,
  IMutRmElemAdminList
} from "@/types/admin";
import { authApi } from "@/plugins/api/api-urls";
import {
  adminRequestResponse, buildUpdateRole,
  isAddRoleListInvalid, isBanListInvalid,
  isChangeRoleListInvalid,
  isDelRoleListInvalid
} from "@/plugins/admin-util";
import { adminOptions, adminProcOptions } from "@/plugins/enums/admin-options";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "adminMixin"
})
export default class AdminMixin extends VuexModule {
  previewUsers: PreviewUser[] = [];
  undecidedPrUsers: PreviewUser[] = [];
  prUsersToBan: BanPreviewUser[] = [];
  prUsersToUnban: PreviewUser[] = [];
  prUsersToChangeRole: ChangeRolePreviewUser[] = [];
  prUsersToAddRole: UpdatePreviewUser[] = [];
  prUsersToDelRole: UpdatePreviewUser[] = [];
  banBtnDis = true;
  unbanBtnDis = true;
  changeRoleBtnDis = true;
  addRoleBtnDis = true;
  delRoleBtnDis = true;
  banProcStat = adminProcOptions.NOT_READY;
  unbanProcStat = adminProcOptions.NOT_READY;
  changeRoleProcStat = adminProcOptions.NOT_READY;
  addRoleProcStat = adminProcOptions.NOT_READY;
  delRoleProcStat = adminProcOptions.NOT_READY;

  @Mutation
  setPreviewUsers(previewUsers: PreviewUser[]) {
    this.previewUsers = previewUsers;
  }

  @Mutation
  setPrUserToAdminList(data: IMutToAdminList) {
    let foundDuplicate = false;
    if (data.adminOption === adminOptions.BAN_USERS) {
      let foundNaN = false;
      for (const elem of this.prUsersToBan) {
        if (elem.previewUser.user == data.prUser.user) foundDuplicate = true;
        if (isNaN(elem.duration)) foundNaN = true;
      }
      if (!foundDuplicate) {
        this.prUsersToBan.push({ previewUser: data.prUser, duration: -1 });
      }
      this.banBtnDis = foundNaN;
    } else if (data.adminOption === adminOptions.UNBAN_USERS) {
      for (const elem of this.prUsersToUnban) {
        if (elem.user == data.prUser.user) return;
      }
      this.prUsersToUnban.push(data.prUser);
      this.unbanBtnDis = false;
    } else if (data.adminOption === adminOptions.CHANGE_ROLES) {
      for (const elem of this.prUsersToChangeRole) {
        if (elem.previewUser.user == data.prUser.user) return;
      }
      this.prUsersToChangeRole.push({
        previewUser: data.prUser,
        oldRoleError: false,
        newRoleError: false,
        oldRole: "",
        newRole: ""
      });
    } else if (data.adminOption === adminOptions.ADD_ROLES) {
      for (const elem of this.prUsersToAddRole) {
        if (elem.previewUser.user == data.prUser.user) return;
      }
      this.prUsersToAddRole.push({ previewUser: data.prUser, updateRole: "" });
    } else if (data.adminOption === adminOptions.DEL_ROLES) {
      for (const elem of this.prUsersToDelRole) {
        if (elem.previewUser.user == data.prUser.user) return;
      }
      this.prUsersToDelRole.push({ previewUser: data.prUser, updateRole: "" });
    } else if(data.adminOption === adminOptions.MIXIN) {
      this.undecidedPrUsers.push(data.prUser);
    }
  }

  @Mutation
  replacePrUserToAdminList(data: ReplacePrUser) {
    if (data.adminOption === adminOptions.BAN_USERS) {
      this.prUsersToBan[data.index].duration = data.duration!;
      this.banBtnDis = isBanListInvalid(this.prUsersToBan);
    } else if (data.adminOption === adminOptions.CHANGE_ROLES) {
      this.prUsersToChangeRole[data.index] = {
        previewUser: data.prUser,
        oldRoleError: data.chRoleOldRoleError!,
        newRoleError: data.chRoleNewRoleError!,
        oldRole: data.oldRole!,
        newRole: data.newRole!
      };
      this.changeRoleBtnDis = isChangeRoleListInvalid(this.prUsersToChangeRole);
    } else if (data.adminOption === adminOptions.ADD_ROLES) {
      this.prUsersToAddRole[data.index] = buildUpdateRole(data);
      this.addRoleBtnDis = isAddRoleListInvalid(this.prUsersToAddRole);
    } else if (data.adminOption === adminOptions.DEL_ROLES) {
      this.prUsersToDelRole[data.index] = buildUpdateRole(data);
      this.delRoleBtnDis = isDelRoleListInvalid(this.prUsersToDelRole);
    }
  }

  @Mutation
  removeUserFromList(data: IMutRmElemAdminList) {
    if (data.adminOption == adminOptions.BAN_USERS) {
      this.prUsersToBan.splice(data.index, 1);
    } else if (data.adminOption === adminOptions.UNBAN_USERS) {
      this.prUsersToUnban.splice(data.index, 1);
    } else if (data.adminOption === adminOptions.CHANGE_ROLES) {
      this.prUsersToChangeRole.splice(data.index, 1);
    } else if (data.adminOption === adminOptions.ADD_ROLES) {
      this.prUsersToAddRole.splice(data.index, 1);
      this.addRoleBtnDis = isAddRoleListInvalid(this.prUsersToAddRole);
    } else if (data.adminOption === adminOptions.DEL_ROLES) {
      this.prUsersToDelRole.splice(data.index, 1);
      this.delRoleBtnDis = isDelRoleListInvalid(this.prUsersToDelRole);
    } else if (data.adminOption === adminOptions.MIXIN) {
      this.undecidedPrUsers.splice(data.index, 1);
    }
  }

  @Mutation
  clearAdminList(data: number) {
    if (data === adminOptions.BAN_USERS) {
      this.prUsersToBan = [];
      this.banBtnDis = true;
      this.banProcStat = adminProcOptions.FINISHED;
    } else if (data === adminOptions.UNBAN_USERS) {
      this.prUsersToUnban = [];
      this.unbanBtnDis = true;
      this.unbanProcStat = adminProcOptions.FINISHED;
    } else if (data === adminOptions.CHANGE_ROLES) {
      this.prUsersToChangeRole = [];
      this.changeRoleBtnDis = true;
      this.changeRoleProcStat = adminProcOptions.FINISHED;
    } else if (data === adminOptions.ADD_ROLES) {
      this.prUsersToAddRole = [];
      this.addRoleBtnDis = true;
      this.addRoleProcStat = adminProcOptions.FINISHED;
    } else if (data === adminOptions.DEL_ROLES) {
      this.prUsersToDelRole = [];
      this.delRoleBtnDis = true;
      this.delRoleProcStat = adminProcOptions.FINISHED;
    }
    this.previewUsers = [];
  }

  @Mutation
  initData() {
    this.previewUsers = [];
  }

  @Action
  async banUsers(data: BanUsers) {
    return adminRequestResponse(data, authApi.authBanUsers);
  }

  @Action
  async unbanUsers(data: BannedUsers) {
    return adminRequestResponse(data, authApi.authUnbanUsers);
  }

  @Action
  async changeRoles(data: ChangeRoles) {
    return adminRequestResponse(data, authApi.authUsersRoleChange);
  }

  @Action
  async addRoles(data: UpRoles) {
    return adminRequestResponse(data, authApi.authUsersRoleAdd);
  }

  @Action
  async delRoles(data: UpRoles) {
    return adminRequestResponse(data, authApi.authUsersRoleDel);
  }

  @Action({ commit: "setPreviewUsers" })
  async fetchUsersPreview(user: string): Promise<PreviewUser[]> {
    return searchPreviewUsers(user);
  }
}
