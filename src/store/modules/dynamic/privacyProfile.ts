import { userApi } from "@/plugins/api/apiUrls";
import { accessToken, userRSocketApi } from "@/plugins/api";
import {
  dataBuf,
  metadataBuf,
  bufToJson,
  bufToData
} from "@/plugins/api/rsocketUtil";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import {
  PrivacyForm,
  PrivacySetField,
  PrivacySetting,
  UserIdDto,
  UsernameDto,
  UserPrivacySets
} from "@/types";
import { TranslateResult } from "vue-i18n";
import i18n from "@/plugins/i18n";

@Module({ dynamic: true, namespaced: true, store, name: "privacyProfile" })
export default class PrivacyProfile extends VuexModule {
  userid = "";
  username = "";
  privacyForm: PrivacyForm = {
    userPrivacy: [
      {
        index: 1,
        i18n: "privacy.onlineStatus",
        type: 0,
        users: [""]
      },
      {
        index: 2,
        i18n: "privacy.lastLogin",
        type: 0,
        users: [""]
      },
      {
        index: 3,
        i18n: "privacy.lastLogout",
        type: 0,
        users: [""]
      },
      {
        index: 4,
        i18n: "privacy.fullName",
        type: 0,
        users: [""]
      },
      {
        index: 5,
        i18n: "privacy.email",
        type: 0,
        users: [""]
      },
      {
        index: 6,
        i18n: "privacy.accountCreated",
        type: 0,
        users: [""]
      },
      {
        index: 7,
        i18n: "privacy.description",
        type: 0,
        users: [""]
      },
      {
        index: 8,
        i18n: "privacy.address",
        type: 0,
        users: [""]
      },
      {
        index: 9,
        i18n: "privacy.phone",
        type: 0,
        users: [""]
      }
    ]
  };
  updateVisible = false;
  updateResultShow = false;
  updateResultClass = "";
  validClass = "green--text text--lighten-1 pl-3";
  errorClass = "red--text text--lighten-1 pl-3";
  updateResultMessage: TranslateResult = "";
  searchedUsers: string[] = [];

  get privacyUserId() {
    return this.userid;
  }

  @Mutation
  setPrivacyInfo(data: UserPrivacySets) {
    this.userid = data.userid;
    this.username = data.username;
    const setTypeAndList = (
      privacySetField: PrivacySetField,
      privacySet: PrivacySetting
    ) => {
      privacySetField.type = privacySet.type;
      privacySetField.users = privacySet.users;
      this.searchedUsers = this.searchedUsers.concat(privacySet.users);
    };
    setTypeAndList(this.privacyForm.userPrivacy[0], data.onlineStatus);
    setTypeAndList(this.privacyForm.userPrivacy[1], data.lastLogin);
    setTypeAndList(this.privacyForm.userPrivacy[2], data.lastLogout);
    setTypeAndList(this.privacyForm.userPrivacy[3], data.fullname);
    setTypeAndList(this.privacyForm.userPrivacy[4], data.email);
    setTypeAndList(this.privacyForm.userPrivacy[5], data.accCreated);
    setTypeAndList(this.privacyForm.userPrivacy[6], data.description);
    setTypeAndList(this.privacyForm.userPrivacy[7], data.address);
    setTypeAndList(this.privacyForm.userPrivacy[8], data.phones);
  }

  @Mutation
  setSuccessUpdate() {
    this.updateResultClass = this.validClass;
    this.updateResultMessage = i18n.t("edit.updated");
    this.updateResultShow = true;
    this.updateVisible = false;
  }

  @Mutation
  setFailedUpdate() {
    this.updateResultClass = this.errorClass;
    this.updateResultMessage = i18n.t("edit.errorUpdated");
    this.updateResultShow = true;
    this.updateVisible = false;
  }

  @Mutation
  setSearchedUsers(users: string[]) {
    this.searchedUsers = users;
  }
  @Mutation
  activateUpdateBtn() {
    this.updateVisible = true;
    this.updateResultShow = false;
  }
  @Mutation
  hideUpdateBtn() {
    this.updateVisible = false;
    this.updateResultShow = false;
  }

  @Action({ commit: "setSearchedUsers" })
  async fetchUsernameOnly(usernameDto: UsernameDto): Promise<string[]> {
    console.log(usernameDto);
    return new Promise(resolve => {
      const fetchedUsers: string[] = [];
      userRSocketApi().then(userRSocket => {
        userRSocket
          .requestStream({
            data: dataBuf(usernameDto),
            metadata: metadataBuf(accessToken, userApi.usersByUsernameLike)
          })
          .subscribe({
            onNext: value => fetchedUsers.push(bufToData(value)),
            onError: error => console.log(error),
            onSubscribe: sub => sub.request(20)
          });
        resolve(fetchedUsers);
      });
    });
  }

  @Action({ commit: "setPrivacyInfo" })
  async fetchPrivacySets(data: UserIdDto): Promise<UserPrivacySets> {
    return new Promise(resolve => {
      userRSocketApi().then(userRSocket => {
        userRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, userApi.getPrivacySets)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.log(error)
          });
      });
    });
  }

  @Action
  async putPrivacySets(): Promise<string> {
    const buildPrivSet = (privSet: PrivacySetting) => {
      return {
        type: privSet.type,
        users: privSet.users
      };
    };

    const data = {
      userid: this.userid,
      onStatus: buildPrivSet(this.privacyForm.userPrivacy[0]),
      lstLogin: buildPrivSet(this.privacyForm.userPrivacy[1]),
      lstLogout: buildPrivSet(this.privacyForm.userPrivacy[2]),
      name: buildPrivSet(this.privacyForm.userPrivacy[3]),
      addr: buildPrivSet(this.privacyForm.userPrivacy[4]),
      email: buildPrivSet(this.privacyForm.userPrivacy[5]),
      accC: buildPrivSet(this.privacyForm.userPrivacy[6]),
      desc: buildPrivSet(this.privacyForm.userPrivacy[7]),
      phone: buildPrivSet(this.privacyForm.userPrivacy[8])
    };
    return new Promise(resolve => {
      userRSocketApi().then(userRSocket => {
        userRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, userApi.putPrivacySets)
          })
          .subscribe({
            onComplete: value => resolve(bufToData(value)),
            onError: error => console.log(error)
          });
      });
    });
  }
}
