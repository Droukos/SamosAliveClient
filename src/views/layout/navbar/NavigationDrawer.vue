<template>
  <div>
    <v-app-bar app clipped-left color="deep-purple darken-3" dense>
      <NavDrawerSwitch :toggleDrawer="toggleNav" />
      <v-spacer />
      <v-menu
        v-if="$vuetify.breakpoint.smAndUp"
        offset-y
        :close-on-content-click="false"
      >
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
    </v-app-bar>
    <v-navigation-drawer
      v-model="navDrawer"
      :fixed="true"
      temporary
      relative
      dark
    >
      <v-list dense nav class="py-0">
        <v-row>
          <NavDrawerSwitch :toggleDrawer="toggleNav" />
          <WebAppTitle />
        </v-row>
        <v-divider />
        <div v-if="$vuetify.breakpoint.xs">
          <v-btn-toggle
            v-model="toggleExclusive"
            dense
            mandatory
            background-color="primary"
          >
            <v-btn @click="toggleExclusive = 0">
              <v-icon>{{ "$apps" }}</v-icon>
            </v-btn>

            <v-btn @click="toggleExclusive = 1">
              <v-icon>{{ "$account" }}</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-divider />
        </div>
        <NavProfileCard v-if="toggleExclusive === 1" />
        <NavBarList v-else-if="toggleExclusive === 0" />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");

@Component({
  components: {
    NavDrawerSwitch: () =>
      import(
        /* webpackChunkName: "NavDrawerSwitch" */ "@/components/navbar/navdrawer/NavDrawerSwitch.vue"
      ),
    WebAppTitle: () =>
      import(
        /* webpackChunkName: "WebAppTitle" */ "@/components/navbar/navdrawer/WebAppTitle.vue"
      ),
    NavBarAccountInfo: () =>
      import(
        /* webpackChunkName: "NavBarAccountInfo" */ "@/components/navbar/navdrawer/NavBarAccountInfo.vue"
      ),
    NavProfileCard: () =>
      import(
        /* webpackChunkName: "NavProfileCard" */ "@/components/navbar/navdrawer/NavProfileCard.vue"
      ),
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      ),
    NavBarList: () =>
      import(
        /* webpackChunkName: "NavBarList" */ "@/components/navbar/navdrawer/NavBarList.vue"
      )
  }
})
export default class NavigationDrawer extends Vue {
  @user.State username!: string;
  @user.State avatar!: string;
  navDrawer = false;
  toggleExclusive = 0;

  toggleNav() {
    this.navDrawer = !this.navDrawer;
  }
}
</script>
