<template>
  <v-content>
    <v-text-field
      v-model="model"
      :loading="isLoading"
      class="pt-1"
      :counter="counter"
      :label="label"
      prepend-icon="mdi-database-search"
      @keyup="search(searchOption)"
      outlined
    ></v-text-field>

    <v-card>
      <v-tabs center-active show-arrows>
        <v-tab
          v-for="item in searchItems"
          :key="item.id"
          @click="selectTab(item)"
          >{{ item.label }}
        </v-tab>
      </v-tabs>
    </v-card>
    <v-divider class="pb-1"></v-divider>
    <SearchUserPreviewList
      v-if="searchOption === allOptions.USERS"
      :previewUsers="previewUsers"
    />
    <SearchAedDevicePreviewList
      v-else-if="searchOption === allOptions.AED_DEVICES"
      :previewAedDevices="previewAedDevices"
    />
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RequestedPreviewUser, Tab } from "@/types";
import { namespace } from "vuex-class";
import debounce from "@/plugins/helpers/debounce";
import { IAedDevicePreview } from "@/types/aed-device";
import searchOptions from "@/plugins/enums/search-options";

const search = namespace("search");

@Component({
  components: {
    SearchUserPreviewList: () =>
      import(
        /* webpackChunkName: "SearchUserPreviewList" */ "@/components/search/SearchUserPreviewList.vue"
      ),
    SearchAedDevicePreviewList: () =>
      import(
        /* webpackChunkName: "SearchAedDevicePreviewList" */ "@/components/search/SearchAedDevicePreviewList.vue"
      )
  }
})
export default class SearchCard extends Vue {
  isLoading = false;
  model = "";
  counter = 30;
  allOptions = searchOptions;
  searchOption: number = searchOptions.USERS;
  label = "";
  previewUsers: RequestedPreviewUser[] = [];
  previewAedDevices: IAedDevicePreview[] = [];
  @search.Action fetchUsersPreview!: (
    user: string
  ) => Promise<RequestedPreviewUser[]>;
  @search.Action fetchAedDevicesPreview!: (
    aedDeviceNickname: string
  ) => Promise<IAedDevicePreview[]>;

  selectTab(tab: Tab) {
    this.label = tab.searchLabel;
    this.counter = tab.counter;
    this.searchOption = tab.id;
    console.log(this.searchOption);
  }

  fetchUserPreviewList() {
    if (this.model.length < 2) {
      return;
    }
    this.isLoading = true;
    this.fetchUsersPreview(this.model)
      .then(response => (this.previewUsers = response))
      .finally(() => (this.isLoading = false));
  }

  fetchAedDevicesPreviewList() {
    if (this.model.length < 2) {
      return;
    }
    this.isLoading = true;
    this.fetchAedDevicesPreview(this.model)
      .then(response => (this.previewAedDevices = response))
      .finally(() => (this.isLoading = false));
  }

  search = debounce(searchOption => {
    if (searchOption === searchOptions.USERS) {
      this.fetchUserPreviewList();
    } else if (searchOption === searchOptions.AED_DEVICES) {
      this.fetchAedDevicesPreviewList();
    }
  }, 700);

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
