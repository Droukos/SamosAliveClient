<template>
  <LMarker
    :lat-lng="marker"
    :icon="icon"
    :draggable="true"
    @dragend="setLatLng"
  >
    <LTooltip>{{ "ΔΔΔ" }}</LTooltip>
  </LMarker>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import L, { LatLng, LeafletEvent } from "leaflet";
import {
  markerIconEmergencyCall,
  markerIconShadow
} from "@/plugins/api/cloudinary";
import { namespace } from "vuex-class";
import { LMarker, LTooltip } from "vue2-leaflet";
import { IReverseOsmData } from "@/types/osm";

const aedEventCreate = namespace("aedEventCreate");

@Component({
  components: {
    LMarker,
    LTooltip
  }
})
export default class LMarkerDraggable extends Vue {
  @aedEventCreate.State marker!: LatLng;
  @aedEventCreate.Action osmReverseGeoCoding!: (latLng: {
    y: number;
    x: number;
  }) => Promise<IReverseOsmData>;
  @aedEventCreate.Action vForm!: () => void;

  setLatLng(event: LeafletEvent) {
    this.osmReverseGeoCoding({
      y: event.target._latlng.lat,
      x: event.target._latlng.lng
    }).then(() => this.vForm());
  }
  icon = L.icon({
    iconUrl: markerIconEmergencyCall,
    shadowUrl: markerIconShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 37]
  });
}
</script>
