<template>
  <v-sheet class="d-flex flex-row">
    <v-avatar>
      <AvatarBase
        :username="username"
        :avatar="avatar"
        :size="$vuetify.breakpoint.xs ? 35 : 50"
      />
    </v-avatar>

    <v-btn text class="text-none font-weight-bold" left @click="goToProfile">
      <span class="red--text">{{ username }}</span>
    </v-btn>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class NavBarAccountInfo extends Vue {
  @user.State userid!: string;
  @user.State username!: string;
  @user.State email!: string;
  @user.State avatar!: string;

  goToProfile() {
    this.$router.push({
      name: "user_profile",
      params: {
        userID: this.userid
      }
    });
  }
}
</script>
