<template>
  <v-tabs center-active show-arrows>
    <v-tab v-for="item in searchItems" :key="item.id" @click="selectTab(item)"
      >{{ item.label }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Tab } from "@/types";
import searchOptions from "@/plugins/enums/search-options";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component
export default class SearchOptionsTabs extends Vue {
  @search.State searchOption!: number;
  @search.State searchLabel!: string;
  @search.Mutation setSearchCounter!: (counter: number) => void;
  @search.Mutation setSearchLabel!: (label: string) => void;
  @search.Mutation setSearchOption!: (option: number) => void;

  selectTab(tab: Tab) {
    this.setSearchCounter(tab.counter);
    this.setSearchLabel(tab.searchLabel);
    this.setSearchOption(tab.id);
  }

  mounted() {
    this.setSearchLabel(this.searchItems[0].searchLabel);
    this.setSearchOption(this.searchItems[0].id);
  }

  get searchItems() {
    return [
      {
        id: searchOptions.USERS,
        title: this.$t("search.searchObj", [this.$t("fields.profile")]),
        counter: 20,
        label: this.$t("fields.profile"),
        searchLabel: `${this.$t("search.title")} ${this.$t("fields.username")}`
      },
      {
        id: searchOptions.AED_DEVICES,
        title: this.$t("search.searchObj", [this.$t("fields.device")]),
        counter: 20,
        label: this.$t("fields.device"),
        searchLabel: `${this.$t("search.title")} ${this.$t("fields.device")}`
      },
      {
        id: searchOptions.ANNOUNCEMENTS,
        title: this.$t("search.searchObj", [this.$t("news.title")]),
        counter: 50,
        label: this.$t("news.title"),
        searchLabel: `${this.$t("search.title")} ${this.$t("news.title")}`
      }
    ];
  }
}
</script>
