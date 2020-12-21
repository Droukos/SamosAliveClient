<template>
  <div v-if="aedEvent.status === allStatus.ONPROGRESS">
    <v-btn
      color="primary"
      @click="openDialog()"
      v-text="$t('history.complete')"
    />
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title class="headline" v-text="$t('history.conclusion')" />
          <v-textarea v-model="message" maxlength="200" solo />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
              v-text="$t('general.cancel')"
            />
            <v-btn
              color="green darken-1"
              text
              @click="closeEvent()"
              v-text="$t('history.complete')"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
  <div v-else-if="aedEvent.status === allStatus.PENDING">
    <v-btn
      v-if="aedEvent.rescuer == null || aedEvent.rescuer === ''"
      v-text="$t('events.deviceSel')"
      @click="fetchAedDevices"
    />
    <v-btn
      v-if="aedDeviceIdSel !== ''"
      color="primary"
      @click="subResc()"
      v-text="$t('history.assign')"
    />

    <!--<v-dialog v-model="deviceChooseDialog" persistent>
      <v-card>
        <v-card-title
          class="headline"
          v-text="$t('events.deviceDialogTitle')"
        />
        <div
          :style="'height:' + ($vuetify.breakpoint.mdAndUp ? '500px' : '300px')"
        >
          <l-map
            :zoom="zoom"
            :center="aedEventMarkerCenter"
            style="z-index: 0;"
          >
            <LTileLayerBase />
            <LMarkerWithIcon
              :marker="aedEventMarkerCenter"
              :icon-url="emergencyCallUrl"
            />
            <l-circle
              :lat-lng="aedEventMarkerCenter"
              :radius="4"
              color="blue"
            />
          </l-map>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="deviceChooseDialog = false"
            v-text="$t('general.cancel')"
          >
          </v-btn>
          <v-btn color="green darken-1" text v-text="$t('history.complete')" />
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { statusOptions } from "@/plugins/enums/event-options";
import {
  AedEventCloseInfo,
  AedEventInfoDto,
  AedEventRescuerInfo,
  EventDto
} from "@/types/aed-event";
import { LatLng } from "leaflet";
import { markerIconEmergencyCall } from "@/plugins/api/cloudinary";
import { LCircle, LMap } from "vue2-leaflet";
import { IAedDevicePreview } from "@/types/aed-device";

const aedEventChannelSub = namespace("aedEventChannelSub");
const user = namespace("user");

@Component({
  components: {
    LMap,
    LCircle,
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LMarkerWithIcon: () =>
      import(
        /* webpackChunkName: "LMarkerWithIcon" */ "@/components/map/markers/LMarkerWithIcon.vue"
      )
  }
})
export default class AedEventButtons extends Vue {
  message = "";
  zoom = 15.5;
  dialog = false;
  deviceChooseDialog = false;
  allStatus = statusOptions;
  emergencyCallUrl = markerIconEmergencyCall;

  @Prop() aedEvent!: AedEventInfoDto;
  @Prop() aedDeviceIdSel!: string;
  @user.State username!: string;
  @aedEventChannelSub.Action subRescuer!: (
    data: AedEventRescuerInfo
  ) => Promise<AedEventInfoDto>;
  @aedEventChannelSub.Action closeAedEvent!: (
    data: AedEventCloseInfo
  ) => Promise<any>;
  @aedEventChannelSub.Action listenEvent!: (data: EventDto) => void;
  @aedEventChannelSub.Action fetchAedDeviceInAreaPreview!: (
    aedEventId: string
  ) => Promise<IAedDevicePreview[]>;
  @aedEventChannelSub.Getter aedEventMarker!: (aedEventId: string) => LatLng;

  get aedEventMarkerCenter() {
    return this.aedEventMarker(this.aedEvent.id);
  }

  fetchAedDevices() {
    this.fetchAedDeviceInAreaPreview(this.aedEvent.id);
  }

  subResc() {
    this.deviceChooseDialog = !this.deviceChooseDialog;
    //this.subRescuer({
    //  id: this.aedEvent.id,
    //  rescuer: this.username
    //}).then(() => {
    //  this.listenEvent({ id: this.aedEvent.id });
    //});
  }

  openDialog() {
    this.dialog = true;
  }

  closeEvent() {
    this.closeAedEvent({ id: this.aedEvent.id, conclusion: this.message });
  }
}
</script>
