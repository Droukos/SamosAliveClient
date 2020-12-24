<template>
  <v-card outlined>
    <span v-text="$t('search.currentPos')" />
    <div class="d-flex flex-row">
      <v-text-field
        dense
        outlined
        :value="markerLat"
        label="lat"
        hide-details
        readonly
      />
      <v-text-field
        dense
        outlined
        :value="markerLng"
        label="lng"
        hide-details
        readonly
      />
    </div>
    <span>{{ $t("search.goTo") }}</span>
    <div class="d-flex flex-row">
      <v-text-field
        dense
        outlined
        v-model="yToGo"
        @input="isXYValid"
        :rules="[rules.isNumber]"
        label="lat"
      />
      <v-text-field
        dense
        outlined
        v-model="xToGo"
        @input="isXYValid"
        :rules="[rules.isNumber]"
        label="lng"
      />
    </div>
    <div class="d-flex flex-row">
      <v-spacer />
      <v-btn
        v-if="validGo"
        small
        @click="setSearchableMarkerLatLong({ y: yToGo, x: xToGo })"
        v-text="$t('search.go')"
      />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LControl } from "vue2-leaflet";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    LControl
  }
})
export default class LControlGoToLatLng extends Vue {
  @search.Getter markerLat!: number;
  @search.Getter markerLng!: number;
  yToGo = 0;
  xToGo = 0;
  @search.Mutation setSearchableMarkerLatLong!: (latLng: {
    y: number;
    x: number;
  }) => void;
  validGo = false;
  rules = {
    isNumber: (v: any) =>
      (!isNaN(parseFloat(v)) && isFinite(v)) ||
      this.$t("validations.fieldNumber")
  };

  isNumeric(v: any) {
    return !isNaN(parseFloat(v)) && isFinite(v);
  }

  mounted() {
    this.yToGo = this.markerLat;
    this.xToGo = this.markerLng;
  }

  isXYValid() {
    this.validGo = this.isNumeric(this.xToGo) && this.isNumeric(this.yToGo);
  }

  goToLatLng() {
    this.setSearchableMarkerLatLong({ y: this.yToGo, x: this.xToGo });
  }
}
</script>
