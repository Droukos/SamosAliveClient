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
              <p class="headline">{{ $t("edit.user_personal") }}</p>
              <v-text-field
                v-model="editForm.name"
                :counter="30"
                :rules="getNameRules($t('fields.name'))"
                :label="$t('fields.name')"
                @input="onChangeInput()"
                required
              ></v-text-field>
              <v-text-field
                v-model="editForm.surname"
                :counter="30"
                :rules="getNameRules($t('fields.surname'))"
                :label="$t('fields.surname')"
                @input="onChangeInput()"
                required
              ></v-text-field>
              <v-textarea
                v-model="editForm.description"
                :auto-grow="true"
                @input="onChangeInput()"
                :counter="textareaProps.counter ? textareaProps.counter : false"
                :rules="getDescriptionRules($t('fields.description'))"
                :hint="$t('edit.description_hint')"
                :label="$t('fields.description')"
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
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userID === undefined)
        vm.$store
          .dispatch("profile/profileData", {
            userid: "5ed81eb921c7b15c2c563980"
          })
          .then((response: { data: UserInfo }) => {
            //vm.$store.commit("profile/setUserData", response.data);
            if (to.params.userID === vm.$store.getters["user/getUserID"])
              vm.$store.commit("user/setUserData", response.data);
          });
      else
        vm.$store
          .dispatch("profile/profileData", { userid: to.params.userID })
          .then((response: { data: UserInfo }) => {
            // vm.$store.commit("profile/setUserData", response.data);
            if (to.params.userID === vm.$store.getters["user/getUserID"])
              vm.$store.commit("user/setUserData", response.data);
          });
    });
  }
})
export default class Profile extends Vue {
  editForm: EditForm = {
    name: "",
    surname: "",
    avatar: "",
    description: "",
    countryCode: "",
    country: "",
    province: "",
    city: "",
    phones: []
  };
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
    notUsedImgUpload: true
  };
  textareaProps = {
    counter: 0,
    rowHeight: 24,
    rows: 1
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

  getNameRules(field: TranslateResult) {
    return [
      (v: any) => !!v || this.$t("validations.required", [field]),
      (v: string | any[]) =>
        (v && v.length <= 30) || this.$t("validations.max", [field, 30])
    ];
  }

  getDescriptionRules(field: TranslateResult) {
    return [
      (v: string | any[]) =>
        v.length <= 250 || this.$t("validations.max", [field, 250]) //(v.length >= 0 && v.length <= 250) || this.$t("validations.max", [field, 250])
    ];
  }
  onChangeInput() {
    this.updateVisible = !(
      this.editForm.name.length === 0 ||
      this.editForm.surname.length === 0 ||
      this.editForm.name.length > 30 ||
      this.editForm.surname.length > 30 ||
      this.editForm.description.length > 250 ||
      this.editForm.countryCode.length > 2 ||
      this.editForm.country.length > 40 ||
      this.editForm.province.length > 40 ||
      this.editForm.city.length > 40
    );
  }
  uploadVisibility(bool: boolean) {
    this.uploadVisible = bool;
  }
  setProfileUInfo() {
    this.editForm.name = this.$helper.filterInfo(this.name);
    this.editForm.surname = this.$helper.filterInfo(this.surname);
    this.editForm.avatar = this.$helper.filterInfo(this.avatar);
    this.editForm.description = this.$helper.filterInfo(this.description);
    this.editForm.province = this.$helper.filterInfo(this.province);
    this.editForm.city = this.$helper.filterInfo(this.city);
    const cIso = this.$helper.filterInfo(this.country_code);
    this.editForm.countryCode = cIso;
    this.queryCountries = getCountry(cIso);
  }

  updateUInfo = () => {
    this.$store
      .dispatch("profile/editProfileData", {
        name: this.editForm.name,
        sur: this.editForm.surname,
        desc: this.editForm.description,
        cIso: this.editForm.countryCode,
        state: this.editForm.province,
        city: this.editForm.city
      })
      .then(() => {
        this.updateResultClass = this.validClass;
        this.updateResultMessage = this.$t("edit.updated");
        this.updateResultShow = true;
        this.updateVisible = false;
        const data = {
          name: this.editForm.name,
          surname: this.editForm.surname,
          description: this.editForm.description
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
      .then(respond => {
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
