<template>
  <v-content>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      :loading="loading"
      :transition="transition"
      type="card"
    >
      <div>
        <v-container>
          <v-tabs v-model="tab">
            <v-tabs-slider color="deep-purple accent-3" />
            <v-tab v-for="tab in eTabs" :key="tab.index" v-text="tab.label" />
          </v-tabs>
          <v-divider />

          <v-tabs-items class="transparent" v-model="tab">
            <v-tab-item v-for="tab in eTabs" :key="tab.index">
              <v-card v-if="tab.index === 0">
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
                <EChannelPreviewAvailableDevices :aedEventId="aedEventId" />

                <DialogMapRoutingInfo
                  :aedEventId="aedEventId"
                  :center="aedEventMarkerCenter"
                />
                <v-container>
                  <div v-if="notPending">
                    <span class="subtitle-2" v-text="$t('events.selDevice')" />
                    <AedDevicePreviewInfo
                      :aedDevicePreviewInfo="aedDeviceSelected"
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
                    <ChannelUserPreviewInfo />
                  </div>
                  <span v-else v-text="$t('events.yetSelRescuer')" />
                </v-container>
                <v-divider />
                <v-card-actions>
                  <v-spacer />
                  <AedEventButtons :aedEvent="aedEventDto" />
                </v-card-actions>
              </v-card>
              <div v-if="tab.index === 1">
                <ChannelDiscussion />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </div>
    </v-skeleton-loader>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import aedEventChannelSubMod from "@/store/modules/dynamic/aed/events/sub/aed-event-channels-sub";
import { namespace } from "vuex-class";
import { AedEvent, AedEventInfoDto, EventDto } from "@/types/aed-event";
import { LatLng } from "leaflet";
import { IAedDevPreview } from "@/types/aed-device";
import { RouteInfo } from "@/types/osm";
import { getLocation } from "@/plugins/geolocation";
import { PreviewUser, PreviewUserCh } from "@/types";
import AedDeviceRescuer = AedEvent.AedDeviceRescuer;
import AedCommentReqDto = AedEvent.AedCommentReqDto;
import {
  fetchRescuerAndDevice,
  setEventListeners
} from "@/plugins/event-channel-util";

const user = namespace("user");
const environment = namespace("environment");
const eChannel = namespace("aedEventChannelSub");

@Component({
  components: {
    DialogMapRoutingInfo: () =>
      import(
        /* webpackChunkName: "DialogMapRoutingInfo" */ "@/components/event/channel/DialogMapRoutingInfo.vue"
      ),
    EChannelPreviewAvailableDevices: () =>
      import(
        /* webpackChunkName: "EChannelPreviewAvailableDevices" */ "@/components/event/channel/preview/EChannelPreviewAvailableDevices.vue"
      ),
    ChannelUserPreviewInfo: () =>
      import(
        /* webpackChunkName: "ChannelUserPreviewInfo" */ "@/components/event/channel/preview/ChannelUserPreviewInfo.vue"
      ),
    ChannelDiscussion: () =>
      import(
        /* webpackChunkName: "ChannelDiscussion" */ "@/components/event/channel/ChannelDiscussion.vue"
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
      const chCard = vm as AedEventChannelCard;
      const evId = to.params.eventID;
      const eventIdDto: EventDto = { id: evId };
      const store = chCard.$store;
      chCard.aedEventId = evId;
      if (!(store && store.state && store.state["aedEventChannelSub"])) {
        store.registerModule("aedEventChannelSub", aedEventChannelSubMod);
      }
      chCard.initChannelData(evId, chCard.username);
      chCard.findEventId(eventIdDto).then(() => {
        chCard.loading = false;
        if (chCard.username != chCard.aedEventDto.username) {
          getLocation(chCard.setRescuerPos2);
        }
        setEventListeners(chCard, eventIdDto);
        fetchRescuerAndDevice(chCard);
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.params.eventID);
    const evId = to.params.eventID;
    const eventIdDto: EventDto = { id: evId };
    const chCard = this as AedEventChannelCard;

    chCard.loading = true;
    chCard.aedEventId = evId;
    chCard.initChannelData(evId, chCard.username);
    chCard.findEventId(eventIdDto).then(() => {
      chCard.loading = false;
      setEventListeners(chCard, eventIdDto);
      fetchRescuerAndDevice(chCard);
    });
    next();
  },
  beforeDestroy() {
    const chCard = this as AedEventChannelCard;
    //if (!this.hasAedEvChannel(this.aedEventId)) {
    //  this.deleteEvOnMap(this.aedEventId);
    //}
  }
})
export default class AedEventChannelCard extends Vue {
  tab = "event";
  @user.State username!: string;
  @environment.State locale!: string;
  @eChannel.State rescuerPosition!: LatLng | null;
  @eChannel.State showPreviewAedDevices!: IAedDevPreview[];
  @eChannel.State verifiedPosition!: boolean;
  @eChannel.State aedDeviceSelected!: IAedDevPreview | null;
  @eChannel.State selectedRescuer!: PreviewUser | null;
  @eChannel.State selectedRouteInfo!: RouteInfo;
  @eChannel.Mutation initChannelData!: (
    aedEventId: string,
    username: string
  ) => void;
  @eChannel.Mutation deleteEvOnMap!: (aedEventId: string) => void;
  @eChannel.Mutation setRescuerPos2!: (data: Position) => void;
  @eChannel.Mutation setMapDialog!: (bool: boolean) => void;
  @eChannel.Mutation setShowPreviewAedDevice!: (
    previewAedDevices: IAedDevPreview[]
  ) => void;
  @user.Getter userPreview!: () => PreviewUserCh;
  @eChannel.Getter aedEventMarker!: (aedEventId: string) => LatLng;
  @eChannel.Getter aedEvent!: (aedEventId: string) => AedEventInfoDto;
  @eChannel.Getter hasAedEvChannel!: (aedEventId: string) => boolean;
  @eChannel.Action listenEvent!: (data: EventDto) => void;
  @eChannel.Action listenDeviceSub!: (data: EventDto) => void;
  @eChannel.Action listenRescuerSub!: (data: EventDto) => void;
  @eChannel.Action listenUsersSub!: (data: EventDto) => void;
  @eChannel.Action listenDiscussionSub!: (data: EventDto) => void;
  @eChannel.Action fetchEventUsers!: (data: EventDto) => void;
  @eChannel.Action fetchEventComments!: (data: AedCommentReqDto) => void;
  @eChannel.Action findEventId!: (data: EventDto) => Promise<AedEventInfoDto>;
  @eChannel.Action fetchDeviceAndRescuer!: (data: {
    aedDeviceId: string;
  }) => Promise<AedDeviceRescuer>;

  loading = true;
  transition = "scale-transition";
  aedEventId = "";

  get aedEventDto() {
    return this.aedEvent(this.aedEventId);
  }

  get eTabs() {
    return [
      { index: 0, label: this.$t("events.event") },
      { index: 1, label: this.$t("events.discuss") }
    ];
  }

  get notPending() {
    return this.selectedRescuer !== null && this.aedDeviceSelected !== null;
  }

  get aedEventMarkerCenter() {
    return this.aedEventMarker(this.aedEventId);
  }

  @Watch("tab")
  tabWatch(index: number) {
    if (index == 1) {
      this.fetchEventComments({
        eventId: this.aedEventId,
        pageOffset: 0
      });
    }
  }
}
</script>
