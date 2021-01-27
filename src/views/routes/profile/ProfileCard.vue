<template>
  <v-main>
    <v-sheet>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        :loading="loading"
        :transition="transition"
        type="card"
      >
        <v-card class="mx-auto" max-width="934" outlined>
          <v-sheet v-if="!this.$vuetify.breakpoint.xs">
            <div class="d-flex flex-row align-start">
              <AvatarBase
                :size="190"
                :username="username"
                :avatar="avatar"
                style="font-size: 75px;"
              />

              <UserPrimInfoBase :moreOptions="moreOptions" />
            </div>
            <v-sheet elevation="2" outlined>
              <div class="d-flex flex-row align-start">
                <UserInfoBase />
                <MetaDataBase :showRole="true" />
              </div>
            </v-sheet>
          </v-sheet>
          <v-sheet v-else class="flex-column mb-6">
            <UserPrimInfoBase :moreOptions="moreOptions" />
            <div class="d-flex pa-2">
              <AvatarBase
                :size="160"
                :username="username"
                :avatar="avatar"
                style="font-size: 75px;color:black;"
              />
              <v-list-item color="rgba(0, 0, 0, .4)">
                <v-list-item-content>
                  <RoleDataBase :showRole="true" />
                </v-list-item-content>
              </v-list-item>
            </div>
            <UserInfoBase />
            <MetaDataBase :showRole="false" />
          </v-sheet>
        </v-card>
      </v-skeleton-loader>
    </v-sheet>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Role } from "@/types";

const profile = namespace("profile");
const user = namespace("user");

@Component({
  components: {
    UserPrimInfoBase: () =>
      import(
        /* webpackChunkName: "UserPrimInfoBase" */ "@/components/profile/profile-info/UserPrimInfoBase.vue"
      ),
    MetaDataBase: () =>
      import(
        /* webpackChunkName: "MetaDataBase" */ "@/components/profile/profile-info/MetaDataBase.vue"
      ),
    RoleDataBase: () =>
      import(
        /* webpackChunkName: "RoleDataBase" */ "@/components/profile/profile-info/RoleDataBase.vue"
      ),
    UserInfoBase: () =>
      import(
        /* webpackChunkName: "UserInfoBase" */ "@/components/profile/profile-info/UserInfoBase.vue"
      ),
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userID == undefined)
        vm.$store
          .dispatch("profile/profileData", {
            userid: vm.$store.getters.getUserID
          })
          .then(() => {
            (vm as ProfileCard).loading = false;
          });
      else
        vm.$store
          .dispatch("profile/profileData", { userid: to.params.userID })
          .then(() => {
            (vm as ProfileCard).loading = false;
          });
    });
  }
})
export default class ProfileCard extends Vue {
  loading = true;
  transition = "scale-transition";
  @profile.State username!: string;
  @profile.State avatar!: string;
  @profile.Getter profileUserId!: string;
  @user.Getter userUserId!: string;
  @user.Getter userRoles!: Array<Role>;

  get moreOptions() {
    const moreOptions = [];
    if (
      this.$helper.isGeneralAdmin(this.userRoles) ||
      this.$helper.isAreaAdmin(this.userRoles) ||
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
}
</script>
