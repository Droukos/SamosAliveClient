<template>
  <LMarker :lat-lng="marker" :icon="icon" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { icon, LatLng } from "leaflet";
import { LMarker } from "vue2-leaflet";
import {
  markerIconAedDeviceHeart,
  markerIconShadow
} from "@/plugins/api/cloudinary";

@Component({
  components: {
    LMarker
  }
})
export default class LMarkerAedDeviceHeart extends Vue {
  @Prop() marker!: LatLng;

  icon = icon({
    iconUrl: markerIconAedDeviceHeart,
    shadowUrl: markerIconShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 37]
  });
}
</script>
