<template>
  <v-main>
    <p v-text="$t('news.content')" />
    <v-btn
      href="#"
      color="primary"
      v-text="$t('news.form')"
      @click="showDialog()"
      aria-label="ShowDialog"
    />
    <v-card class="mx-auto">
      <v-text-field
        color="indigo"
        dark
        v-model="model.search"
        :loading="model.isLoading"
        class="pt-1"
        :counter="model.counter"
        :label="model.label"
        @keyup="searchNews()"
        outlined
      ></v-text-field>
      <NewsListPanel />
    </v-card>
    <div class="text-center">
      <v-dialog v-model="dialog">
        <v-card>
          <form action id="newsForm" method="POST">
            <v-card-title class="light-blue darken-1" primary-title>
              <h6 v-text="$t('news.form')" />
            </v-card-title>

            <v-card-text>
              <h5 v-text="$t('news.formTitle')" />
              <v-text-field v-model="title.text" solo></v-text-field>
              <h5 v-text="$t('news.formContent')" />
              <v-textarea
                v-model="content.text"
                counter
                maxlength="500"
                full-width
              ></v-textarea>
            </v-card-text>
          </form>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              @click="sendNews()"
              v-text="$t('news.submit')"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { NewsInfo, User } from "@/types";
import newsListMod from "@/store/modules/dynamic/newsList.ts";

const news = namespace("news");
const user = namespace("user");
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
      const newsCard = vm as NewsCard;
      const store = newsCard.$store;
      if (!(store && store.state && store.state["newsList"])) {
        store.registerModule("newsList", newsListMod);
      }
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("newsList");
  }
})
export default class NewsCard extends Vue {
  model = {
    search: "",
    isLoading: false,
    counter: 50,
    label: this.$t("history.searchEvent")
  };
  dialog = false;
  title = {
    text: ""
  };
  content = {
    text: ""
  };
  showDialog() {
    this.dialog = true;
  }

  @newsList.Action fetchNewsPreview!: (newsTitle: string) => Promise<any>;
  fetchNewsPreviewList() {
    setTimeout(() => {
      this.fetchNewsPreview(this.model.search);
    }, 700);
  }
  searchNews() {
    this.model.isLoading = true;
    this.fetchNewsPreviewList();
  }

  @user.State username!: User.Username;
  @news.Action createNews!: (data: NewsInfo) => Promise<void>;

  sendNews() {
    this.createNews({
      username: this.username,
      newsTitle: this.title.text,
      content: this.content.text
    }).then(() => {
      console.log("news created");
    });
    this.dialog = false;
  }
}
</script>
