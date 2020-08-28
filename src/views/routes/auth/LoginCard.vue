<template>
  <v-main>
    <v-container transition="fab-transition">
      <p class="display-1" style="color:#00897B">{{ $t("login.header") }}</p>
      <LoginBase :sessExp="showSessionExpired"></LoginBase>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    LoginBase: () =>
      import(
        /* webpackChunkName: "LoginBase" */ "@/components/auth/LoginBase.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.s === "expired") (vm as LoginCard).showSessionExpired = true;
    });
  }
})
export default class LoginCard extends Vue {
  showSessionExpired = false;
}
</script>
