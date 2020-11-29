<template>
  <v-content>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      :loading="loadingSkeleton"
      transition="scale-transition"
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

            <NameInputBase />
            <SurnameInputBase />
            <DescriptionInputBase />

            <div v-if="$vuetify.breakpoint.smAndDown">
              <ThreeCentralisedAvatars
                clazz=""
                :username="username"
                :avatar="fAvatar.v"
              ></ThreeCentralisedAvatars>
              <FileInputBase
                styl=""
                :uploadVis="uploadVisibility"
              ></FileInputBase>
            </div>
            <div v-else class="d-flex flex-row">
              <v-col>
                <FileInputBase
                  styl="width:500px;"
                  :uploadVis="uploadVisibility"
                ></FileInputBase>
                <v-btn
                  block
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
              </v-col>

              <ThreeCentralisedAvatars
                clazz="d-flex flex-column-6"
                :username="username"
                :avatar="fAvatar.v"
              ></ThreeCentralisedAvatars>
            </div>

            <div v-if="$vuetify.breakpoint.smAndDown">
              <v-btn
                block
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
            <AddressInputBase class="pt-2"></AddressInputBase>
          </div>
          <v-btn
            v-if="updateVisible"
            class="deep-purple darken-2"
            style="color:white;"
            block
            rounded
            @click="updateUInfo()"
            aria-label="EditUpdate"
            >{{ $t("edit.update") }}
          </v-btn>
          <span
            v-if="updateResultShow"
            :class="updateResultClass + 'mx-auto'"
            >{{ updateResultMessage }}</span
          >
        </v-card>
      </v-container>
    </v-skeleton-loader>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import VueI18n from "vue-i18n";
import TranslateResult = VueI18n.TranslateResult;
import {
  FieldObject,
  FileImg,
  UpdateUserPersonal,
  UserIdDto,
  UserInfo
} from "@/types";
import editProfileMod from "@/store/modules/dynamic/profile/profile-edit";

const user = namespace("user");
const profile = namespace("profile");
const editProfileModule = namespace("editProfile");

@Component({
  components: {
    NameInputBase: () =>
      import(
        /* webpackChunkName: "NameInputBase" */ "@/components/profile/profile-textfields/NameInputBase.vue"
      ),
    SurnameInputBase: () =>
      import(
        /* webpackChunkName: "SurnameInputBase" */ "@/components/profile/profile-textfields/SurnameInputBase.vue"
      ),
    DescriptionInputBase: () =>
      import(
        /* webpackChunkName: "DescriptionInputBase" */ "@/components/profile/profile-textfields/DescriptionInputBase.vue"
      ),
    ThreeCentralisedAvatars: () =>
      import(
        /* webpackChunkName: "ThreeCentralisedAvatars" */ "@/components/profile/avatar/ThreeCentralisedAvatars.vue"
      ),
    FileInputBase: () =>
      import(
        /* webpackChunkName: "FileInputBase" */ "@/components/profile/profile-edit/FileInputBase.vue"
      ),
    AddressInputBase: () =>
      import(
        /* webpackChunkName: "AddressInputBase" */ "@/components/profile/profile-edit/AddressInputBase.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const editProfileCard = vm as EditProfileCard;
      const store = editProfileCard.$store;
      if (!(store && store.state && store.state["editProfile"])) {
        store.registerModule("editProfile", editProfileMod);
      }
      editProfileCard.profileData({ userid: to.params.userID }).then(() => {
        editProfileCard.loadingSkeleton = false;
        editProfileCard.setEditProfileInfo(store.state["profile"]);
      });
    });
  },
  beforeDestroy() {
    //this.$store.unregisterModule("editProfile");
  }
})
export default class EditProfileCard extends Vue {
  @profile.Getter profileUserId!: string;
  @user.Getter userUserId!: string;
  @profile.State username!: string;
  @profile.Action editProfileData!: (
    data: UpdateUserPersonal
  ) => Promise<UpdateUserPersonal>;
  @profile.Action profileData!: (data: UserIdDto) => Promise<UserInfo>;
  @editProfileModule.Mutation setEditProfileInfo!: (userInfo: UserInfo) => void;
  @editProfileModule.Action editProfileAvatar!: () => Promise<any>;
  @editProfileModule.Mutation setUpdateVisible!: (updateVis: boolean) => void;
  @editProfileModule.State fName!: FieldObject;
  @editProfileModule.State fSurname!: FieldObject;
  @editProfileModule.State fDescription!: FieldObject;
  @editProfileModule.State fAvatar!: FieldObject;
  @editProfileModule.State fCountryCode!: FieldObject;
  @editProfileModule.State fProvince!: FieldObject;
  @editProfileModule.State fCity!: FieldObject;
  @editProfileModule.State fileImg!: FileImg;
  @editProfileModule.State updateVisible!: boolean;
  @editProfileModule.State updateResultShow!: boolean;
  @editProfileModule.State updateResultMessage!: string;
  @editProfileModule.State updateResultClass!: string;
  @profile.State avatar!: string;
  @editProfileModule.Mutation setSuccessUpdate!: () => void;
  @editProfileModule.Mutation setFailedUpdate!: () => void;

  loadingSkeleton = true;

  validClass = "green--text text--lighten-1 pl-3";
  errorClass = "red--text text--lighten-1 pl-3";
  avatarUpdateMessage: TranslateResult = "";
  avatarUpdateClass = "";
  avatarUpdateShow = false;
  uploadVisible = false;

  uploadVisibility(bool: boolean) {
    this.uploadVisible = bool;
  }

  updateUInfo() {
    this.editProfileData({
      userid: this.profileUserId,
      name: this.fName.v,
      sur: this.fSurname.v,
      desc: this.fDescription.v,
      ciso: this.fCountryCode.v,
      state: this.fProvince.v,
      city: this.fCity.v
    })
      .then(() => this.setSuccessUpdate())
      .catch(() => this.setFailedUpdate());
  }

  uploadAvatar() {
    this.editProfileAvatar()
      .then(respond => {
        console.log(respond);
        this.avatarUpdateClass = this.validClass;
        this.avatarUpdateMessage = this.$t("edit.avatarUpdated");
        this.avatarUpdateShow = true;
        const dataAvatar = respond.data;
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
  }
}
</script>
