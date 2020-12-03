<template>
  <l-circle :lat-lng="marker" :radius="radius" color="blue" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LatLng } from "leaflet";
import { LCircle } from "vue2-leaflet";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    LCircle
  }
})
export default class LCircleSearchable extends Vue {
  @search.State marker!: LatLng;
  @search.State radius!: number;
}
</script>
