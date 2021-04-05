import { userApi } from "@/plugins/api/api-urls.ts";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { UpdateUserPersonal, UserIdDto, UserInfo } from "@/types";
import {
  setAddress,
  setAvailability,
  setCore,
  setDescription,
  setLogs,
  setNameSurname,
  setPhones,
  setProfile,
  setRoleModels
} from "@/plugins/user-util";
import {
  bufToData,
  bufToJson,
  dataBuf,
  metadataBuf
} from "@/plugins/api/rsocket-util";
import { getAccessTokenJwt, userRSocketApi } from "@/plugins/api/rsocket-api";

@Module({ namespaced: true })
export default class Profile extends VuexModule implements UserInfo {
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

  get profileDescription() {
    return this.description;
  }

  @Mutation
  setVisibilityData() {
    this.isOnline = this.online;
    const showLLoginAndroid = this.lastLoginAndroid !== null;
    const showLLogoutAndroid = this.lastLogoutAndroid !== null;
    const showLLoginIos = this.lastLoginIos !== null;
    const showLLogoutIos = this.lastLogoutIos !== null;
    const showLLoginWeb = this.lastLoginWeb !== null;
    const showLLogoutWeb = this.lastLogoutWeb !== null;
    this.showLLogAndroid = showLLoginAndroid && showLLogoutAndroid;
    this.showLLogIos = showLLoginIos && showLLogoutIos;
    this.showLLogWeb = showLLoginWeb || showLLogoutWeb;
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

  @Mutation
  setProfileData(userinfo: UserInfo) {
    console.log(userinfo);
    setCore(this, userinfo);
    setAvailability(this, userinfo.online, userinfo.availability);
    setAddress(this, userinfo.countryCode, userinfo.province, userinfo.city);
    setProfile(this, userinfo);
    setRoleModels(this, userinfo.roleModels);
    setLogs(this, userinfo);
    setPhones(this, userinfo.phones);
  }

  @Mutation
  setProfilePersonal(userPersonal: UpdateUserPersonal) {
    setNameSurname(this, userPersonal.name, userPersonal.sur);
    setDescription(this, userPersonal.desc);
    setAddress(this, userPersonal.ciso, userPersonal.state, userPersonal.city);
  }

  @Action({ commit: "setProfileData" })
  async profileData(data: UserIdDto): Promise<UserInfo> {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        userRSocketApi().then(userRSocket => {
          userRSocket
            .requestResponse({
              data: dataBuf(data),
              metadata: metadataBuf(token, userApi.user)
            })
            .subscribe({
              onComplete: value => resolve(bufToJson(value))
            });
        });
      });
    });
  }

  @Action({ commit: "setProfilePersonal" })
  async editProfileData(data: UpdateUserPersonal) {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        userRSocketApi().then(userRSocket => {
          userRSocket
            .requestResponse({
              data: dataBuf(data),
              metadata: metadataBuf(token, userApi.personal)
            })
            .subscribe({
              onComplete: value => {
                if (bufToData(value) == "true") {
                  resolve(data);
                }
              }
            });
        });
      });
    });
  }

  get profileUserId() {
    return this.userid;
  }
}
