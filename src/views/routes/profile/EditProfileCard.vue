<template>
  <v-content>
    <v-sheet>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        :loading="loadingSkeleton"
        :transition="transition"
        type="card"
      >
        <v-container>
          <p class="display-1" style="color:#00897B">
            {{ $t("edit.title") }}{{ username }}
          </p>
          <v-spacer />
          <v-card outlined>
            <div class="justify-center mb-6 pa-3">
              <p class="headline">{{ $t("edit.userPersonal") }}</p>
              <v-text-field
                v-model="fName.v"
                @input="validName()"
                :error-messages="fName.e"
                :counter="30"
                :label="fName.f"
                prepend-icon="$accountOut"
                required
              ></v-text-field>
              <v-text-field
                v-model="fSurname.v"
                @input="validSurname()"
                :error-messages="fSurname.e"
                :counter="30"
                :label="fSurname.f"
                prepend-icon="$accountOut"
                required
              ></v-text-field>
              <v-textarea
                v-model="fDescription.v"
                :auto-grow="true"
                @input="onChangeInput()"
                :counter="textareaProps.counter ? textareaProps.counter : false"
                :hint="$t('edit.description_hint')"
                :label="fDescription.f"
                :row-height="textareaProps.rowHeight"
                :rows="textareaProps.rows"
              ></v-textarea>
              <!--xs-screens only-->
              <div class="d-flex d-sm-none">
                <div class="d-flex align-center">
                  <ThreeCentralisedAvatars
                    clazz=""
                    :username="username"
                    :avatar="editForm.avatar"
                  ></ThreeCentralisedAvatars>
                </div>
              </div>
              <!--sm-screens only-->
              <div class="d-none d-sm-flex d-md-none">
                <div class="d-flex flex-row align-center">
                  <ThreeCentralisedAvatars
                    clazz=""
                    :username="username"
                    :avatar="editForm.avatar"
                  ></ThreeCentralisedAvatars>
                </div>
              </div>
              <!--xl-lg-md-screens only-->
              <div class="d-none d-sm-none d-md-flex">
                <div class="d-flex align-center justify-space-between">
                  <FileInputBase
                    :fileImg="fileImg"
                    class=""
                    styl="width:500px;"
                    :uploadVis="uploadVisibility"
                    :editForm="editForm"
                  ></FileInputBase>
                  <ThreeCentralisedAvatars
                    clazz="d-flex flex-column-6"
                    :username="username"
                    :avatar="editForm.avatar"
                  ></ThreeCentralisedAvatars>
                </div>
              </div>
              <FileInputBase
                :fileImg="fileImg"
                class="d-none d-sm-flex d-md-none"
                styl=""
                :uploadVis="uploadVisibility"
                :editForm="editForm"
              ></FileInputBase>
              <FileInputBase
                :fileImg="fileImg"
                class="d-flex d-sm-none"
                styl=""
                :uploadVis="uploadVisibility"
                :editForm="editForm"
              ></FileInputBase>
              <div class="d-flex pr-8">
                <v-btn
                  v-if="uploadVisible"
                  class="deep-purple darken-2"
                  style="color:white;"
                  @click="uploadAvatar()"
                  aria-label="UploadAvatar"
                  rounded
                >
                  {{ $t("edit.upload") }}
                </v-btn>
                <span v-if="avatarUpdateShow" :class="avatarUpdateClass">{{
                  avatarUpdateMessage
                }}</span>
              </div>
              <AddressInputBase
                class="pt-2"
                :editForm="editForm"
                :onChange="onChangeInput"
              ></AddressInputBase>
            </div>
            <v-btn
              v-if="updateVisible"
              class="deep-purple darken-2"
              style="color:white;"
              block
              rounded
              @click="updateUInfo()"
              aria-label="EditUpdate"
              >{{ $t("edit.update") }}</v-btn
            >
            <span
              v-if="updateResultShow"
              :class="updateResultClass + 'mx-auto'"
              >{{ updateResultMessage }}</span
            >
          </v-card>
        </v-container>
      </v-skeleton-loader>
    </v-sheet>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { getCountry } from "@/plugins/helpers/countries";
