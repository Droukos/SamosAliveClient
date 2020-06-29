<template>
<div>
  <v-app>
    <head-navbar1></head-navbar1>
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
    template: ["<HeadNavbar1>"],
    components: {
     HeadNavbar1: () => import (/* webpackChunkName: "HeadNavBar1" */ "@/components/navbar/HeadNavbar1")
    },
    created () {
      this.$vuetify.theme.dark = true;
      this.$store.dispatch("fetchUserData");
    },
  }
</script>