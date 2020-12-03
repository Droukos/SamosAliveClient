<template>
  <v-sheet outlined rounded elevation="2">
    <v-slider
      v-model="value"
      @end="f"
      class="mx-1"
      :label="$t('search.radius')"
      :min="cRadiusOptions.KM0"
      :max="cRadiusOptions.KM6"
      :error-messages="errors"
      thumb-label="always"
    >
      <template v-slot:append>
        <v-text-field
          v-model="value"
          class="mt-0 pt-0"
          @input="f1"
          :error-messages="errors"
          hide-details
          single-line
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
    </v-slider>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { radiusOptions } from "@/plugins/enums/search-options";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component
export default class SearchCircusRadiusSlider extends Vue {
  value = radiusOptions.KM2;
  cRadiusOptions = radiusOptions;
  errorMsg =
    this.$t("validations.over", [this.$t("search.radius"), 6]) +
    " " +
    this.$t("radius.km");
  errors = "";
  @search.Mutation setRadiusSlider!: (radius: number) => void;
  @search.Mutation setValidToSearch!: (bool: boolean) => void;

  f(v: number) {
    console.log("ooi: " + v);
    this.validateRadius(v);
  }
  f1(v: number) {
    console.log("oi: " + v);
    this.validateRadius(v);
  }

  validateRadius(radius: number) {
    if (radius > radiusOptions.KM6) {
      this.errors = this.errorMsg;
      this.setValidToSearch(false);
    } else {
      this.errors = "";
      this.setRadiusSlider(radius);
      this.setValidToSearch(true);
    }
  }
}
</script>
