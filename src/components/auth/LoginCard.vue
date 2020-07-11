<template>
  <v-main>
    <v-container transition="fab-transition">
      <p class="display-1" style="color:#00897B">{{ $t('login.header') }}</p>
      <login-base :sessExp="showSessionExpired"></login-base>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      showSessionExpired: false
    }
  },
  components: {
    LoginBase: () =>
      import(
       /* webpackChunkName: "LoginBase" */ "@/components/auth/LoginBase"
      ),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.s == "expired") vm.showSessionExpired = true;
    });
  }
};
</script>