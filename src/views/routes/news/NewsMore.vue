<template>
  <v-main>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      :loading="loadingSkeleton"
      transition="scale-transition"
      type="card"
    >
      <v-card class="spacing-playground pa-5">
        <v-spacer></v-spacer>
        <h2>{{ newsTitle }}</h2>
        <br />
        <p>{{ content }}</p>
        <br />
        <v-spacer></v-spacer>
        <p class="text-right">{{ username }}</p>
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const news = namespace("news");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const newsMore = vm as NewsMore;
      newsMore.findNews(to.params.newsID).then(response => {
        newsMore.loadingSkeleton = false;
      });
    });
  }
})
export default class NewsMore extends Vue {
  loadingSkeleton = true;
  @news.Action findNews!: (id: string) => Promise<any>;
  @news.State id!: string;
  @news.State username!: string;
  @news.State newsTitle!: string;
  @news.State content!: string;
}
</script>
