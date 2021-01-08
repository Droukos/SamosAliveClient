<template>
  <v-main>
    <p v-text="$t('news.content')" />
    <v-card class="mx-auto">
      <NewsListPanel />
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import newsListMod from "@/store/modules/dynamic/news/news-list.ts";
import { namespace } from "vuex-class";
import { tagOptions } from "@/plugins/enums/tags-options";
import { NewsSearchOptions, NewsSearchMut } from "@/types/news";
const newsList = namespace("newsList");

@Component({
  components: {
    NewsListPanel: () =>
      import(
        /* webpackChunkName: "NewsListPanel" */ "@/components/news/NewsListPanel.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const newsAllCard = vm as NewsAllCard;
      const store = newsAllCard.$store;
      if (!(store && store.state && store.state["newsList"])) {
        store.registerModule("newsList", newsListMod);
      }
      newsAllCard.chooseOptions();
    });
  }
  //beforeDestroy() {
  //  this.$store.unregisterModule("newsList");
  //}
})
export default class NewsAllCard extends Vue {
  @newsList.Action fetchNewsPreview!: (data: NewsSearchOptions) => Promise<any>;
  @newsList.Mutation selectOptions!: (data: NewsSearchMut) => void;
  @newsList.State allTags!: NewsSearchOptions;

  chooseOptions() {
    this.selectOptions({
      options: {
        newsTitle: this.allTags.newsTitle,
        searchTag: this.allTags.searchTag
      },
      searchCode: tagOptions.ALL
    });
    this.fetchNewsPreview(this.allTags);
  }
}
</script>
