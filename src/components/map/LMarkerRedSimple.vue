<template>
  <LMarker :lat-lng="marker" :icon="icon" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { icon, LatLng } from "leaflet";
import { LMarker, LTooltip } from "vue2-leaflet";
import {
  markerIconRedSimple,
  markerIconShadow
} from "@/plugins/api/cloudinary";

@Component({
  components: {
    LMarker,
    LTooltip
  }
})
export default class LMarkerSimple extends Vue {
  @Prop() marker!: LatLng;

  icon = icon({
    iconUrl: markerIconRedSimple,
    shadowUrl: markerIconShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 37]
  });
}
</script>
