<template>
  <v-card class="d-flex flex-row">
    <v-btn small class="deep-purple darken-2" disabled>{{
      $t("search.previous")
    }}</v-btn>
    <v-btn small class="deep-purple darken-2">{{ $t("search.next") }}</v-btn>

    <v-spacer />
    <v-btn icon @click="toggleSearchFilters()">
      <v-icon>{{ "$filterMenu" }}</v-icon>
    </v-btn>
    <v-btn icon @click="toggleSearchSettings()">
      <v-icon>{{ "$settings" }}</v-icon>
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component
export default class SearchBarOptions extends Vue {
  @search.Mutation toggleSearchFilters!: () => void;
  @search.Mutation toggleSearchSettings!: () => void;
}
</script>
