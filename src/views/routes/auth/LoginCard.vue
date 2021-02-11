<template>
  <VMain>
    <VContainer transition="fab-transition">
      <p class="display-1" style="color:#00897B" v-text="$t('login.header')" />
      <LoginBase :sessExp="showSessionExpired" />
    </VContainer>
  </VMain>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");

@Component({
  components: {
    LoginBase: () =>
      import(
        /* webpackChunkName: "LoginBase" */ "@/components/auth/LoginBase.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const loginCard = vm as LoginCard;
      if (loginCard.$cookies.isKey("loggedIn") || loginCard.userid !== "") {
        loginCard.$router.push({
          name: "aedEvent"
        });
      }
      if (to.query.s === "expired") loginCard.showSessionExpired = true;
    });
  }
})
export default class LoginCard extends Vue {
  showSessionExpired = false;
  @user.State userid!: string;
}
</script>
