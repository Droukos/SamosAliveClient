<template>
  <v-main>
    <v-card class="mx-auto">
      <NewsTitleSearch />
      <p v-text="$t('news.or')" />
      <NewsTagSearch />
      <v-spacer />
      <v-btn color="primary" @click="searchNews()" v-text="$t('news.search')" />
      <p v-text="$t('news.content')" />
      <NewsListPanel />
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import newsListMod from "@/store/modules/dynamic/news/news-list.ts";
import { namespace } from "vuex-class";
import { News } from "@/types/news";
import NewsSearchOptions = News.NewsSearchOptions;
const newsList = namespace("newsList");

@Component({
  components: {
    NewsListPanel: () =>
      import(
        /* webpackChunkName: "NewsListPanel" */ "@/components/news/NewsListPanel.vue"
      ),
    NewsTitleSearch: () =>
      import(
        /* webpackChunkName: "NewsTitleSearch" */ "@/components/news/search/NewsTitleSearch.vue"
      ),
    NewsTagSearch: () =>
      import(
        /* webpackChunkName: "NewsTagSearch" */ "@/components/news/search/NewsTagSearch.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const newsSearchCard = vm as NewsSearchCard;
      const store = newsSearchCard.$store;
      if (!(store && store.state && store.state["newsList"])) {
        store.registerModule("newsList", newsListMod);
      }
    });
  }
  //beforeDestroy() {
  //  this.$store.unregisterModule("newsList");
  //}
})
export default class NewsSearchCard extends Vue {
  @newsList.Action fetchNewsPreview!: (data: NewsSearchOptions) => Promise<any>;
  @newsList.State selectTags!: NewsSearchOptions;
  searchNews() {
    this.fetchNewsPreview(this.selectTags);
  }
}
</script>
