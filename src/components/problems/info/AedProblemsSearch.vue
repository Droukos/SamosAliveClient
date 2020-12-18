<template
  ><v-card class="mx-auto">
    <v-text-field
      color="indigo"
      dark
      v-model="model.search"
      :loading="model.isLoading"
      class="pt-1"
      :counter="model.counter"
      :label="model.label"
      @keyup="searchProblem()"
      outlined
    ></v-text-field> </v-card
></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const problemsList = namespace("problemsList");

@Component
export default class AedProblemsSearch extends Vue {
  model = {
    search: "",
    isLoading: false,
    counter: 50,
    label: this.$t("history.searchProblem")
  };

  @problemsList.State previewProblems!: [];
  @problemsList.Action fetchProblemsPreview!: (title: string) => Promise<any>;

  fetchProblemsPreviewList() {
    setTimeout(() => {
      this.fetchProblemsPreview(this.model.search).then(response => {
        this.previewProblems = response;
      });
    }, 700);
  }
  searchProblem() {
    this.fetchProblemsPreviewList();
  }
}
</script>
