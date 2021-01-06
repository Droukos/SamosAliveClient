<template>
  <LMarker
    :lat-lng="rescuerPosition"
    :icon="icon"
    :draggable="true"
    @dragend="setLatLng"
  >
    <LTooltip>{{ "ΔΔΔ" }}</LTooltip>
  </LMarker>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LMarker, LTooltip } from "vue2-leaflet";
import L, { latLng, LatLng, LeafletEvent } from "leaflet";
import { markerIconMan, markerIconShadow } from "@/plugins/api/cloudinary";
import { namespace } from "vuex-class";

const aedEventChannelSub = namespace("aedEventChannelSub");

@Component({
  components: {
    LMarker,
    LTooltip
  }
})
export default class LMarkerRescuerDraggable extends Vue {
  @aedEventChannelSub.State rescuerPosition!: LatLng;
  @aedEventChannelSub.Mutation setRescuerPos!: (data: LatLng) => void;

  setLatLng(event: LeafletEvent) {
    this.setRescuerPos(
      latLng(event.target._latlng.lat, event.target._latlng.lng)
    );
  }
  icon = L.icon({
    iconUrl: markerIconMan,
    shadowUrl: markerIconShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 37]
  });
}
</script>
