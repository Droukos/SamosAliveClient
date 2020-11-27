<template>
  <v-btn text @click.stop="toggleDrawer" aria-label="ToNavDrawer">
    <v-icon size="40">{{ "$menu" }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavDrawerSwitcher extends Vue {
  @Prop() toggleDrawer!: () => void;
}
</script>
