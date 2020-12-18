<template>
  <v-main>
    <v-card>
      <v-card-title class="light-blue darken-1" primary-title>
        <h3 v-text="$t('news.form')" />
      </v-card-title>

      <v-card-text>
        <h4 v-text="$t('news.formTitle')" />
        <NewsTitleInput />
        <h4 v-text="$t('news.formContent')" />
        <NewsContentInput />
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="sendNews()" v-text="$t('news.submit')">
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User, FieldObject } from "@/types";
import { NewsCard } from "@/types/news";
import newsCreateMod from "@/store/modules/dynamic/news/news-create";

const user = namespace("user");
const newsCreate = namespace("newsCreate");

@Component({
  components: {
    NewsTitleInput: () =>
      import(
        /* webpackChunkName: "NewsTitleInput" */ "@/components/news/create/NewsTitleInput.vue"
      ),
    NewsContentInput: () =>
      import(
        /* webpackChunkName: "NewsContentInput" */ "@/components/news/create/NewsContentInput.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const newsCreate = vm as NewsCreate;
      const store = newsCreate.$store;
      if (!(store && store.state && store.state["newsCreate"])) {
        store.registerModule("newsCreate", newsCreateMod);
      }
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("newsCreate");
  }
})
export default class NewsCreate extends Vue {
  @user.State username!: User.Username;
  @newsCreate.State fNewsTitle!: FieldObject;
  @newsCreate.State fContent!: FieldObject;
  @newsCreate.State createVisible!: boolean;
  @newsCreate.Action createNews!: (data: NewsCard) => Promise<void>;

  sendNews() {
    this.createNews({
      username: this.username,
      newsTitle: this.fNewsTitle.v,
      content: this.fContent.v
    }).then(() => {
      console.log("news created");
    });
  }
}
</script>
