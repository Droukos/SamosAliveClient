<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in previewNews" :key="item.index" :cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1" v-text="item.title" />
              <v-list-item-subtitle v-text="previewCont(item)" />
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text v-text="item.user" />
            </v-list-item-action>
          </v-list-item>

          <v-card-actions>
            <v-spacer />
            <v-btn v-text="$t('news.more')" @click="more(item.id)" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { NewsInfo } from "@/types/news";

const newsList = namespace("newsList");

@Component
export default class NewsListPanel extends Vue {
  @newsList.State newsTitle!: string;
  @newsList.State previewNews!: NewsInfo[];

  previewCont(newsInfo: NewsInfo) {
    if (newsInfo.content == undefined) {
      return;
    }
    return newsInfo.content.substring(0, 70) + "..";
  }

  more(id: string) {
    this.$router.push({
      name: "newsMoreCard",
      params: { newsID: id }
    });
  }
}
</script>
