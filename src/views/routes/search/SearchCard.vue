<template>
  <v-content>
    <v-container>
      <SearchMainTextField v-if="!(isAedDOption && isAedDMap)" />
      <SearchMapAedDevice v-if="isAedDOption && isAedDMap" />
      <SearchBarOptions />
      <v-divider class="pb-1" />
      <SearchFilters />
      <SearchSettings />
      <v-divider />
      <SearchUserPreviewList v-if="isUserOption" />
      <SearchAedDevicePreviewList v-else-if="isAedDOption" />
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import searchOptions, {
  deviceSearchTypeRadios
} from "@/plugins/enums/search-options";

const search = namespace("search");

@Component({
  components: {
    SearchMainTextField: () =>
      import(
        /* webpackChunkName: "SearchMainTextField" */ "@/components/search/SearchMainTextField.vue"
      ),
    SearchMapAedDevice: () =>
      import(
        /* webpackChunkName: "SearchMapAedDevice" */ "@/components/search/aed/device/SearchMapAedDevice.vue"
      ),
    SearchFilters: () =>
      import(
        /* webpackChunkName: "SearchFilters" */ "@/components/search/SearchFilters.vue"
      ),
    SearchSettings: () =>
      import(
        /* webpackChunkName: "SearchSettings" */ "@/components/search/SearchSettings.vue"
      ),
    SearchBarOptions: () =>
      import(
        /* webpackChunkName: "SearchBarOptions" */ "@/components/search/SearchBarOptions.vue"
      ),
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
  @search.State searchOption!: number;
  @search.State searchDevice!: number;

  get isUserOption(): boolean {
    return this.searchOption === searchOptions.USERS;
  }
  get isAedDOption(): boolean {
    return this.searchOption === searchOptions.AED_DEVICES;
  }

  get isAedDMap(): boolean {
    return this.searchDevice === deviceSearchTypeRadios.SEARCH_MAP;
  }
}
</script>
