<template>
  <v-main>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      :loading="loadingSkeleton"
      transition="scale-transition"
      type="card"
    >
      <v-card>
        <v-card-title class="primary">
          <NewsTitle />
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>
              <NewsContent />
            </v-card-text>
            <v-list-item-subtitle bottom>
              <NewsUsername />
              -
              <NewsUploadedTime :uploadedTime="uploadedTime" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import newsSearchInfoMod from "@/store/modules/dynamic/news/news-search-info";

const newsSearchInfo = namespace("newsSearchInfo");

@Component({
  components: {
    NewsContent: () =>
      import(
        /* webpackChunkName: "NewsContent" */ "@/components/news/info/NewsContent.vue"
      ),
    NewsTitle: () =>
      import(
        /* webpackChunkName: "NewsTitle" */ "@/components/news/info/NewsTitle.vue"
      ),
    NewsUploadedTime: () =>
      import(
        /* webpackChunkName: "NewsUploadedTime" */ "@/components/news/info/NewsUploadedTime.vue"
      ),
    NewsUsername: () =>
      import(
        /* webpackChunkName: "NewsUsername" */ "@/components/news/info/NewsUsername.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const newsMoreCard = vm as NewsMoreCard;
      const store = newsMoreCard.$store;
      if (!(store && store.state && store.state["newsSearchInfo"])) {
        store.registerModule("newsSearchInfo", newsSearchInfoMod);
      }
      newsMoreCard.findNewsId(to.params.newsID).then(() => {
        newsMoreCard.loadingSkeleton = false;
      });
    });
  }
})
export default class NewsMoreCard extends Vue {
  loadingSkeleton = true;
  @newsSearchInfo.Action findNewsId!: (id: string) => Promise<any>;
  @newsSearchInfo.State uploadedTime!: number[];
  //@newsSearchInfo.State id!: string;
}
</script>
