import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import Vue from "vue";
import api, {
  setBearerAccToken,
  accessToken,
  authRSocketApi,
  userRSocketApi,
  getAccessTokenJwt
} from "@/plugins/api";
import { authApi, userApi } from "@/plugins/api/api-urls";
import {
  LoginResponse,
  PreviewUserCh,
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
} from "@/plugins/api/rsocket-util";
import {
  setAvailability,
  setAvatar,
  setDescription,
  setEmail,
  setNameSurname,
  setRoleModels,
  setUserIdUsername
} from "@/plugins/user-util";
import { ISubscription } from "rsocket-types";
import { availability } from "@/plugins/enums/user/status/status";

Vue.use(VueCookies);

@Module({ namespaced: true })
export default class User extends VuexModule implements UserInfo {
  userid = "";
  username = "";
  name = "";
  surname = "";
  email = "";
  avatar = "";
  roleModels: Role[] = [];
  countryCode = "";
  country = "";
  province = "";
  city = "";
  street = "";
  address = "";
  description = "";
  phones = [];

  status = 0;
  online = false;
  availability = 0;

  lastLoginAndroid = [];
  lastLogoutAndroid = [];
  lastLoginIos = [];
  lastLogoutIos = [];
  lastLoginWeb = [];
  lastLogoutWeb = [];

  userCreated = [];
  userUpdated = [];
  aedSubEvents: string[] = [];

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
    setUserIdUsername(this, loginData.userid, loginData.username);
    setNameSurname(this, loginData.name, loginData.surname);
    setEmail(this, loginData.email);
    setAvatar(this, loginData.avatar);
    setDescription(this, loginData.description);
    setRoleModels(this, loginData.roleModels);
    setAvailability(this, loginData.online, loginData.availability);
    this.aedSubEvents = loginData.aedEventSubs.flatMap(item => item.substring(item.lastIndexOf('/')+1));
  }

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
    this.availability = 0;
    this.roleModels = [];
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

  get userAvailability() {
    return this.availability;
  }

  get userAvatar() {
    return this.avatar;
  }

  get nameSurname() {
    return this.surname + " " + this.name;
  }

  get userPreview(): PreviewUserCh {
    const roleCodes: string[] = [];
    for (const role of this.roleModels) {
      roleCodes.push(role.code);
    }
    return {
      id: this.userid,
      username: this.username,
      avatar: this.avatar,
      status: this.availability,
      roles: roleCodes
    };
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
    return new Promise(resolve => {
      authRSocketApi()
        .requestResponse({
          data: dataBuf(data),
          metadata: metadataOnlyRoute(authApi.signup)
        })
        .subscribe({
          onComplete: value => resolve(bufToJson(value)),
          onError: error => console.error(error)
        });
    });
  }

  @Action({ commit: "setStatus" })
  async changeStatus(status: number): Promise<number> {
    return new Promise(resolve => {
      userRSocketApi().then(userRSocket => {
        userRSocket.fireAndForget({
          data: dataBuf({ status: status }),
          metadata: metadataBuf(accessToken, userApi.status + this.userid)
        });
        resolve(status);
      });
    });
  }

  @Action
  async listenAuth() {
    const requestedMsg = 10;
    let processedMsg = 0;
    let iSub: ISubscription;
    getAccessTokenJwt()
      .then(token => {
        authRSocketApi()
          .requestStream({
            metadata: metadataBuf(token, authApi.authListen)
          })
          .subscribe({
            onNext: value => {
              processedMsg++;
              if (processedMsg >= requestedMsg) {
                iSub.request(requestedMsg);
                processedMsg = 0;
              }
              const data: LoginResponse = bufToJson(value);
              if (
                data.availability == availability.TEMP_BANNED ||
                data.availability == availability.PERM_BANNED
              ) {
                this.context.dispatch("logoutUser");
              } else {
                this.context.dispatch("fetchUserData");
              }
            },
            onError: error => console.error(error),
            onSubscribe: sub => {
              iSub = sub;
              sub.request(requestedMsg);
            }
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
