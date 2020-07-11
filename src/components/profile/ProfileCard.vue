<template>
  <v-content>
    <v-sheet>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        :loading="loading"
        :transition="transition"
        type="card">
        <v-card class="mx-auto" max-width="934" outlined>
          <div class="d-none d-sm-flex">
            <div class="d-flex flex-column">
              <div class="d-flex flex-row align-start">
                <avatar-base :size="190" :username="profileData.username" style="font-size: 75px;color:black;"></avatar-base>
                <user-prim-info-base :profDat="profileData" :profVis="profileVisibility" :profMetaDat="profileMetaData" :moreOptions="getMoreOptions"></user-prim-info-base>
              </div>
              <v-card class="pa-2" shaped outlined>
                <div class="d-flex flex-row align-start">
                  <user-info-base :profDat="profileData" :profVis="profileVisibility"></user-info-base>
                  <meta-data-base :showRole="true" :profDat="profileData" :profVis="profileVisibility" :profMetaDat="profileMetaData"></meta-data-base>
                </div>
              </v-card>              
            </div>
          </div>
          <div class="d-flex d-sm-none flex-column mb-6">
            <user-prim-info-base :profDat="profileData" :profVis="profileVisibility" :profMetaDat="profileMetaData" :moreOptions="getMoreOptions"></user-prim-info-base>
            <div class="d-flex pa-2">
              <avatar-base :size="160" :username="profileData.username" style="font-size: 75px;color:black;"></avatar-base>
               <v-list-item color="rgba(0, 0, 0, .4)">
                 <v-list-item-content>
                    <role-data-base :showRole="true" :profDat="profileData" :profVis="profileVisibility"></role-data-base>
                 </v-list-item-content>
               </v-list-item>
            </div>
              <user-info-base :profDat="profileData" :profVis="profileVisibility"></user-info-base>
              <meta-data-base :showRole="false" :profDat="profileData" :profVis="profileVisibility" :profMetaDat="profileMetaData"></meta-data-base>
          </div>
        </v-card>
      </v-skeleton-loader>
    </v-sheet>
  </v-content>
</template>


<script>

export default {
  inject: ["theme"],
  data: function() {
    return {
      loading: true,
      transition: "scale-transition",
      transitions: [
        {
          text: "None",
          value: undefined
        },
        {
          text: "Fade Transition",
          value: "fade-transition"
        },
        {
          text: "Scale Transition",
          value: "scale-transition"
        }
      ],
    };
  },
  template: [],
  components: {
    UserPrimInfoBase: () =>
      import(
       /* webpackChunkName: "UserPrimInfoBase" */ /* webpackPreload: true */ "@/components/profile/profile_info/UserPrimInfoBase.vue"
      ),
    MetaDataBase: () =>
      import(
       /* webpackChunkName: "MetaDataBase" */ /* webpackPreload: true */ "@/components/profile/profile_info/MetaDataBase.vue"
      ),
    RoleDataBase: () =>
      import(
        /* webpackChunkName: "RoleDataBase" */ /* webpackPreload: true */ "@/components/profile/profile_info/RoleDataBase.vue"
      ),
    UserInfoBase: () =>
      import(
       /* webpackChunkName: "UserInfoBase" */ /* webpackPreload: true */ "@/components/profile/profile_info/UserInfoBase.vue"
      ),
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ /* webpackPreload: true */ "@/components/profile/avatar/AvatarBase.vue"
      )
  },
  computed: {
    profileData: function() {
      return this.$store.getters["profile/getProfileData"];
    },
    profileMetaData: function() {
      return this.$store.getters["profile/getProfileMetaData"];
    },
    profileVisibility: function() {
      return this.$store.getters["profile/getProfileVisibility"];
    },
    getMoreOptions () {
      let moreOptions = [];
      let role = this.$store.getters.getRole;
      if(this.$helper.isGeneralAdmin(role) || this.$helper.isAreaAdmin(role) 
        || this.profileData.userid == this.$store.getters.getUserID){
        moreOptions.unshift({
            index: 2,
            title: this.$t('user.edit_profile')
        },
        {
          index: 3,
          title: this.$t('user.activity')
        }
        )
      }
      if(this.profileData.userid != this.$store.getters.getUserID) {
        moreOptions.unshift({
          index: 4,
          title: this.$t('user.block_comm')
        },
        {
          index: 5,
          title: this.$t('user.report')
        });
      }
      if(this.profileData.userid != this.$store.getters.getUserID) {
        moreOptions.unshift({
          index: 1,
          title: this.$t('user.send_message')
        })
      }
          
      return moreOptions;
    }
  },
  watch: {
    profileData(newVal) {
      if(newVal.username == null) this.loading = true;
      else this.loading = false;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
     if(to.params.userID == undefined)  vm.$store.dispatch("profile/profileData", {userid: vm.$store.getters.getUserID}).then(response => {
        vm.$store.commit("profile/setUserData", response.data);
        if(to.params.userID == vm.$store.getters.getUserID) vm.$store.commit("setUserData", response.data);
      });
     else vm.$store.dispatch("profile/profileData", {userid: to.params.userID}).then(response => {
       console.log(response.data);
        vm.$store.commit("profile/setUserData", response.data);
        if(to.params.userID == vm.$store.getters.getUserID) vm.$store.commit("setUserData", response.data);
      });
      
      
    });
  }
};
</script>