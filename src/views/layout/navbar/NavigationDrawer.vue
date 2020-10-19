<template>
  <div>
    <v-app-bar app clipped-left color="deep-purple darken-3" dense>
      <v-btn text @click.stop="drawer = !drawer" aria-label="ToNavDrawer">
        <v-icon size="40">{{ "$vuetify.icons.menu" }}</v-icon>
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :fixed="true" temporary relative dark>
      <v-list dense nav class="py-0">
        <NavProfileCard></NavProfileCard>
        <v-divider></v-divider>
        <NavBarList></NavBarList>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    NavProfileCard: () =>
      import(
        /* webpackChunkName: "NavProfileCard" */ "@/components/navbar/navdrawer/NavProfileCard.vue"
      ),
    NavBarList: () =>
      import(
        /* webpackChunkName: "NavBarList" */ "@/components/navbar/navdrawer/NavBarList.vue"
      )
  }
})
export default class NavigationDrawer extends Vue {
  drawer = false;
}
</script>
