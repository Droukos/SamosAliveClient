<template>
  <v-app>
    <HeadNavbarBundler />
    <router-view />
    <v-footer app />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { updateAccToken } from "@/plugins/api";
import { authRSocketApi } from "@/plugins/api/rsocket-api";
const user = namespace("user");
const environment = namespace("environment");

@Component({
  components: {
    HeadNavbarBundler: () =>
      import(
        /* webpackChunkName: "HeadNavbarBundler" */ "@/views/layout/navbar/HeadNavbarBundler.vue"
      )
  }
})
export default class App extends Vue {
  @environment.Getter isDarkMode!: boolean;
  @environment.Mutation setTheme!: (data: string) => void;
  @user.Action fetchUserData!: () => void;
  @user.Action listenAuth!: () => void;

  created() {
    this.setTheme(this.$cookies.get("userdata-theme"));
    this.$vuetify.theme.dark = this.isDarkMode;
    authRSocketApi();
    if (this.$cookies.isKey("loggedIn")) {
      this.fetchUserData();
      this.listenAuth();
      updateAccToken();
    }
  }
}
</script>
