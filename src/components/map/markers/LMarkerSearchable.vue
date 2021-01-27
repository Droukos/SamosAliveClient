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
import { LMarker, LTooltip } from "vue2-leaflet";
import { icon, LatLng, LeafletEvent } from "leaflet";
import { markerIconAntenna, markerIconShadow } from "@/plugins/api/cloudinary";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    LMarker,
    LTooltip
  }
})
export default class LMarkerRedSearchable extends Vue {
  @search.State marker!: LatLng;
  @search.Mutation setSearchableMarkerLatLong!: (latLng: {
    y: number;
    x: number;
  }) => void;

  setLatLng(event: LeafletEvent) {
    this.setSearchableMarkerLatLong({
      y: event.target._latlng.lat,
      x: event.target._latlng.lng
    });
  }
  icon = icon({
    iconUrl: markerIconAntenna,
    shadowUrl: markerIconShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 37]
  });
}
</script>
