<template>
  <v-content>
    <v-sheet>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        :loading="loading"
        :transition="transition"
        type="card"
      >
        <v-card class="mx-auto" max-width="934" outlined>
          <div class="d-none d-sm-flex">
            <div class="d-flex flex-column">
              <div class="d-flex flex-row align-start">
                <AvatarBase
                  :size="190"
                  :username="username"
                  style="font-size: 75px;color:black;"
                ></AvatarBase>
                <UserPrimInfoBase
                  :moreOptions="getMoreOptions"
                ></UserPrimInfoBase>
              </div>
              <v-card class="pa-2" shaped outlined>
                <div class="d-flex flex-row align-start">
                  <UserInfoBase></UserInfoBase>
                  <MetaDataBase :showRole="true"></MetaDataBase>
                </div>
              </v-card>
            </div>
          </div>
          <div class="d-flex d-sm-none flex-column mb-6">
            <UserPrimInfoBase :moreOptions="getMoreOptions"></UserPrimInfoBase>
            <div class="d-flex pa-2">
              <AvatarBase
                :size="160"
                :username="username"
                style="font-size: 75px;color:black;"
              ></AvatarBase>
              <v-list-item color="rgba(0, 0, 0, .4)">
                <v-list-item-content>
                  <RoleDataBase :showRole="true"></RoleDataBase>
                </v-list-item-content>
              </v-list-item>
            </div>
            <UserInfoBase></UserInfoBase>
            <MetaDataBase :showRole="false"></MetaDataBase>
          </div>
        </v-card>
      </v-skeleton-loader>
    </v-sheet>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

const profile = namespace("profile");
const user = namespace("user");

@Component({
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
  }
})
export default class ProfileCard extends Vue {
  loading = true;
  transition = "scale-transition";
  @profile.State public username!: string;
  @profile.State public profileUserId!: string;
  @user.State userUserId!: string;

  getMoreOptions() {
    const moreOptions = [];
    const roles = this.$store.getters.getRoles;
    if (
      this.$helper.isGeneralAdmin(roles) ||
      this.$helper.isAreaAdmin(roles) ||
      this.profileUserId === this.userUserId
    ) {
      moreOptions.unshift(
        {
          index: 2,
          title: this.$t("user.editProfile")
        },
        {
          index: 3,
          title: this.$t("user.activity")
        }
      );
    }
    if (this.profileUserId !== this.userUserId) {
      moreOptions.unshift(
        {
          index: 4,
          title: this.$t("user.blockComm")
        },
        {
          index: 5,
          title: this.$t("user.report")
        }
      );
    }
    if (this.profileUserId !== this.userUserId) {
      moreOptions.unshift({
        index: 1,
        title: this.$t("user.sendMessage")
      });
    }

    return moreOptions;
  }

  @Watch("profileData")
  profileDataUpdate(newVal: { username: string | null }) {
    this.loading = newVal.username == null;
  }

  beforeRouteEnter(
    to: { params: { userID: undefined } },
    from: any,
    next: (arg0: (vm: any) => void) => void
  ) {
    next(vm => {
      if (to.params.userID === undefined)
        vm.$store
          .dispatch("profile/profileData", {
            userid: vm.$store.getters.getUserID
          })
          .then((response: { data: any }) => {
            vm.$store.commit("profile/setUserData", response.data);
            if (to.params.userID === vm.$store.getters.getUserID)
              vm.$store.commit("setUserData", response.data);
          });
      else
        vm.$store
          .dispatch("profile/profileData", { userid: to.params.userID })
          .then((response: { data: any }) => {
            console.log(response.data);
            vm.$store.commit("profile/setUserData", response.data);
            if (to.params.userID === vm.$store.getters.getUserID)
              vm.$store.commit("setUserData", response.data);
          });
    });
  }
}
</script>
