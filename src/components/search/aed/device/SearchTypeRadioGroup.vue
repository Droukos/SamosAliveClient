<template>
  <v-radio-group @change="setSearchDevice" :mandatory="true">
    <v-radio
      v-for="item in deviceRadioItems"
      :key="item.id"
      :label="item.label"
      :value="item.value"
    />
  </v-radio-group>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { deviceSearchTypeRadios } from "@/plugins/enums/search-options";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component
export default class SearchTypeRadioGroup extends Vue {
  @search.Mutation setSearchDevice!: (option: number) => void;

  get deviceRadioItems() {
    return [
      {
        id: deviceSearchTypeRadios.SEARCH_TEXT,
        label: this.$t("search.searchText"),
        value: deviceSearchTypeRadios.SEARCH_TEXT
      },
      {
        id: deviceSearchTypeRadios.SEARCH_MAP,
        label: this.$t("search.searchMap"),
        value: deviceSearchTypeRadios.SEARCH_MAP
      }
    ];
  }
}
</script>
