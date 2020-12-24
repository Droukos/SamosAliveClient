<template>
  <div :style="'height:' + ($vuetify.breakpoint.mdAndUp ? '600px' : '300px')">
    <LMap
      class="custom-popup"
      :zoom="zoom"
      :center="center"
      style="z-index: 0;"
    >
      <LTileLayerBase />
      <LControlMenuSearchable />
      <LMarkerSearchable />
      <LCircleSearchable />
      <LMarker
        v-for="aedDevice in previewAedDevices"
        :key="aedDevice.id"
        :lat-lng="getMarker(aedDevice.homePoint)"
        :icon="icon"
      >
        <LPopup :options="classObj">
          <v-card>
            <span v-text="aedDevice.modelName" />
          </v-card>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { LMap, LMarker, LPopup } from "vue2-leaflet";
import L from "leaflet";
import { AedDevice, IAedDevicePreview } from "@/types/aed-device";
import {
  markerIconAedDeviceHeart,
  markerIconShadow
} from "@/plugins/api/cloudinary";
import HomePoint = AedDevice.HomePoint;

const search = namespace("search");

@Component({
  components: {
    LMap,
    LMarker,
    LPopup,
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LControlMenuSearchable: () =>
      import(
        /* webpackChunkName: "LControlMenuSearchable" */ "@/components/map/controls/LControlMenuSearchable.vue"
      ),

    LMarkerSearchable: () =>
      import(
        /* webpackChunkName: "LMarkerSearchable" */ "@/components/map/markers/LMarkerSearchable.vue"
      ),
    LCircleSearchable: () =>
      import(
        /* webpackChunkName: "LCircleSearchable" */ "@/components/map/circle/LCircleSearchable.vue"
      )
  }
})
export default class SearchMapAedDevice extends Vue {
  @search.State zoom!: number;
  @search.State center!: L.LatLng;
  @search.State previewAedDevices!: IAedDevicePreview[];

  getMarker(point: HomePoint) {
    return L.latLng(point.y, point.x);
  }
  icon = L.icon({
    iconUrl: markerIconAedDeviceHeart,
    shadowUrl: markerIconShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 37],
    popupAnchor: [0, -30]
  });

  get classObj() {
    return {
      className: "red"
    };
  }
}
</script>

<style>
.mypopup.leaflet-popup-content-wrapper {
  background-color: gray;
}
</style>
