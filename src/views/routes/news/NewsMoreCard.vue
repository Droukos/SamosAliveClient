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
          {{ newsTitle }}
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>{{ content }} </v-card-text>
            <v-list-item-subtitle bottom
              >{{ username }} - {{ uploadedTime }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
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
      const newsMoreCard = vm as NewsMoreCard;
      newsMoreCard.findNewsId(to.params.newsID).then(() => {
        newsMoreCard.loadingSkeleton = false;
      });
    });
  }
})
export default class NewsMoreCard extends Vue {
  loadingSkeleton = true;
  @news.Action findNewsId!: (id: string) => Promise<any>;
  @news.State id!: string;
  @news.State username!: string;
  @news.State newsTitle!: string;
  @news.State content!: string;
  @news.State uploadedTime!: string;
}
</script>
