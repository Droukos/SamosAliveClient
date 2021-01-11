<template>
  <VContent>
    <VContainer transition="fab-transition">
      <p class="display-1" style="color:#00897B" v-text="$t('login.header')" />
      <LoginBase :sessExp="showSessionExpired" />
    </VContainer>
  </VContent>
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
