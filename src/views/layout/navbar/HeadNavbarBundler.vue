<template>
  <v-card class="mx-auto">
    <div v-if="!isSignedIn">
      <v-app-bar app clipped-left color="deep-purple darken-3" dense>
        <v-btn router-link to="/login" aria-label="ToLogin">
          <v-icon>{{ "$info" }}</v-icon>
        </v-btn>
        <v-spacer />
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" aria-label="ToAccountMenu">
              <v-icon>{{ "$account" }}</v-icon>
            </v-btn>
          </template>
          <v-card class="mx-auto">
            <v-container>
              <div class="d-flex justify-center mb-6">
                <h2>{{ $t("login.loginTo") }}</h2>
              </div>
              <LoginBase :sessExp="false" />
            </v-container>
          </v-card>
        </v-menu>
        <v-btn text router-link to="/settings" aria-label="ToSettings">
          <v-icon>{{ "$settings" }}</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <div v-if="isSignedIn">
      <NavigationDrawer></NavigationDrawer>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const user = namespace("user");

@Component({
  components: {
    NavigationDrawer: () =>
      import(
        /* webpackChunkName: "NavigationDrawer" */ "@/views/layout/navbar/NavigationDrawer.vue"
      ),
    LoginBase: () =>
      import(
        /* webpackChunkName: "LoginBase" */ "@/components/auth/LoginBase.vue"
      )
  }
})
export default class HeadNavbarBundler extends Vue {
  @user.Getter isSignedIn!: boolean;
}
</script>
