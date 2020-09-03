<template>
  <v-main>
    <p v-text="$t('news.content')" />
    <v-card class="mx-auto" max-width="500">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title v-text="$t('news.search')" />
        <v-spacer></v-spacer>
        <!--<v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>-->
      </v-toolbar>

      <v-container fluid>
        <v-row dense>
          <v-col v-for="item in getItems" :key="item.index" :cols="12">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ item.date }}</div>
                  <v-list-item-title class="headline mb-1">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.content
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">{{
                  item.img
                }}</v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-text="$t('news.more')" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class News extends Vue {
  get getItems() {
    return [
      {
        index: 0,
        username: "user1",
        date: "date1",
        title: "mpla mpla",
        content: "xixi",
        img: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      },
      {
        index: 1,
        username: "user2",
        date: "date2",
        title: "klp klp",
        content: "xixi",
        img: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      },
      {
        index: 2,
        username: "user3",
        date: this.$t("events.problemList"),
        title: "tade tade",
        content: "xixi",
        img: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      }
    ];
  }
}
</script>
