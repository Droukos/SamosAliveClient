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
              <LoginBase :sessExp="false"></LoginBase>
            </v-container>
          </v-card>
        </v-menu>
        <v-btn text router-link to="/settings" aria-label="ToSettings">
          <v-icon>{{ "$settings" }}</v-icon>
        </v-btn>
        <!--<v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" aria-label="Language">
              <v-icon>{{ '$vuetify.icons.translate' }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in langs" :key="index" @click="selLanguage(index)">
              <v-list-item-title>{{item.label}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>-->
        <!--<v-progress-linear
          indeterminate
          absolute
          bottom
          color="green"
        ></v-progress-linear>-->
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
