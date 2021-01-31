<template>
  <v-list-item three-line>
    <v-list-item-content>
      <span
        class="subtitle-2"
        v-text="$t('events.callee') + ': ' + aedEvent.callee"
      />
      <span
        class="subtitle-2"
        v-text="
          $t('events.callee') + ' ' + $t('events.phone') + ': ' + aedEvent.phone
        "
      />
      <span class="subtitle-2">
        {{ $t("events.address") }}
        <AedEventAddress :address="aedEvent.address" />
      </span>
      <span class="subtitle-2">
        {{ $t("events.comment") }}
        <AedEventComment :comment="aedEvent.comment" />
      </span>
      <span v-if="aedEvent.conclusion != null" class="subtitle-2">
        {{ $t("events.concl") }}
        <AedEventConclusion :conclusion="aedEvent.conclusion" />
      </span>
      <MapRoutingEventInfo
        :center="center"
        :searchDeviceCircle="searchDeviceCircle"
        :showPreviewAedDevices="previewAedDevice"
        :verifiedPosition="verifiedRescuerPos"
        :rescuerPosition="rescuerPosition"
        :selectedRouteInfo="routeInfo"
      />
      <v-list-item-subtitle bottom>
        {{ $t("events.upload") }}
        <AedEventUsername :username="aedEvent.username" />
        -
        <AedEventRequestedTime :requestedTime="aedEvent.requestedTime" />
      </v-list-item-subtitle>
      <div v-if="aedEvent.status === allStatus.COMPLETED">
        <v-list-item-subtitle bottom>
          {{ $t("events.complete") }}
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
import { AedEventInfoDto } from "@/types/aed-event";
import { latLng, LatLng } from "leaflet";
import { statusOptions } from "@/plugins/enums/event-options";
import {
  markerIconEmergencyCall,
  markerIconMan,
  markerIconSupply
} from "@/plugins/api/cloudinary";
import { AedDevPreview } from "@/types/aed-device";
import { RouteInfo } from "@/types/osm";

@Component({
  components: {
    MapRoutingEventInfo: () =>
      import(
        /* webpackChunkName: "MapRoutingEventInfo" */ "@/components/event/map/routing/MapRoutingEventInfo.vue"
      ),
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
  @Prop() previewAedDevice!: AedDevPreview[];
  @Prop() routeInfo!: RouteInfo;
  @Prop() verifiedRescuerPos!: boolean;
  @Prop() rescuerPosition!: LatLng | null;

  emergencyCallUrl = markerIconEmergencyCall;
  rescuerUrl = markerIconMan;
  supplyAedUrl = markerIconSupply;
  allStatus = statusOptions;

  zoom = 13.5;

  getLatLon(aedDevice: AedDevPreview) {
    return latLng(aedDevice.homePoint.y, aedDevice.homePoint.x);
  }
  getLatLon2(lat: number, lon: number) {
    return latLng(lat, lon);
  }
}
</script>
