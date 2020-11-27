import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {Error, Field, FieldObject, FileImg, Icon, Show, SuccessMessage, UserInfo } from "@/types";
import store from "@/store";
import i18n from "@/plugins/i18n";
import {TranslateResult} from "vue-i18n";

type FieldObject2 = {
  f: Field;
  v: string | null;
  e: Error;
  run: boolean;
  loading?: boolean;
  suMsg?: SuccessMessage;
  sh?: Show;
  i?: Icon;
};

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "editProfile",
})
export default class ProfileEdit extends VuexModule {
  fName: FieldObject = {
    f: i18n.t("fields.name"),
    v: "",
    e: "",
    run: false,
  };
  fSurname: FieldObject = {
    f: i18n.t("fields.surname"),
    v: "",
    e: "",
    run: false,
  };
  fDescription: FieldObject2 = {
    f: i18n.t("fields.description"),
    v: "",
    e: "",
    run: false,
  };
  fCountryCode: FieldObject2 = {
    f: i18n.t("fields.country"),
    v: "",
    e: "",
    run: false,
  };
  fProvince: FieldObject2 = {
    f: i18n.t("fields.province"),
    v: "",
    e: "",
    run: false,
  };
  fCity: FieldObject2 = {
    f: i18n.t("fields.city"),
    v: "",
    e: "",
    run: false,
  };
  fAvatar: { v: string | null } = {
    v:  "",
  };
  fPhones: FieldObject2 = {
    f: i18n.t("fields.phone"),
    v: "",
    e: "",
    run: false,
  };
  validClass = "green--text text--lighten-1 pl-3";
  errorClass = "red--text text--lighten-1 pl-3";
  updateResultMessage: TranslateResult = "";
  avatarUpdateMessage: TranslateResult = "";
  updateResultClass = "";
  avatarUpdateClass = "";
  updateResultShow = false;
  avatarUpdateShow = false;
  uploadVisible = false;
  updateVisible = false;
  fileImg: FileImg = {
    selectedFile: new File([], ""),
    validFileExtensions: [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
    notUsedImgUpload: true,
  };

  @Mutation
  setUpdateVisible(upVisible: boolean) {
    this.updateVisible = upVisible;
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

  @Action
  setEditProfileInfo(profile: UserInfo) {
    this.fName.v = profile.name;
    this.fSurname.v = profile.surname;
    this.fAvatar.v = profile.avatar;
    this.fDescription.v = profile.description
    this.fProvince.v = profile.province;
    this.fCity.v = profile.city;
    this.fCountryCode.v = profile.countryCode;
  }

  @Action({commit: "setUpdateVisible"})
  vForm() {
    return !(
        this.fName.e != "" ||
        this.fSurname.e != "" ||
        this.fDescription.e != "" ||
        (this.fCountryCode.v != undefined && this.fCountryCode.v.length > 2) ||
        (this.fProvince.v != undefined && this.fProvince.v.length > 40) ||
        (this.fCity.v != undefined && this.fCity.v.length > 40)
    );
  }
}
