import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import Vue from "vue";
import api, {
  setBearerAccToken,
  userConn,
  authConn,
  aedConn,
  authRSocket,
  userRSocket,
  accessToken, newsConn
} from "@/plugins/api";
import { apiWithVar, authApi, userApi } from "@/plugins/api/apiUrls";
import {
  LoginResponse,
  PersonalInfo,
  Phones,
  Role,
  UserInfo,
  UserLogin,
  UserRegister
} from "@/types";
import VueCookies from "vue-cookies";
import { AxiosResponse } from "axios";
import {
  bufToJson,
  dataBuf,
  metadataBuf,
  metadataOnlyRoute
} from "@/plugins/api/rsocketUtil";

Vue.use(VueCookies);

@Module({ namespaced: true })
export default class User extends VuexModule implements UserInfo {
  userid = "";
  username = "";
  name = "";
  surname = "";
  email = "";
  avatar: string | undefined;
  roleModels: Role[] = [];
  countryCode: string | undefined;
  country: string | undefined;
  province: string | undefined;
  city: string | undefined;
  street: string | undefined;
  address: string | undefined;
  description: string | undefined;
  phones: Phones | undefined;

  status: number | undefined;
  online: boolean | undefined;
  availability: number | undefined;

  lastLoginAndroid: number[] | undefined;
  lastLogoutAndroid: number[] | undefined;
  lastLoginIos: number[] | undefined;
  lastLogoutIos: number[] | undefined;
  lastLoginWeb: number[] | undefined;
  lastLogoutWeb: number[] | undefined;

  userCreated: number[] | undefined;
  userUpdated: number[] | undefined;

  @Mutation
  setAvatar(avatar: string) {
    this.avatar = avatar;
  }

  @Mutation
  setUserData(data: AxiosResponse<LoginResponse>) {
    if (data == undefined) return;
    const loginData = data.data;
    setBearerAccToken(loginData.accessToken);
    Vue.$cookies.set("loggedIn", true);
    this.userid = loginData.userid;
    this.username = loginData.username;
    this.name = loginData.name;
    this.surname = loginData.surname;
    this.email = loginData.email;
    this.avatar = loginData.avatar;
    this.description = loginData.description;
    this.roleModels = loginData.roleModels;
    this.online = loginData.online;
    this.availability = loginData.availability;
  }

  //@Mutation
  //updateUserData(userInfo: UserInfo) {
//
  //}

  @Mutation
  clearUserData() {
    Vue.$cookies.remove("loggedIn");
    this.userid = "";
    this.username = "";
    this.name = "";
    this.surname = "";
    this.email = "";
    this.avatar = "";
    this.description = "";
    this.online = false;
    this.availability = undefined;
    this.roleModels = [];
  }

  @Mutation
  setPersonalInfo(data: PersonalInfo) {
    this.name = data.name;
    this.surname = data.surname;
    this.description = data.description;
  }

  @Mutation
  setStatus(status: number) {
    this.availability = status;
  }

  get isSignedIn() {
    return this.userid !== "" && this.username !== "";
  }

  get userUserId() {
    return this.userid;
  }

  get userRoles() {
    return this.roleModels;
  }

  @Action({ commit: "setUserData" })
  async fetchUserData(): Promise<UserInfo> {
    return await api.put(authApi.userData);
  }

  @Action({ commit: "setUserData" })
  async loginUser(data: UserLogin) {
    return await api.post(authApi.login, data);
  }

  @Action({ commit: "clearUserData" })
  async logoutUser() {
    return api.put(authApi.logout);
  }

  @Action
  async registerUser(data: UserRegister) {
    let succeed = null;
    authRSocket
      .requestResponse({
        data: dataBuf(data),
        metadata: metadataOnlyRoute(authApi.signup)
      })
      .subscribe({
        onComplete: value => {
          succeed = bufToJson(value);
        },
        onError: error => {
          console.error(error);
        }
      });
    return succeed;
  }

  @Action({ commit: "setStatus" })
  async changeStatus(status: number) {
    userRSocket.fireAndForget({
      data: dataBuf({ status: status }),
      metadata: metadataBuf(accessToken, userApi.status + this.userid)
    });
    return status;
  }

  @Action
  userRSocketConn() {
    userConn();
  }

  @Action
  authRSocketConn() {
    authConn();
  }

    @Action
    aedRSocketConn() {
        aedConn();
    }

    @Action
    newsRSocketConn(){
        newsConn();
    }
}
