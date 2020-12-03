<template>
  <v-expand-transition>
    <v-card v-show="expandSettings">
      <div class="d-flex flex-row">
        <SearchOptionsTabs />
        <v-spacer />
        <v-btn rounded color="red" @click="closeSearchSettings">
          <v-icon>{{ "$close" }}</v-icon>
        </v-btn>
      </div>

      <v-sheet>
        <v-card v-if="isAedDeviceOption">
          <SearchTypeRadioGroup />
        </v-card>
        <div v-else-if="isUsersOption">
          <span>{{ "heetete" }}</span>
        </div>
      </v-sheet>
    </v-card>
  </v-expand-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import searchOptions, {
  deviceSearchTypeRadios
} from "@/plugins/enums/search-options";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    SearchOptionsTabs: () =>
      import(
        /* webpackChunkName: "SearchOptionsTabs" */ "@/components/search/SearchOptionsTabs.vue"
      ),
    SearchTypeRadioGroup: () =>
      import(
        /* webpackChunkName: "SearchTypeRadioGroup" */ "@/components/search/aed/device/SearchTypeRadioGroup.vue"
      )
  }
})
export default class SearchSettings extends Vue {
  @search.State searchOption!: number;
  @search.State searchDevice!: number;
  @search.State expandSettings!: boolean;
  @search.Mutation closeSearchSettings!: () => void;

  get isAedDeviceOption() {
    return this.searchOption === searchOptions.AED_DEVICES;
  }

  get isUsersOption() {
    return this.searchOption === searchOptions.USERS;
  }

  get isSearchDeviceMap() {
    return this.searchDevice === deviceSearchTypeRadios.SEARCH_MAP;
  }
}
</script>
