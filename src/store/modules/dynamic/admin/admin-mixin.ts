import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import { PreviewUser } from "@/types";
import { searchPreviewUsers } from "@/plugins/search-util";
import {
  BannedUsers,
  BanUsers,
  ChangeRolePreviewUser,
  ChangeRoles, IMutToAdminList,
  BanPreviewUser,
  UpdatePreviewUser,
  UpRoles
} from "@/types/admin";
import {authApi} from "@/plugins/api/api-urls";
import {adminRequestResponse} from "@/plugins/admin-util";
import {adminOptions} from "@/plugins/enums/admin-options";

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

  @Mutation
  setPreviewUsers(previewUsers: PreviewUser[]) {
    console.log(previewUsers);
    this.previewUsers = previewUsers;
  }

  @Mutation
  setPrUserToAdminList(data: IMutToAdminList) {
    if(data.adminOption === adminOptions.BAN_USERS) {
      this.prUsersToBan.push({previewUser: data.prUser, duration: -1});
    }
    else if(data.adminOption === adminOptions.UNBAN_USERS) {
      this.prUsersToUnban.push(data.prUser);
    }
    else if(data.adminOption === adminOptions.CHANGE_ROLES) {
      this.prUsersToChangeRole.push({previewUser: data.prUser, oldRole:"", newRole:""});
    }
    else if(data.adminOption === adminOptions.ADD_ROLES) {
      this.prUsersToAddRole.push({previewUser: data.prUser, updateRole:""});
    }
    else if(data.adminOption === adminOptions.DEL_ROLES) {
      this.prUsersToDelRole.push({previewUser: data.prUser, updateRole:""});
    }
  }

  //@Mutation
  //replacePrUserToAdminList(data: IMutToAdminList) {
  //  if(data.adminOption === adminOptions.BAN_USERS) {
  //    this.prUsersToBan = this.prUsersToBan
  //  }
  //}

  @Mutation
  removeUserFromList(data: IMutToAdminList) {
    if(data.adminOption == adminOptions.BAN_USERS) {
      this.prUsersToBan = this.prUsersToBan.filter(banUser => banUser.previewUser.id !== data.prUser.id)
    }
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

  @Action({commit: "setPreviewUsers"})
  async fetchUsersPreview(user: string): Promise<PreviewUser[]> {
    return searchPreviewUsers(user);
  }
}
