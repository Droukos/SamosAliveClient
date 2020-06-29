<template>
  <v-content>
    <v-sheet>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        :loading="loadingSkeleton"
        :transition="transition"
        type="card">
      <v-container>
        <p class="display-1" style="color:#00897B">{{ $t('edit.title') }}{{ profileData.username }}</p>
        <v-spacer />
          <v-card outlined>
            <div class="justify-center mb-6 pa-3">
              <p class="headline"> {{$t('edit.user_personal')}}</p>
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
                    <three-centralised-avatars clazz="" :username="profileData.username" :avatar="editForm.avatar"></three-centralised-avatars>
                  </div>
                </div>
                <!--sm-screens only-->
                <div class="d-none d-sm-flex d-md-none"> 
                  <div class="d-flex flex-row align-center">
                      <three-centralised-avatars clazz="" :username="profileData.username" :avatar="editForm.avatar"></three-centralised-avatars>
                  </div>
                </div>
                <!--xl-lg-md-screens only-->
                <div class="d-none d-sm-none d-md-flex">
                  <div class="d-flex align-center justify-space-between">
                    <file-input-base :fileImg="fileImg" class="" styl="width:500px;" :uploadVis="uploadVisibility" :editForm="editForm"></file-input-base>
                    <three-centralised-avatars clazz="d-flex flex-column-6" :username="profileData.username" :avatar="editForm.avatar"></three-centralised-avatars>
                  </div>
                </div>
                <file-input-base :fileImg="fileImg" class="d-none d-sm-flex d-md-none" styl="" :uploadVis="uploadVisibility" :editForm="editForm"></file-input-base>
                <file-input-base :fileImg="fileImg" class="d-flex d-sm-none" styl="" :uploadVis="uploadVisibility" :editForm="editForm"></file-input-base>
                <div class="d-flex pr-8">
                  <v-btn v-if="uploadVisible"
                    class="deep-purple darken-2" style="color:white;"
                    @click="uploadAvatar()"
                    aria-label="UploadAvatar"
                    rounded> {{ $t('edit.upload') }}
                  </v-btn>
                  <span v-if="avatar_update_show" :class="avatar_update_class">{{ avatar_update_message }}</span>
                </div>
                <address-input-base class="pt-2" :editForm="editForm" :onChange="onChangeInput"></address-input-base>
            </div>
            <v-btn v-if="updateVisible" class="deep-purple darken-2" style="color:white;" block rounded @click="updateUInfo()" aria-label="EditUpdate">{{ $t('edit.update') }}</v-btn>
            <span v-if="updateResultShow" :class="updateResultClass +'mx-auto'">{{ updateResultMessage }}</span>
          </v-card>
      </v-container>
      </v-skeleton-loader>
    </v-sheet>
  </v-content>
</template>

