<template>
  <v-text-field
    color="indigo"
    v-model="model.search"
    :loading="model.isLoading"
    class="pt-1"
    :counter="model.counter"
    :label="model.label"
    @keyup="searchNews()"
    outlined
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsList = namespace("newsList");

@Component
export default class NewsSearch extends Vue {
  model = {
    search: "",
    isLoading: false,
    counter: 50,
    label: this.$t("history.searchEvent")
  };

  @newsList.Action fetchNewsPreview!: (newsTitle: string) => Promise<any>;
  fetchNewsPreviewList() {
    setTimeout(() => {
      this.fetchNewsPreview(this.model.search);
    }, 700);
  }
  searchNews() {
    this.model.isLoading = true;
    this.fetchNewsPreviewList();
  }
}
</script>
