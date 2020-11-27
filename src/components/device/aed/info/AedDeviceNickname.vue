<template>
  <span>{{ $t("device.nickname") + ": " + uniqueNickname }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedDeviceInfo = namespace("aedDeviceInfo");

@Component
export default class AedDeviceNickname extends Vue {
  @aedDeviceInfo.State uniqueNickname!: string;
}
</script>
