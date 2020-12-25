<template>
  <v-dialog
    v-model="openMapDialog"
    transition="fade-transition"
    @click:outside="closeD"
  >
    <v-lazy>
      <MapRoutingEventInfo
        :center="center"
        :searchDeviceCircle="true"
        :showPreviewAedDevices="showPreviewAedDevices"
        :verifiedPosition="verifiedPosition"
        :rescuerPosition="rescuerPosition"
        :selectedRouteInfo="selectedRouteInfo"
      />
    </v-lazy>
    <v-btn @click="closeD" v-text="$t('close')" />
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { LatLng } from "leaflet";
import { RouteInfo } from "@/types/osm";
import { IAedDevPreview } from "@/types/aed-device";

const aedEventChannelSub = namespace("aedEventChannelSub");

@Component({
  components: {
    MapRoutingEventInfo: () =>
      import(
        /* webpackChunkName: "MapRoutingEventInfo" */ "@/components/event/map/routing/MapRoutingEventInfo.vue"
      )
  }
})
export default class DialogMapRoutingInfo extends Vue {
  @Prop() aedEventId!: string;
  @Prop() center!: LatLng;
  @aedEventChannelSub.State onMapDialog!: boolean;
  @aedEventChannelSub.State rescuerPosition!: LatLng | null;
  @aedEventChannelSub.State verifiedPosition!: boolean;
  @aedEventChannelSub.State selectedRouteInfo!: RouteInfo;
  @aedEventChannelSub.State showPreviewAedDevices!: IAedDevPreview[];
  @aedEventChannelSub.Mutation setMapDialog!: (bool: boolean) => void;
  @aedEventChannelSub.Getter aedEventMarker!: (aedEventId: string) => LatLng;

  closeD() {
    this.setMapDialog(false);
  }

  get openMapDialog() {
    return this.onMapDialog;
  }
}
</script>
