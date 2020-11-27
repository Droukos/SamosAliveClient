<template>
  <v-content> </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
})
export default class EventMapCard extends Vue {
  zoom = 12.5;
  center = L.latLng(37.79715, 26.70226);
  url = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  marker = L.latLng(47.41322, -1.219482);
}
</script>

<style scoped>
.map {
  height: 600px;
}
</style>
