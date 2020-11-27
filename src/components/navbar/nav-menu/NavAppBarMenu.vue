<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar v-bind="attrs" v-on="on">
        <AvatarBase :username="username" :avatar="avatar" size="50" />
      </v-avatar>
    </template>
    <v-card class="mx-auto">
      <v-container style="width: 350px">
        <NavProfileCard />
      </v-container>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");

@Component({
  components: {
    NavProfileCard: () =>
      import(
        /* webpackChunkName: "NavProfileCard" */ "@/components/navbar/nav-profile/NavProfileCard.vue"
      ),
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class NavAppBarMenu extends Vue {
  @user.State username!: string;
  @user.State avatar!: string;
}
</script>
