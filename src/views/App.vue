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
import { authRSocketApi, updateAccToken } from "@/plugins/api";
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
  @environment.Getter public isDarkMode!: boolean;
  @environment.Mutation public setTheme!: (data: string) => void;
  @user.Action public fetchUserData!: () => void;

  created() {
    this.setTheme(this.$cookies.get("userdata-theme"));
    this.$vuetify.theme.dark = this.isDarkMode;
    authRSocketApi();
    if (this.$cookies.isKey("loggedIn")) {
      this.fetchUserData();
      updateAccToken();
    }
  }
}
</script>
