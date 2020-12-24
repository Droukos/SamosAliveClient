<template>
  <v-list-item three-line>
    <v-list-item-content>
      <v-card-text>
        {{ addr }}
        <AedEventAddress :address="aedEvent.address" />
      </v-card-text>
      <v-card-text>
        {{ comm }}
        <AedEventComment :comment="aedEvent.comment" />
      </v-card-text>
      <v-card-text>
        {{ concl }}
        <AedEventConclusion :conclusion="aedEvent.conclusion" />
      </v-card-text>
      <div
        :style="'height:' + ($vuetify.breakpoint.mdAndUp ? '500px' : '300px')"
      >
        <LMap :zoom="zoom" :center="center" style="z-index: 0;">
          <LTileLayerBase />
          <LMarkerWithIcon :marker="marker" :icon-url="emergencyCallUrl" />
          <div v-if="searchDeviceCircle">
            <LMarkerWithIcon
              v-for="aedDevice in previewAedDevice"
              :key="aedDevice.id"
              :marker="getLatLon(aedDevice)"
              :icon-url="supplyAedUrl"
            />
            <LCircle :lat-lng="marker" :radius="3000" color="blue" />
            <LMarkerRescuerDraggable v-if="rescuerPosition !== null" />
            <div v-if="routeInfo.coordinates.length > 0">
              <LPolyline
                :lat-lngs="routeInfo.coordinates"
                :color="polyline.color"
              />
              <LControl position="topright">
                <MenuRouteInfo :routeInfo="routeInfo" />
              </LControl>
            </div>
          </div>
        </LMap>
      </div>
      <v-list-item-subtitle bottom>
        {{ upload }}
        <AedEventUsername :username="aedEvent.username" />
        -
        <AedEventRequestedTime :requestedTime="aedEvent.requestedTime" />
      </v-list-item-subtitle>
      <div v-if="aedEvent.status === allStatus.COMPLETED">
        <v-list-item-subtitle bottom>
          {{ complete }}
          <AedEventRescuer :rescuer="aedEvent.rescuer" />
          -
          <AedEventCompletedTime :completedTime="aedEvent.completedTime" />
        </v-list-item-subtitle>
      </div>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text>
        <AedEventStatus :status="aedEvent.status" />
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LCircle, LControl, LMap, LPolyline } from "vue2-leaflet";
import { AedEventInfoDto } from "@/types/aed-event";
import L from "leaflet";
import { LatLng } from "leaflet";
import { statusOptions } from "@/plugins/enums/event-options";
import {
  markerIconEmergencyCall,
  markerIconSupply
} from "@/plugins/api/cloudinary";
import { IAedDevicePreview } from "@/types/aed-device";
import { ResponseRouteInfo } from "@/types/osm";

@Component({
  components: {
    LMap,
    LCircle,
    LControl,
    LPolyline,
    AedEventAddress: () =>
      import(
        /* webpackChunkName: "AedEventAddress" */ "@/components/event/info/AedEventAddress.vue"
      ),
    AedEventComment: () =>
      import(
        /* webpackChunkName: "AedEventComment" */ "@/components/event/info/AedEventComment.vue"
      ),
    AedEventCompletedTime: () =>
      import(
        /* webpackChunkName: "AedEventCompletedTime" */ "@/components/event/info/AedEventCompletedTime.vue"
      ),
    AedEventConclusion: () =>
      import(
        /* webpackChunkName: "AedEventConclusion" */ "@/components/event/info/AedEventConclusion.vue"
      ),
    AedEventOccurrenceType: () =>
      import(
        /* webpackChunkName: "AedEventOccurrenceType" */ "@/components/event/info/AedEventOccurrenceType.vue"
      ),
    AedEventRequestedTime: () =>
      import(
        /* webpackChunkName: "AedEventRequestedTime" */ "@/components/event/info/AedEventRequestedTime.vue"
      ),
    AedEventRescuer: () =>
      import(
        /* webpackChunkName: "AedEventRescuer" */ "@/components/event/info/AedEventRescuer.vue"
      ),
    AedEventStatus: () =>
      import(
        /* webpackChunkName: "AedEventStatus" */ "@/components/event/info/AedEventStatus.vue"
      ),
    AedEventUsername: () =>
      import(
        /* webpackChunkName: "AedEventUsername" */ "@/components/event/info/AedEventUsername.vue"
      ),
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
export default class AedEventMainInfo extends Vue {
  @Prop() aedEvent!: AedEventInfoDto;
  @Prop() center!: LatLng;
  @Prop() marker!: LatLng;
  @Prop() searchDeviceCircle!: boolean;
  @Prop() previewAedDevice!: IAedDevicePreview[];
  @Prop() routeInfo!: ResponseRouteInfo;
  @Prop() rescuerPosition!: LatLng | null;

  polyline = {
    color: "red"
  };

  emergencyCallUrl = markerIconEmergencyCall;
  supplyAedUrl = markerIconSupply;

  allStatus = statusOptions;

  zoom = 13.5;
  addr = this.$t("events.addr");
  comm = this.$t("events.comm");
  concl = this.$t("events.concl");
  upload = this.$t("events.upload");
  complete = this.$t("events.complete");

  getLatLon(aedDevice: IAedDevicePreview) {
    return L.latLng(aedDevice.homePoint.y, aedDevice.homePoint.x);
  }
}
</script>
