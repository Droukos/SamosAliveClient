<template>
  <v-text-field
    v-model="model"
    :loading="isLoading"
    :counter="searchCounter"
    :label="searchLabel"
    @keyup="search(searchOption)"
    outlined
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import debounce from "@/plugins/helpers/debounce";
import searchOptions from "@/plugins/enums/search-options";
import { RequestedPreviewUser } from "@/types";
import { IAedDevicePreview } from "@/types/aed-device";

const search = namespace("search");

@Component
export default class SearchMainTextField extends Vue {
  model = "";
  isLoading = false;
  @search.State searchModel!: string;
  @search.State searchLabel!: string;
  @search.State searchCounter!: number;
  @search.State searchOption!: number;
  @search.Action fetchUsersPreview!: (
    user: string
  ) => Promise<RequestedPreviewUser[]>;
  @search.Action fetchAedDevicesPreview!: (
    aedDeviceNickname: string
  ) => Promise<IAedDevicePreview[]>;
  @search.Mutation setPreviewAedDevices!: (
    previewAedDevices: IAedDevicePreview[]
  ) => void;
  @search.Mutation setPreviewUsers!: (
    previewUsers: RequestedPreviewUser[]
  ) => void;

  fetchUserPreviewList() {
    if (this.model.length < 2) {
      return;
    }
    this.isLoading = true;
    this.fetchUsersPreview(this.model)
      .then(response => this.setPreviewUsers(response))
      .finally(() => (this.isLoading = false));
  }

  fetchAedDevicesPreviewList() {
    if (this.model.length < 2) {
      return;
    }
    this.isLoading = true;
    this.fetchAedDevicesPreview(this.model)
      .then(response => this.setPreviewAedDevices(response))
      .finally(() => (this.isLoading = false));
  }

  search = debounce(searchOption => {
    if (searchOption === searchOptions.USERS) {
      this.fetchUserPreviewList();
    } else if (searchOption === searchOptions.AED_DEVICES) {
      this.fetchAedDevicesPreviewList();
    }
  }, 700);
}
</script>
