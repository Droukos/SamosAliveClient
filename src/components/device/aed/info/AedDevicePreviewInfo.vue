<template>
  <div class="mx-auto">
    <div class="d-flex flex-row">
      <v-avatar size="70">
        <AedDevicePic :size="70" :url="aedDevicePreviewInfo.picUrl" />
      </v-avatar>
      <v-spacer />
      <div
        v-if="aedDevicePreviewInfo.responseRouteInfo !== undefined"
        class="d-flex flex-column"
      >
        <span
          class="subtitle-2"
          v-text="
            $t('routing.tDistance') +
              getFormattedDistance(
                aedDevicePreviewInfo.responseRouteInfo.summary.totalDistance
              )
          "
        />
        <span
          class="subtitle-2"
          v-text="
            $t('routing.tDuration') +
              getFormattedTime(
                aedDevicePreviewInfo.responseRouteInfo.summary.totalTime
              )
          "
        />
        <div class="d-flex flex-row">
          <v-spacer />
          <MenuRouteInfo :routeInfo="aedDevicePreviewInfo.responseRouteInfo" />
          <v-btn @click="setPreviewDevice">
            <v-icon v-text="'$map'" />
          </v-btn>
        </div>
      </div>
    </div>

    <v-list-item-content>
      <v-list-item-title>
        <div class="d-flex flex-row">
          <p
            class="pr-2"
            style="font-weight: bold;"
            v-text="
              $t('device.nickname') + ': ' + aedDevicePreviewInfo.uniqueNickname
            "
          />
        </div>
      </v-list-item-title>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <p
            class="grey--text text--darken-1"
            v-bind="attrs"
            v-on="on"
            style="font-size:16px;"
            v-text="
              $t('device.modelName') + ': ' + aedDevicePreviewInfo.modelName
            "
          />
        </template>
        <div class="d-flex flex-column">
          <span v-text="$t('device.modelDesc') + ':'" />
          <span v-text="aedDevicePreviewInfo.description" />
        </div>
      </v-tooltip>
      <p
        class="grey--text text--darken-1"
        style="font-size:16px;"
        v-text="
          $t('device-register.addr') + ': ' + aedDevicePreviewInfo.address
        "
      />

      <p
        :class="getStatusColor(aedDevicePreviewInfo.status)"
        style="font-size:16px;"
        v-text="$t('aed-device-status.' + aedDevicePreviewInfo.status)"
      />
      <v-btn
        v-if="verifiedRescuerPos && !deviceIsSelected"
        class="deep-purple darken-2"
        style="color:white;"
        v-text="$t('history.assign')"
        @click="selectDevice(aedDevicePreviewInfo)"
      />
    </v-list-item-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IAedDevPreview } from "@/types/aed-device";
import { getAedDeviceStatusColor } from "@/plugins/enums/device/aed/aed-device-status";
import { formatDistance } from "@/plugins/geolocation/osrm";
import humanizeDuration from "humanize-duration";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component({
  components: {
    MapRoutingEventInfo: () =>
      import(
        /* webpackChunkName: "MapRoutingEventInfo" */ "@/components/event/map/routing/MapRoutingEventInfo.vue"
      ),
    AedDevicePic: () =>
      import(
        /* webpackChunkName: "AedDevicePic" */ "@/components/device/aed/info/AedDevicePic.vue"
      ),
    MenuRouteInfo: () =>
      import(
        /* webpackChunkName: "MenuRouteInfo" */ "@/components/event/map/routing/MenuRouteInfo.vue"
      )
  }
})
export default class AedDevicePreviewInfo extends Vue {
  @Prop() aedDevicePreviewInfo!: IAedDevPreview;
  @Prop() verifiedRescuerPos!: boolean;
  @Prop() deviceIsSelected!: boolean;
  @Prop() selectDevice!: (aedDevice: IAedDevPreview) => void;
  @Prop() setMapDialog!: (bool: boolean) => void;
  @Prop() setShowPreviewAedDevice!: (
    previewAedDevices: IAedDevPreview[]
  ) => void;
  @environment.State locale!: string;

  setPreviewDevice() {
    this.setShowPreviewAedDevice([this.aedDevicePreviewInfo]);
    this.setMapDialog(true);
  }

  getStatusColor(statusCode: number) {
    return getAedDeviceStatusColor(statusCode);
  }

  getFormattedTime(duration: number) {
    return humanizeDuration(duration * 1000, { language: this.locale });
  }

  getFormattedDistance(distance: number) {
    return formatDistance(distance, this.locale);
  }
}
</script>
