<template>
  <v-main>
    <p v-text="$t('news.content')" />
    <v-card class="mx-auto">
      <NewsTitleSearch />
      <p v-text="$t('news.or')" />
      <NewsTagSearch />
      <v-spacer />
      <v-btn color="primary" @click="searchNews()" v-text="$t('news.submit')" />
      <NewsListPanel />
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import newsListMod from "@/store/modules/dynamic/news/news-list.ts";
import { namespace } from "vuex-class";
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
  },
  beforeDestroy() {
    this.$store.unregisterModule("newsList");
  }
})
export default class NewsSearchCard extends Vue {
  @newsList.Action fetchNewsPreview!: () => Promise<any>;
  //fetchNewsPreviewList() {
  //  setTimeout(() => {
  //    this.fetchNewsPreview(this.model.search);
  //  }, 700);
  //}
  searchNews() {
    this.fetchNewsPreview();
  }
}
</script>
