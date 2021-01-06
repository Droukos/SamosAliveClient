<template>
  <LMarker :lat-lng="marker" :icon="icon" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import L from "leaflet";
import { markerIconShadow } from "@/plugins/api/cloudinary";
import { LMarker } from "vue2-leaflet";

@Component({
  components: {
    LMarker
  }
})
export default class LMarkerWithIcon extends Vue {
  @Prop() marker!: L.LatLng;
  @Prop() iconUrl!: string;

  icon = L.icon({
    iconUrl: this.iconUrl,
    shadowUrl: markerIconShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 37]
  });
}
</script>
