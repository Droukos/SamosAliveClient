<template>
  <v-btn @click="setSubNavBarOpen(subNavOptions.MAIN)">
    <v-icon v-text="'$back'" />
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import subNavBabOptions from "@/plugins/enums/subnavbar-options";

const environment = namespace("environment");

@Component
export default class SubNavBackBtn extends Vue {
  @environment.Mutation setSubNavBarOpen!: (index: number) => void;
  subNavOptions = subNavBabOptions;
}
</script>
