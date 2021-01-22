<template>
  <v-card class="mx-auto">
    <div class="d-flex flex-row">
      <v-select
        v-model="selected"
        :items="items"
        item-text="msg"
        item-value="code"
      />
      <v-btn v-text="'Search'" @click="searchProblem(selected)" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const problemsList = namespace("problemsList");

@Component
export default class AedProblemsSearch extends Vue {
  items = [
    { msg: this.$t("problems.problemS0"), code: 0 },
    { msg: this.$t("problems.problemS1"), code: 1 },
    { msg: this.$t("problems.problemS2"), code: 2 },
    { msg: this.$t("problems.problemS3"), code: 3 }
  ];
  selected = this.items[0].code;

  @problemsList.Action fetchProblemsPreview!: (title: number) => Promise<any>;

  searchProblem(selected: number) {
    this.fetchProblemsPreview(selected);
  }
}
</script>
