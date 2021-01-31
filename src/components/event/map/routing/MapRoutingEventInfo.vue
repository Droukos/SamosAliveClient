<template>
  <v-card>
    <div :style="'height:' + ($vuetify.breakpoint.mdAndUp ? '500px' : '300px')">
      <LMap :zoom="14.5" :center="center" style="z-index: 0;">
        <LTileLayerBase />
        <LMarkerWithIcon :marker="center" :icon-url="emergencyCallUrl" />
        <div v-if="searchDeviceCircle">
          <LMarkerWithIcon
            v-for="aedDevice in showPreviewAedDevices"
            :key="aedDevice.id"
            :marker="getLatLon(aedDevice)"
            :icon-url="supplyAedUrl"
          />
          <LCircle :lat-lng="center" :radius="3000" color="blue" />
          <LMarkerWithIcon
            v-if="verifiedPosition"
            :marker="getLatLon2(rescuerPosition.lat, rescuerPosition.lng)"
            :icon-url="rescuerUrl"
          />
          <LMarkerRescuerDraggable v-else-if="rescuerPosition !== null" />

          <div v-if="selectedRouteInfo.coordinates.length > 0">
            <LPolyline :lat-lngs="selectedRouteInfo.coordinates" color="red" />
            <LControl position="topright">
              <MenuRouteInfo :routeInfo="selectedRouteInfo" />
            </LControl>
          </div>
        </div>
      </LMap>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import L, { LatLng } from "leaflet";
import { LCircle, LControl, LMap, LPolyline } from "vue2-leaflet";
import {
  markerIconEmergencyCall,
  markerIconMan,
  markerIconSupply
} from "../../../../plugins/api/cloudinary";
import { statusOptions } from "@/plugins/enums/event-options";
import { AedDevPreview } from "@/types/aed-device";
import { RouteInfo } from "@/types/osm";

@Component({
  components: {
    LMap,
    LCircle,
    LControl,
    LPolyline,
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LMarkerWithIcon: () =>
      import(
        /* webpackChunkName: "LMarkerWithIcon" */ "@/components/map/markers/LMarkerWithIcon.vue"
      ),
    LMarkerRescuerDraggable: () =>
      import(
        /* webpackChunkName: "LMarkerRescuerDraggable" */ "@/components/map/markers/LMarkerRescuerDraggable.vue"
      ),
    MenuRouteInfo: () =>
      import(
        /* webpackChunkName: "MenuRouteInfo" */ "@/components/event/map/routing/MenuRouteInfo.vue"
      )
  }
})
export default class MapRoutingEventInfo extends Vue {
  emergencyCallUrl = markerIconEmergencyCall;
  rescuerUrl = markerIconMan;
  supplyAedUrl = markerIconSupply;
  allStatus = statusOptions;
  @Prop() center!: LatLng;
  @Prop() searchDeviceCircle!: boolean;
  @Prop() showPreviewAedDevices!: AedDevPreview[];
  @Prop() verifiedPosition!: boolean;
  @Prop() rescuerPosition!: LatLng;
  @Prop() selectedRouteInfo!: RouteInfo;

  zoom = 13.5;

  getLatLon(aedDevice: AedDevPreview) {
    return L.latLng(aedDevice.homePoint.y, aedDevice.homePoint.x);
  }
  getLatLon2(lat: number, lon: number) {
    return L.latLng(lat, lon);
  }
}
</script>
