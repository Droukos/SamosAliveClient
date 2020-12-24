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
      <v-btn block>
        {{ $t("user.logout") }}
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
export default class NavProfileCard extends Vue {}
</script>
