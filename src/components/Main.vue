<template>
<div>
  <v-app>
    <head-navbar-bundler></head-navbar-bundler>
    <v-divider></v-divider>
    <router-view></router-view>
    <v-footer app>
  </v-footer>
  </v-app>
</div>
  
</template>

<script>
  export default {
    props: {
      source: String,
    },
    components: {
     HeadNavbarBundler: () => import (/* webpackChunkName: "HeadNavbarBundler" */ "@/components/navbar/HeadNavbarBundler")
    },
    created () {
      this.$store.commit('setTheme', this.$cookies.get("userdata-theme"));
      this.$vuetify.theme.dark = this.$store.getters.getIsDarkMode;
      this.$store.dispatch("fetchUserData");
    },
  }
</script>