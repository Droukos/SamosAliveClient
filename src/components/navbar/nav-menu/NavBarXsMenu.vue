<template>
  <div>
    <v-btn-toggle
      v-model="xsMenuIndex"
      dense
      mandatory
      background-color="primary"
    >
      <v-btn @click="setXsMenuIndex(0)">
        <v-icon>{{ "$apps" }}</v-icon>
      </v-btn>

      <v-btn @click="setXsMenuIndex(1)">
        <v-icon>{{ "$account" }}</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-divider />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component
export default class NavBarXsMenu extends Vue {
  @environment.Mutation setXsMenuIndex!: (index: number) => void;
  @environment.Getter xsMenuIndex!: number;
}
</script>
