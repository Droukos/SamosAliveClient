<template>
  <v-main>
    <p v-text="$t('news.content')" />
    <v-card class="mx-auto">
      <NewsSearch />
      <NewsListPanel />
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import newsListMod from "@/store/modules/dynamic/news/news-list.ts";

@Component({
  components: {
    NewsListPanel: () =>
      import(
        /* webpackChunkName: "NewsListPanel" */ "@/components/news/NewsListPanel.vue"
      ),
    NewsSearch: () =>
      import(
        /* webpackChunkName: "NewsSearch" */ "@/components/news/info/NewsSearch.vue"
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
export default class NewsSearchCard extends Vue {}
</script>
