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
              <NewsUploadedTime />
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

const newsSearchInfo = namespace("newsSearchInfo");

@Component({
  components: {
    NewsContent: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/news/info/NewsContent.vue"
      ),
    NewsTitle: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/news/info/NewsTitle.vue"
      ),
    NewsUploadedTime: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/news/info/NewsUploadedTime.vue"
      ),
    NewsUsername: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/news/info/NewsUsername.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const newsMoreCard = vm as NewsMoreCard;
      newsMoreCard.findNewsId(to.params.newsID).then(() => {
        newsMoreCard.loadingSkeleton = false;
      });
    });
  }
})
export default class NewsMoreCard extends Vue {
  loadingSkeleton = true;
  @newsSearchInfo.Action findNewsId!: (id: string) => Promise<any>;
  //@newsSearchInfo.State id!: string;
}
</script>
