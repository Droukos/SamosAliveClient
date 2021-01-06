<template>
  <span v-text="$t('device.nickname') + ': ' + uniqueNickname" />
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
