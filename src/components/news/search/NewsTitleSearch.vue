<template>
  <v-text-field
    color="indigo"
    v-model="model.search"
    :loading="model.isLoading"
    class="pt-1"
    :counter="model.counter"
    :label="model.label"
    @keyup="chooseTitle(model.search)"
    outlined
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { News, NewsSearchMut } from "@/types/news";
import NewsSearchOptions = News.NewsSearchOptions;
import { tagOptions } from "@/plugins/enums/tags-options";

const newsList = namespace("newsList");

@Component
export default class NewsSearch extends Vue {
  model = {
    search: "",
    isLoading: false,
    counter: 50,
    label: this.$t("news.search")
  };
  @newsList.Mutation selectOptions!: (data: NewsSearchMut) => void;
  @newsList.State selectTags!: NewsSearchOptions;

  chooseTitle(title: string) {
    console.log(title);
    this.selectOptions({
      options: { newsTitle: title, searchTag: this.selectTags.searchTag },
      searchCode: tagOptions.SELECT
    });
  }
}
</script>
