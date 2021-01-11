<template>
  <v-sheet>
    <NavProfileInfo />
    <NavProfileAvailability />
    <NavProfileRoles />
    <v-divider />
    <v-sheet> TODO Alerts, News, Events</v-sheet>
    <v-divider />
    <NavProfileOptions />
    <v-divider />
    <v-sheet>
      <v-btn block v-text="$t('user.logout')" @click="logout" />
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");

@Component({
  components: {
    NavProfileInfo: () =>
      import(
        /* webpackChunkName: "NavBarProfileInfo" */ "@/components/navbar/nav-profile/NavProfileInfo.vue"
      ),
    NavProfileAvailability: () =>
      import(
        /* webpackChunkName: "NavProfileAvailability" */ "@/components/navbar/nav-profile/NavProfileAvailability.vue"
      ),
    NavProfileRoles: () =>
      import(
        /* webpackChunkName: "NavProfileRoles" */ "@/components/navbar/nav-profile/NavProfileRoles.vue"
      ),
    NavProfileOptions: () =>
      import(
        /* webpackChunkName: "NavBarProfileOptions" */ "@/components/navbar/nav-profile/NavProfileOptions.vue"
      )
  }
})
export default class NavProfileCard extends Vue {
  @user.Action logoutUser!: () => Promise<void>;

  logout() {
    this.logoutUser().then(() => {
      this.$router.push({
        name: "login"
      });
    });
  }
}
</script>