import VueI18n from "vue-i18n";
import TranslateResult = VueI18n.TranslateResult;
import { Country, EditForm, FileImg, UserInfo } from "@/types";

import {
  clearNameData,
  clearSurnameData,
  validateName,
  validateSurname,
} from "@/plugins/validators";

const user = namespace("user");
const profile = namespace("profile");

@Component({
  components: {
    ThreeCentralisedAvatars: () =>
      import(
        /* webpackChunkName: "ThreeCentralisedAvatars" */ /* webpackPreload: true */ "@/components/profile/avatar/ThreeCentralisedAvatars.vue"
      ),
    FileInputBase: () =>
      import(
        /* webpackChunkName: "FileInputBase" */ /* webpackPreload: true */ "@/components/profile/profile_edit/FileInputBase.vue"
      ),
    AddressInputBase: () =>
      import(
        /* webpackChunkName: "AddressInputBase" */ /* webpackPreload: true */ "@/components/profile/profile_edit/AddressInputBase.vue"
      ),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.userID == undefined)
        vm.$store
          .dispatch("profile/profileData", (vm as EditProfileCard).userUserId)
          .then((response) => {
            //vm.$store.commit("profile/setUserData", response.data);
            (vm as EditProfileCard).loadingSkeleton = false;
            //if (to.params.userID === vm.$store.getters["user/getUserID"])
            //  vm.$store.commit("user/setUserData", response.data);
          });
      else
        vm.$store
          .dispatch("profile/profileData", { userid: to.params.userID })
          .then((response) => {
            (vm as EditProfileCard).loadingSkeleton = false;
            // vm.$store.commit("profile/setUserData", response.data);
            //if (to.params.userID === vm.$store.getters["user/getUserID"])
            //  vm.$store.commit("user/setUserData", response.data);
          });
    });
  },
})
export default class EditProfileCard extends Vue {
  fName = {
    f: this.$t("fields.name"),
    v: "",
    e: "",
    run: false,
  };
  fSurname = {
    f: this.$t("fields.surname"),
    v: "",
    e: "",
    run: false,
  };
  fDescription = {
    f: this.$t("fields.description"),
    v: "",
    e: "",
    run: false,
  };
  fCountryCode = {
    f: this.$t("fields.description"),
    v: "",
    e: "",
    run: false,
  };
  fCountry = {
    f: this.$t("fields.description"),
    v: "",
    e: "",
    run: false,
  };
  fProvince = {
    f: this.$t("fields.description"),
    v: "",
    e: "",
    run: false,
  };
  fCity = {
    f: this.$t("fields.description"),
    v: "",
    e: "",
    run: false,
  };
  fAvatar = {
    v: "",
  };
  fPhones = {
    f: this.$t("fields.description"),
    v: [],
    e: "",
    run: false,
  };
  //editForm: EditForm = {
  //  name: "",
  //  surname: "",
  //  avatar: "",
  //  description: "",
  //  countryCode: "",
  //  country: "",
  //  province: "",
  //  city: "",
  //  phones: []
  //};

  vName = () => validateName(this.fName);
  vSurname = () => validateSurname(this.fSurname);

  validName = () => this.validateForm(this.vName);
  validSurname = () => this.validateForm(this.vSurname);

  validateForm(func: () => void) {
    func();
    this.vForm();
  }
  @profile.Getter profileUserId!: string;
  @user.Getter userUserId!: string;
  @profile.State username!: string;
  @profile.State name!: string;
  @profile.State surname!: string;
  @profile.State avatar!: string;
  @profile.State description!: string;
  @profile.State country_code!: string;
  @profile.State province!: string;
  @profile.State city!: string;

