<template>
  <v-content>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      :loading="loading"
      :transition="transition"
      type="card"
    >
      <v-container>
        <v-card>
          <v-card-title>
            <AedEventOccurrenceType
              :occurrenceType="aedEventDto.occurrenceType"
            />
          </v-card-title>
          <v-card-subtitle v-text="$t('events.id') + ': ' + aedEventId" />
          <AedEventMainInfo
            :aedEvent="aedEventDto"
            :center="aedEventMarkerCenter"
            :marker="aedEventMarkerCenter"
            :searchDeviceCircle="true"
            :previewAedDevice="showPreviewAedDevices"
            :routeInfo="selectedRouteInfo"
            :verifiedRescuerPos="verifiedPosition"
            :rescuerPosition="rescuerPosition"
          />
          <v-divider />
          <div class="d-flex flex-column">
            <v-list>
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
          </div>
          <DialogMapRoutingInfo
            :aedEventId="aedEventId"
            :center="aedEventMarkerCenter"
          />
          <v-container>
            <div v-if="selectedRescuer !== null && aedDeviceSelected !== null">
              <span class="subtitle-2" v-text="$t('events.selectedDevice')" />
              <AedDevicePreviewInfo
                :aedDevicePreviewInfo="aedDeviceSelected"
                :selectDevice="assignDeviceToEvent"
                :deviceIsSelected="true"
                :verifiedRescuerPos="rescuerPosition != null"
                :setShowPreviewAedDevice="setShowPreviewAedDevice"
                :setMapDialog="setMapDialog"
              />
            </div>
            <span v-else v-text="$t('events.yetSelDevice')" />
          </v-container>
          <v-divider />
          <v-container>
            <div v-if="selectedRescuer !== null">
              <span class="subtitle-2" v-text="$t('events.selRescuer')" />
            </div>
            <span v-else v-text="$t('events.yetSelRescuer')" />
          </v-container>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <AedEventButtons :aedEvent="aedEventDto" />
          </v-card-actions>
        </v-card>
      </v-container>
    </v-skeleton-loader>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import aedEventChannelSubMod from "@/store/modules/dynamic/aed/events/sub/aed-event-channels-sub";
import { namespace } from "vuex-class";
import {
  AedEventInfoDto,
  AedEventRescuerInfo,
  EventDto
} from "@/types/aed-event";
import { LatLng } from "leaflet";
import { IAedDevPreview } from "@/types/aed-device";
import { RouteInfo } from "@/types/osm";
import { getLocation } from "@/plugins/geolocation";
import { PreviewUser } from "@/types";

const user = namespace("user");
const environment = namespace("environment");
const aedEventChannelSub = namespace("aedEventChannelSub");

