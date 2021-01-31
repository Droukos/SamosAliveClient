<template>
  <div v-if="aedEvent.status === allStatus.ONPROGRESS && isValidUser">
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
  <div v-else-if="aedEvent.status === allStatus.PENDING && isValidUser">
    <v-tooltip v-if="rescuerPosition == null || !verifiedPosition" top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="verifyRescuerPosition"
          v-text="$t('routing.verifyPos')"
        />
      </template>
      <span v-text="$t('routing.verifyPosHint')" />
    </v-tooltip>
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
import { LCircle, LMap } from "vue2-leaflet";
import { AedDevPreview } from "@/types/aed-device";
import { AedDeviceAreaLookWithRoute } from "@/types/osm";
import { Role } from "@/types";
import { roles } from "@/plugins/enums/roles";

const aedEventChannelSub = namespace("aedEventChannelSub");
const environment = namespace("environment");
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

  @Prop() aedEvent!: AedEventInfoDto;
  @user.State username!: string;
  @user.Getter userRoles!: Role[];
  @environment.State locale!: string;
  @aedEventChannelSub.Action subRescuer!: (
    data: AedEventRescuerInfo
  ) => Promise<AedEventInfoDto>;
  @aedEventChannelSub.Action closeAedEvent!: (data: AedEventCloseInfo) => void;
  @aedEventChannelSub.Action listenEvent!: (data: EventDto) => void;
  @aedEventChannelSub.Action fetchAedDeviceInAreaPreview!: (data: {
    locale: string;
    dto: AedDeviceAreaLookWithRoute;
  }) => Promise<AedDevPreview[]>;
  @aedEventChannelSub.Getter aedEventMarker!: (aedEventId: string) => LatLng;
  @aedEventChannelSub.Mutation verifyRescuerPos!: (verify: boolean) => void;
  @aedEventChannelSub.State rescuerPosition!: LatLng;
  @aedEventChannelSub.State verifiedPosition!: boolean;

  get aedEventMarkerCenter() {
    return this.aedEventMarker(this.aedEvent.id);
  }

  verifyRescuerPosition() {
    this.fetchAedDeviceInAreaPreview({
      locale: this.locale,
      dto: {
        eventId: this.aedEvent.id,
        eventLat: this.aedEvent.occurrencePoint.y,
        eventLng: this.aedEvent.occurrencePoint.x,
        rescuerLat: this.rescuerPosition.lat,
        rescuerLng: this.rescuerPosition.lng,
        distance: 3
      }
    }).then(() => this.verifyRescuerPos(true));
  }

  openDialog() {
    this.dialog = true;
  }

  closeEvent() {
    this.closeAedEvent({ id: this.aedEvent.id, conclusion: this.message });
  }

  get isValidUser() {
    console.log(
      this.userRoles.find(
        roleModel =>
          roleModel.role === roles.RESCUER ||
          roleModel.role === roles.GENERAL_ADMIN
      ) !== undefined
    );
    return (
      this.userRoles.find(
        roleModel =>
          roleModel.role === roles.RESCUER ||
          roleModel.role === roles.GENERAL_ADMIN
      ) !== undefined
    );
  }
}
</script>