  fileImg: FileImg = {
    selectedFile: new File([], ""),
    validFileExtensions: [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
    notUsedImgUpload: true,
  };
  textareaProps = {
    counter: 0,
    rowHeight: 24,
    rows: 1,
  };
  queryCountries: Country[] = [];
  loadingSkeleton = true;
  transition = "scale-transition";
  validClass = "green--text text--lighten-1 pl-3";
  errorClass = "red--text text--lighten-1 pl-3";
  avatarUpdateMessage: TranslateResult = "";
  avatarUpdateClass = "";
  avatarUpdateShow = false;
  updateVisible = false;
  updateResultShow = false;
  updateResultClass = "";
  updateResultMessage: TranslateResult = "";
  uploadVisible = false;
  successUpdate = false;

  //getNameRules(field: TranslateResult) {
  //  return [
  //    (v: any) => !!v || this.$t("validations.required", [field]),
  //    (v: string | any[]) =>
  //      (v && v.length <= 30) || this.$t("validations.max", [field, 30])
  //  ];
  //}

  //getDescriptionRules(field: TranslateResult) {
  //  return [
  //    (v: string | any[]) =>
  //      v.length <= 250 || this.$t("validations.max", [field, 250]) //(v.length >= 0 && v.length <= 250) || this.$t("validations.max", [field, 250])
  //  ];
  //}
  vForm() {
    this.updateVisible = !(
      this.fName.v.length === 0 ||
      this.fSurname.v.length === 0 ||
      this.fName.v.length > 30 ||
      this.fSurname.v.length > 30 ||
      this.fDescription.v.length > 250 ||
      this.fCountryCode.v.length > 2 ||
      this.fCountry.v.length > 40 ||
      this.fProvince.v.length > 40 ||
      this.fCity.v.length > 40
    );
  }
  uploadVisibility(bool: boolean) {
    this.uploadVisible = bool;
  }
  setProfileUInfo() {
    this.fName.v = this.name;
    this.fSurname.v = this.surname;
    this.fAvatar.v = this.avatar;
    this.fDescription.v = this.description;
    this.fProvince.v = this.province;
    this.fCity.v = this.city;
    const cIso = this.country_code;
    this.fCountryCode.v = cIso;
    this.queryCountries = getCountry(cIso);
  }

  updateUInfo = () => {
    this.$store
      .dispatch("profile/editProfileData", {
        name: this.fName.v,
        sur: this.fSurname.v,
        desc: this.fDescription.v,
        cIso: this.fCountryCode.v,
        state: this.fProvince.v,
        city: this.fCity.v,
      })
      .then(() => {
        this.updateResultClass = this.validClass;
        this.updateResultMessage = this.$t("edit.updated");
        this.updateResultShow = true;
        this.updateVisible = false;
        const data = {
          name: this.name,
          surname: this.surname,
          description: this.description,
        };
        if (this.profileUserId === this.userUserId)
          this.$store.commit("user/setPersonalInfo", data);
        this.$store.commit("profile/setPersonalInfo", data);
      })
      .catch(() => {
        this.updateResultClass = this.errorClass;
        this.updateResultMessage = this.$t("edit.errorUpdated");
        this.updateResultShow = true;
        this.updateVisible = false;
      });
  };

  uploadAvatar = () => {
    const data = new FormData();
    data.append("file", this.fileImg.selectedFile);
    this.$store
      .dispatch("profile/editProfileAvatar", data)
      .then((respond) => {
        this.avatarUpdateClass = this.validClass;
        this.avatarUpdateMessage = this.$t("edit.avatarUpdated");
        this.avatarUpdateShow = true;
        const dataAvatar = { avatar: respond.data.message };
        if (this.profileUserId === this.userUserId)
          this.$store.commit("user/setAvatar", dataAvatar);
        this.$store.commit("profile/setAvatar", dataAvatar);
        this.uploadVisible = false;
      })
      .catch(() => {
        this.avatarUpdateClass = this.errorClass;
        this.avatarUpdateMessage = this.$t("edit.errorAvatarUpdate");
        this.avatarUpdateShow = true;
        this.uploadVisible = false;
      });
  };

  created() {
    this.setProfileUInfo();
  }

  //@Watch("profileData")
  //onProfileDataUpdate(newVal: { username: string | null }) {
  //  if (newVal.username == null) this.loadingSkeleton = true;
  //  else {
  //    this.loadingSkeleton = false;
  //    this.setProfileUInfo();
  //  }
  //}
}
</script>
