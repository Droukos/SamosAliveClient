<template>
  <v-chip :class="aedDeviceStatusBackground(status)">{{
    $t("aed-device-status." + status)
  }}</v-chip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAedDeviceStatusBackgroundColor } from "@/plugins/enums/device/aed/aed-device-status";
import { namespace } from "vuex-class";

const aedDeviceInfo = namespace("aedDeviceInfo");

@Component
export default class AedDeviceStatusChip extends Vue {
  @aedDeviceInfo.State status!: number;

  aedDeviceStatusBackground(statusOption: number): string {
    return getAedDeviceStatusBackgroundColor(statusOption);
  }
}
</script>
