<template>
  <div>
    <v-app-bar app clipped-left color="deep-purple darken-3" dense>
      <NavDrawerSwitch :toggleDrawer="toggleNav" />
      <v-spacer />
      <NavAppBarMenu v-if="$vuetify.breakpoint.smAndUp" />
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
        <NavBarXsMenu v-if="$vuetify.breakpoint.xs" />
        <NavProfileCard v-if="xsMenuIndex === 1 && $vuetify.breakpoint.xs" />
        <NavBarList
          v-else-if="xsMenuIndex === 0 || $vuetify.breakpoint.smAndUp"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component({
  components: {
    NavDrawerSwitch: () =>
      import(
        /* webpackChunkName: "NavDrawerSwitch" */ "@/components/navbar/nav-utility/NavDrawerSwitch.vue"
      ),
    NavBarXsMenu: () =>
      import(
        /* webpackChunkName: "NavBarXsMenu" */ "@/components/navbar/nav-menu/NavBarXsMenu.vue"
      ),
    WebAppTitle: () =>
      import(
        /* webpackChunkName: "WebAppTitle" */ "@/components/navbar/nav-utility/WebAppTitle.vue"
      ),
    NavProfileCard: () =>
      import(
        /* webpackChunkName: "NavProfileCard" */ "@/components/navbar/nav-profile/NavProfileCard.vue"
      ),
    NavAppBarMenu: () =>
      import(
        /* webpackChunkName: "NavAppBarMenu" */ "@/components/navbar/nav-menu/NavAppBarMenu.vue"
      ),
    NavBarList: () =>
      import(
        /* webpackChunkName: "NavList" */ "@/components/navbar/nav-list/NavList.vue"
      )
  }
})
export default class NavigationDrawer extends Vue {
  @environment.Getter xsMenuIndex!: number;
  navDrawer = false;

  toggleNav() {
    this.navDrawer = !this.navDrawer;
  }
}
</script>
