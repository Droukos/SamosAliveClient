<template>
  <v-app>
    <HeadNavbarBundler></HeadNavbarBundler>
    <!--<v-divider></v-divider>-->
    <router-view></router-view>
    <v-footer app> </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { updateAccToken } from "@/plugins/api";
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
  @user.Action public userRSocketConn!: () => void;
  @user.Action public authRSocketConn!: () => void;
  @user.Action public aedRSocketConn!: () => void;
  @user.Action public newsRSocketConn!: () => void;

  created() {
    this.setTheme(this.$cookies.get("userdata-theme"));
    this.$vuetify.theme.dark = this.isDarkMode;
    if (this.$cookies.isKey("loggedIn")) {
      this.fetchUserData();
      updateAccToken();
      this.userRSocketConn();
      this.authRSocketConn();
      this.aedRSocketConn();
      this.newsRSocketConn();
    }
  }
}
</script>
