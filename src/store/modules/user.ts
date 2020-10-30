import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import Vue from "vue";
import api, {
  setBearerAccToken,
  authRSocketApi,
  userRSocketApi,
  accessToken,
} from "@/plugins/api";
import { authApi, userApi } from "@/plugins/api/apiUrls";
import { LoginResponse, UserInfo, UserLogin, UserRegister } from "@/types";
import VueCookies from "vue-cookies";
import { AxiosResponse } from "axios";
import {
  bufToJson,
  dataBuf,
  metadataBuf,
  metadataOnlyRoute
} from "@/plugins/api/rsocketUtil";
import {
  setAvailability,
  setAvatar,
  setDescription,
  setEmail,
  setNameSurname,
  setRoleModels,
  setUserIdUsername
} from "@/plugins/userUtil";

Vue.use(VueCookies);

@Module({ namespaced: true })
export default class User extends VuexModule implements UserInfo {
    userid = "";
    username = "";
    name = "";
    surname = "";
    email = "";
    avatar = "";
    roleModels = [];
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

    get userRoles() {
        return this.roleModels;
    }

    @Action({commit: "setUserData"})
    async fetchUserData(): Promise<UserInfo> {
        return await api.put(authApi.userData);
    }

    @Action({commit: "setUserData"})
    async loginUser(data: UserLogin) {
        return await api.post(authApi.login, data);
    }

    @Action({commit: "clearUserData"})
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

    @Action({commit: "setStatus"})
    async changeStatus(status: number): Promise<number> {
        return new Promise(resolve => {
            userRSocketApi().then(userRSocket => {
                userRSocket.fireAndForget({
                    data: dataBuf({status: status}),
                    metadata: metadataBuf(accessToken, userApi.status + this.userid)
                });
                resolve(status);
            });
        });
    }
}
