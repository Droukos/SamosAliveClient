<template>
  <v-expand-transition>
    <v-card v-show="expandFilters">
      <div class="d-flex flex-row">
        <v-spacer />
        <v-btn rounded color="red" @click="closeSearchFilters">
          <v-icon v-text="'$close'" />
        </v-btn>
      </div>
      <v-sheet>
        <!--<SearchTypeRadioGroup v-if="searchOption === allOptions.AED_DEVICES" />
        <div v-else-if="searchOption === allOptions.USERS">
          <span>{{ "heetete" }}</span>
        </div>-->
      </v-sheet>
    </v-card>
  </v-expand-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component
export default class SearchFilters extends Vue {
  @search.State expandFilters!: boolean;
  @search.Mutation closeSearchFilters!: () => void;
}
</script>
