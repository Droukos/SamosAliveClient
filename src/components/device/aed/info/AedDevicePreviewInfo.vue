<template>
  <div>
    <v-list-item-avatar :size="70">
      <AedDevicePic :size="70" :url="aedDevicePreviewInfo.picUrl" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        <div class="d-flex flex-row">
          <p class="pr-2" style="font-weight: bold;">
            {{
              $t("device.nickname") + ": " + aedDevicePreviewInfo.uniqueNickname
            }}
          </p>
        </div>
      </v-list-item-title>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <p
            class="grey--text text--darken-1"
            v-bind="attrs"
            v-on="on"
            style="font-size:16px;"
          >
            {{ $t("device.modelName") + ": " + aedDevicePreviewInfo.modelName }}
          </p>
        </template>
        <div class="d-flex flex-column">
          <span>{{ $t("device.modelDesc") + ":" }}</span>
          <span>{{ aedDevicePreviewInfo.description }}</span>
        </div>
      </v-tooltip>
      <p class="grey--text text--darken-1" style="font-size:16px;">
        {{ $t("device-register.addr") + ": " + aedDevicePreviewInfo.address }}
      </p>
      <p
        :class="getStatusColor(aedDevicePreviewInfo.status)"
        style="font-size:16px;"
      >
        {{ $t("aed-device-status." + aedDevicePreviewInfo.status) }}
      </p>
    </v-list-item-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IAedDevicePreview } from "@/types/aed-device";
import { getAedDeviceStatusColor } from "@/plugins/enums/device/aed/aed-device-status";

@Component({
  components: {
    AedDevicePic: () =>
      import(
        /* webpackChunkName: "AedDevicePic" */ "@/components/device/aed/info/AedDevicePic.vue"
      )
  }
})
export default class AedDevicePreviewInfo extends Vue {
  @Prop() aedDevicePreviewInfo!: IAedDevicePreview;

  getStatusColor(statusCode: number) {
    return getAedDeviceStatusColor(statusCode);
  }
}
</script>