<script>
export default {
    data: function() {
    return {
      editForm: {
        name: "",
        surname: "",
        avatar: "",
        description: "",
        country_code: "",
        country: "",
        province: "",
        city: "",
        phone: []
      },
      fileImg: {
        selectedFile: null,
        validFileExtensions: [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
        notUsedImgUpload: true,
      },
      textareaProps: {
        counter: 0,
        rowHeight: 24,
        rows: 1,
      },
      loadingSkeleton: true,
      transition: "scale-transition",
      validClass: "green--text text--lighten-1 pl-3",
      errorClass: "red--text text--lighten-1 pl-3",
      avatar_update_message: "",
      avatar_update_class: "",
      avatar_update_show: false,
      updateVisible: false,
      updateResultShow: false,
      updateResultClass: "",
      updateResultMessage: "",
      uploadVisible: false,
      successUpdate: false,
    };
  },
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
  methods: {
    getNameRules(field) {
      return [
        v => !!v || this.$t('validations.required',[field]),
        v => (v && v.length <= 30) || this.$t('validations.max',[field, 30]),
      ]
    },
    getDescriptionRules(field) {
      return [
        v => ( (v.length >= 0 && v.length <= 250)) || this.$t('validations.max',[field, 250]),
      ]
    },
    onChangeInput() {
      if(this.editForm.name.length == 0 || this.editForm.surname == 0 ||
          this.editForm.name.length > 30 || this.editForm.surname.length > 30 ||
          this.editForm.description.length > 250 ||
          this.editForm.country_code.length > 2 ||
          this.editForm.country.length > 40 ||
          this.editForm.province.length > 40 ||
          this.editForm.city.length > 40) { this.updateVisible = false; return; }
      else this.updateVisible = true;
    },
    uploadVisibility(bool) {
      this.uploadVisible = bool;
    },
    setProfileUInfo: function() {
      this.editForm.name = this.filterInfo(this.profileData.name);
      this.editForm.surname = this.filterInfo(this.profileData.surname);
      this.editForm.avatar = this.filterInfo(this.profileData.avatar);
      this.editForm.description = this.filterInfo(this.profileData.description);
      this.editForm.province = this.filterInfo(this.profileData.province);
      this.editForm.city = this.filterInfo(this.profileData.city);
      let ciso = this.filterInfo(this.profileData.country_code);
      this.editForm.country_code = ciso;
      this.queryCountries = this.$countries.filter(country => {
          return country.code == ciso;
        });
    },
    updateUInfo() {     
      let vm = this;
      vm.$store.dispatch("profile/editProfileData", {
          name: vm.editForm.name,
          sur: vm.editForm.surname,
          desc: vm.editForm.description,
          ciso: vm.editForm.country_code,
          state: vm.editForm.province,
          city: vm.editForm.city
      })
      .then(() => {
        vm.updateResultClass = vm.validClass;
        vm.updateResultMessage = vm.$t('edit.updated');
        vm.updateResultShow = true;
        vm.updateVisible = false;
        let data = {
            name: vm.editForm.name,
            surname: vm.editForm.surname,
            description: vm.editForm.description,
          };
        if (vm.profileData.userid == vm.$store.getters.getUserID) vm.$store.commit('setPersonalInfo', data)
        vm.$store.commit('profile/setPersonalInfo', data);
      })
      .catch(() => {
            vm.updateResultClass = vm.errorClass;
            vm.updateResultMessage = vm.$t('edit.error_updated');
            vm.updateResultShow = true;
            vm.updateVisible = false;
        });
    },
    uploadAvatar() {
      let vm = this;
      let data = new FormData();
      data.append("file", this.fileImg.selectedFile);
      vm.$store.dispatch("profile/editProfileAvatar", data)
        .then(function(respond){
            vm.avatar_update_class = vm.validClass;
            vm.avatar_update_message = vm.$t('edit.avatar_updated');
            vm.avatar_update_show = true;
            let dataAvatar = { avatar: respond.data.message };
            if (vm.profileData.userid == vm.$store.getters.getUserID) vm.$store.commit('setAvatar', dataAvatar);
            vm.$store.commit('profile/setAvatar', dataAvatar);
            vm.uploadVisible = false;
        })
        .catch(() => {
            vm.avatar_update_class = vm.errorClass;
            vm.avatar_update_message = vm.$t('edit.error_avatar_update');
            vm.avatar_update_show = true;
            vm.uploadVisible = false;
        });
    }
  },
  watch: {
      profileData(newVal) {
        if(newVal.username == null) this.loadingSkeleton = true;
        else {
          this.loadingSkeleton = false;
          this.setProfileUInfo();
        }
    }
    },
  computed: {
    profileData: function() {
      return this.$store.getters["profile/getProfileData"];
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //let role = vm.$store.getters.getUserRole;
      //if ((to.params.userID != null || to.params.userID != undefined) &&
      //    (vm.helper.isGeneralAdmin(role) || vm.helper.isAreaAdmin(role))){
      //      vm.userID = to.params.userID;
      //      vm.getUInfoEdit(vm);
      //}else vm.setStoreUInfo(vm);
      if(to.params.userID == undefined)  vm.$store.dispatch("profile/profileData", {userid: "5ed81eb921c7b15c2c563980"}).then(response => {
        vm.$store.commit("profile/setUserData", response.data);
        if(to.params.userID == vm.$store.getters.getUserID) vm.$store.commit("setUserData", response.data);
      });
     else vm.$store.dispatch("profile/profileData", {userid: to.params.userID}).then(response => {
        vm.$store.commit("profile/setUserData", response.data);
        if(to.params.userID == vm.$store.getters.getUserID) vm.$store.commit("setUserData", response.data);
      });

      
      
     });
  }

}
</script>