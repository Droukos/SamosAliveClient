<template>
  <v-container fluid>
    <v-select
      v-model="Tag"
      :items="tags"
      item-value="tag"
      item-text="name"
      label="Tags"
      multiple
      v-on:change="chooseTag()"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { News, NewsSearchMut } from "@/types/news";
import { tagOptions } from "@/plugins/enums/tags-options";
import NewsSearchOptions = News.NewsSearchOptions;

const newsList = namespace("newsList");

@Component
export default class NewsContentInput extends Vue {
  Tag = [];
  tags = [
    {
      tag: 1,
      name: "AED"
    },
    {
      tag: 2,
      name: "HEALTH"
    },
    {
      tag: 3,
      name: "SAMOS"
    },
    {
      tag: 4,
      name: "OTHER"
    },
    {
      tag: -1,
      name: "ALL"
    }
  ];

  @newsList.Mutation selectOptions!: (data: NewsSearchMut) => void;
  @newsList.State selectTags!: NewsSearchOptions;

  chooseTag() {
    this.selectOptions({
      options: { newsTitle: this.selectTags.newsTitle, searchTag: this.Tag },
      searchCode: tagOptions.SELECT
    });
  }
}
</script>
