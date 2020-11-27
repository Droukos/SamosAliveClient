<template>
  <span>{{ $t("device.modelName") + ": " + modelName }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedDeviceInfo = namespace("aedDeviceInfo");

@Component
export default class AedDeviceModelName extends Vue {
  @aedDeviceInfo.State modelName!: string;
}
</script>
