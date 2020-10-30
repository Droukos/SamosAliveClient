<template>
  <v-sheet>
    <NavBarAccountInfo />
    <NavProfileAvailability />
    <NavProfileRoles />
    <v-divider />
    <v-sheet> TODO Alerts, News, Events</v-sheet>
    <v-divider />
    <NavBarAccountOptions />
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
    NavBarAccountInfo: () =>
      import(
        /* webpackChunkName: "NavBarAccountInfo" */ "@/components/navbar/navdrawer/NavBarAccountInfo.vue"
      ),
    NavProfileAvailability: () =>
      import(
        /* webpackChunkName: "NavProfileAvailability" */ "@/components/navbar/navdrawer/NavProfileAvailability.vue"
      ),
    NavProfileRoles: () =>
      import(
        /* webpackChunkName: "NavProfileRoles" */ "@/components/navbar/navdrawer/NavProfileRoles.vue"
      ),
    NavBarAccountOptions: () =>
      import(
        /* webpackChunkName: "NavBarAccountOptions" */ "@/components/navbar/navdrawer/NavBarAccountOptions.vue"
      )
  }
})
export default class NavBarProfile extends Vue {}
</script>
