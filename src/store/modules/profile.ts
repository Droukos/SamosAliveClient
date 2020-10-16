import api from "@/plugins/api";
import { apiWithVar, userApi } from "@/plugins/api/apiUrls.ts";
import {
  Action,
  Module,
  Mutation,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import {PersonalInfo, Phones, Role, UserInfo} from "@/types";

@Module({ namespaced: true })
export default class Profile extends VuexModule implements UserInfo {
  userid = "";
  username = "";
  name = "";
  surname = "";
  email = "";
  avatar: string | undefined;
  roleModels: Role[] | undefined;
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

  cred_stars = {
    rating: undefined,
    emptyIcon: "mdi-star-outline",
    fullIcon: "mdi-star",
    halfIcon: "mdi-star-half",
    length: 5,
    hover: true,
    readonly: false,
    size: 20
  };

  isOnline = true;
  showOnline = true;
  showLLogAndroid = false;
  showLLogIos = false;
  showLLogWeb = false;
  //showUserVerified = false;
  showUserCreated = false;
  showUserUpdated = false;
  showRealName = false;
  showEmail = false;
  showAddress = false;
  showCredibilityStars = false;
  showPhone = false;

  @Mutation
  setAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  @Mutation
  setPersonalInfo(data: PersonalInfo): void {
    this.name = data.name;
    this.surname = data.surname;
    this.description = data.description;
  }

  setVisibilityData() {
    this.isOnline = this.online !== null;
    const showLLoginAndroid = this.lastLoginAndroid !== null;
    const showLLogoutAndroid = this.lastLogoutAndroid !== null;
    const showLLoginIos = this.lastLoginIos !== null;
    const showLLogoutIos = this.lastLogoutIos !== null;
    const showLLoginWeb = this.lastLoginWeb !== null;
    const showLLogoutWeb = this.lastLogoutWeb !== null;
    this.showLLogAndroid = showLLoginAndroid && showLLogoutAndroid;
    this.showLLogIos = showLLoginIos && showLLogoutIos;
    this.showLLogWeb = showLLoginWeb && showLLogoutWeb;
    //this.showUserVerified = state.showUserVerified;
    this.showUserCreated =
      this.userCreated !== null && this.userCreated !== undefined;
    this.showUserUpdated =
      this.userUpdated !== null && this.userUpdated !== undefined;
    this.showRealName = this.name !== null && this.surname !== null;
    this.showEmail = this.email !== null;
    this.showAddress = this.countryCode !== null;
    this.showCredibilityStars = this.cred_stars.rating !== null;
    this.showPhone = this.phones !== null;
  }

  @MutationAction({
    mutate: [
      "userid",
      "username",
      "name",
      "surname",
      "email",
      "avatar",
      "description",
      "countryCode",
      "province",
      "city",
      "phones",
      "lastLoginAndroid",
      "lastLogoutAndroid",
      "lastLoginIos",
      "lastLogoutIos",
      "lastLoginWeb",
      "lastLogoutWeb",
      "userCreated",
      "online",
      "availability",
      "roleModels"
    ]
  })
  async profileData(data: { userid: string }): Promise<UserInfo> {
    return await api.get(userApi.user + data.userid);
  }

  @Action
  async editProfileData(data: any) {
    return await api.put(apiWithVar(userApi.personal, this.userid), data);
  }

  @Action
  async editProfileAvatar(data: any) {
    return await api.put(userApi.avatar, data, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data"
      }
    });
  }

  get profileUserId() {
    return this.userid;
  }
}
