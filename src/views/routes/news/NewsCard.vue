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
      <v-container fluid>
        <v-row dense>
          <v-col v-for="item in previewNews" :key="item.index" :cols="12">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    item.title
                  }}</v-list-item-title>
                  <!--<v-list-item-title>{{ item.previewCont }} </v-list-item-title>-->
                  <v-list-item-subtitle>{{
                    previewCont(item)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{
                    item.user
                  }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-text="$t('news.more')" @click="more(item.id)" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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

const news = namespace("news");
const user = namespace("user");
const search = namespace("search");

@Component
export default class News extends Vue {
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
  previewCont(newsInfo: NewsInfo) {
    if (newsInfo.content == undefined) {
      return;
    }
    return newsInfo.content.substring(0, 70) + "..";
  }
  previewNews = [];
  @search.Action fetchNewsPreview!: (newsTitle: string) => Promise<any>;
  fetchNewsPreviewList() {
    setTimeout(() => {
      this.fetchNewsPreview(this.model.search)
        .then(response => {
          this.previewNews = response;
        })
        .finally(() => (this.model.isLoading = false));
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

  more(id: string) {
    this.$router.push({
      name: "newsMore",
      params: { newsID: id }
    });
  }
}
</script>