@Component({
  components: {
    DialogMapRoutingInfo: () =>
      import(
        /* webpackChunkName: "DialogMapRoutingInfo" */ "@/components/event/channel/DialogMapRoutingInfo.vue"
      ),
    AedEventMainInfo: () =>
      import(
        /* webpackChunkName: "AedEventMainInfo" */ "@/components/event/info/AedEventMainInfo.vue"
      ),
    AedEventButtons: () =>
      import(
        /* webpackChunkName: "AedEventButtons" */ "@/components/event/info/AedEventButtons.vue"
      ),
    AedEventOccurrenceType: () =>
      import(
        /* webpackChunkName: "AedEventOccurrenceType" */ "@/components/event/info/AedEventOccurrenceType.vue"
      ),
    AedDevicePreviewInfo: () =>
      import(
        /* webpackChunkName: "AedDevicePreviewInfo" */ "@/components/device/aed/info/AedDevicePreviewInfo.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const channelCard = vm as AedEventChannelCard;
      channelCard.aedEventId = to.params.eventID;
      const store = channelCard.$store;
      if (!(store && store.state && store.state["aedEventChannelSub"])) {
        store.registerModule("aedEventChannelSub", aedEventChannelSubMod);
      }
      const eventIdDto: EventDto = { id: channelCard.aedEventId };
      channelCard.findEventId(eventIdDto).then(() => {
        channelCard.loading = false;
        if (channelCard.username == channelCard.aedEventDto.username) {
          getLocation(channelCard.setRescuerPos2).then(() => {
            channelCard.listenEvent(eventIdDto);
          });

          channelCard.initChannelData(channelCard.aedEventId);
          if (
            channelCard.aedEventDto.aedDeviceId != undefined &&
            channelCard.aedDeviceSelected == null
          ) {
            channelCard.findAedDeviceById(channelCard.aedEventDto.aedDeviceId);
          }
        }
      });
    });
  },
  beforeDestroy() {
    //if (!this.hasAedEvChannel(this.aedEventId)) {
    //  this.deleteEvOnMap(this.aedEventId);
    //}
  }
})
export default class AedEventChannelCard extends Vue {
  @user.State username!: string;
  @environment.State locale!: string;
  @aedEventChannelSub.State rescuerPosition!: LatLng | null;
  @aedEventChannelSub.Getter potentialAedDevices!: (
    aedDeviceId: string
  ) => IAedDevPreview[];
  @aedEventChannelSub.State previewAedDevices!: IAedDevPreview[];
  @aedEventChannelSub.State showPreviewAedDevices!: IAedDevPreview[];
  @aedEventChannelSub.State verifiedPosition!: boolean;
  @aedEventChannelSub.State aedDeviceSelected!: IAedDevPreview;
  @aedEventChannelSub.State selectedRescuer!: PreviewUser;
  @aedEventChannelSub.State selectedRouteInfo!: RouteInfo;
  @aedEventChannelSub.Mutation initChannelData!: (aedEventId: string) => void;
  @aedEventChannelSub.Mutation deleteEvOnMap!: (aedEventId: string) => void;
  @aedEventChannelSub.Mutation setRescuerPos2!: (data: Position) => void;
  @aedEventChannelSub.Mutation setMapDialog!: (bool: boolean) => void;
  @aedEventChannelSub.Mutation setAedDeviceSelected!: (
    aedDevice: IAedDevPreview
  ) => void;
  @aedEventChannelSub.Mutation setShowPreviewAedDevice!: (
    previewAedDevices: IAedDevPreview[]
  ) => void;
  @aedEventChannelSub.Getter aedEventMarker!: (aedEventId: string) => LatLng;
  @aedEventChannelSub.Getter aedEvent!: (aedEventId: string) => AedEventInfoDto;
  @aedEventChannelSub.Getter hasAedEvChannel!: (aedEventId: string) => boolean;
  @aedEventChannelSub.Action listenEvent!: (data: EventDto) => void;
  @aedEventChannelSub.Action findAedDeviceById!: (
    aedDeviceId: string
  ) => Promise<IAedDevPreview>;
  @aedEventChannelSub.Action findEventId!: (
    data: EventDto
  ) => Promise<AedEventInfoDto>;
  @aedEventChannelSub.Action subRescuer!: (
    data: AedEventRescuerInfo
  ) => Promise<AedEventInfoDto>;
  //@aedEventChannelSub.Action findWaypointInRescuerToDeviceToEvent!: (
  //  data: OsrmWaypointsExtra
  //) => void;
  //@aedEventChannelSub.Action fetchAedDeviceInAreaPreview!: (
  //  aedEventId: string
  //) => Promise<IAedDevPreview[]>;
  loading = true;
  transition = "scale-transition";
  aedEventId = "";

  highlightDevice(aedDevice: IAedDevPreview) {
    this.setShowPreviewAedDevice([aedDevice]);
  }

  showAllDevices() {
    this.setShowPreviewAedDevice(this.previewAedDevices);
  }

  assignDeviceToEvent(data: IAedDevPreview) {
    this.subRescuer({
      id: this.aedEventId,
      rescuer: this.username,
      aedDeviceId: data.id,
      aedDevicePreview: data
    });
  }

  get aedEventDto() {
    return this.aedEvent(this.aedEventId);
  }

  get aedEventMarkerCenter() {
    return this.aedEventMarker(this.aedEventId);
  }
}
</script>
