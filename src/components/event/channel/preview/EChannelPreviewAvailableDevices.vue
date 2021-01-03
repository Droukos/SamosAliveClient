<template>
  <v-card>
    <v-list v-if="showPreviewList">
      <v-list-item
        v-for="aedDevice in previewAedDevices"
        :key="aedDevice.id"
        @mouseover="highlightDevice(aedDevice)"
        @dragover="highlightDevice(aedDevice)"
        @mouseleave="showAllDevices"
        @dragleave="showAllDevices"
        @click="setAedDeviceSelected(aedDevice)"
      >
        <AedDevicePreviewInfo
          :aedDevicePreviewInfo="aedDevice"
          :selectDevice="assignDeviceToEvent"
          :verifiedRescuerPos="rescuerPosition != null"
          :deviceIsSelected="false"
          :setShowPreviewAedDevice="setShowPreviewAedDevice"
          :setMapDialog="setMapDialog"
        />
      </v-list-item>
    </v-list>
    <span
      v-else-if="notAvailableDevices"
      class="red--text subtitle-2"
      v-text="$t('events.unAvAedDev')"
    />

    <v-divider />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IAedDevPreview } from "@/types/aed-device";
import { namespace } from "vuex-class";
import { AedEventInfoDto, AedEventRescuerInfo } from "@/types/aed-event";
import { LatLng } from "leaflet";
import { PreviewUser } from "@/types";

const user = namespace("user");
const eChannel = namespace("aedEventChannelSub");

@Component({
  components: {
    AedDevicePreviewInfo: () =>
      import(
        /* webpackChunkName: "AedDevicePreviewInfo" */ "@/components/device/aed/info/AedDevicePreviewInfo.vue"
      )
  }
})
export default class EChannelPreviewAvailableDevices extends Vue {
  @Prop() aedEventId!: string;
  @user.State username!: string;
  @eChannel.State notAvailableDevices!: boolean;
  @eChannel.State rescuerPosition!: LatLng | null;
  @eChannel.State previewAedDevices!: IAedDevPreview[];
  @eChannel.State selectedRescuer!: PreviewUser | null;
  @eChannel.Mutation setAedDeviceSelected!: (aedDevice: IAedDevPreview) => void;
  @eChannel.Mutation setMapDialog!: (bool: boolean) => void;
  @eChannel.Mutation setShowPreviewAedDevice!: (
    previewAedDevices: IAedDevPreview[]
  ) => void;
  @eChannel.Action subRescuer!: (
    data: AedEventRescuerInfo
  ) => Promise<AedEventInfoDto>;

  assignDeviceToEvent(data: IAedDevPreview) {
    this.subRescuer({
      id: this.aedEventId,
      rescuer: this.username,
      aedDeviceId: data.id,
      estimatedFinish: data.responseRouteInfo!.summary.totalTime,
      aedDevicePreview: data
    });
  }

  highlightDevice(aedDevice: IAedDevPreview) {
    this.setShowPreviewAedDevice([aedDevice]);
  }

  showAllDevices() {
    this.setShowPreviewAedDevice(this.previewAedDevices);
  }

  get showPreviewList() {
    return (
      this.selectedRescuer == null &&
      !this.notAvailableDevices &&
      this.previewAedDevices.length > 0
    );
  }
}
</script>
