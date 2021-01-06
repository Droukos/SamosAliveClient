<template>
  <div class="d-flex flex-row">
    <span v-text="$t('device.modelDesc') + ': ' + description" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedDeviceInfo = namespace("aedDeviceInfo");

@Component
export default class AedDeviceModelDescription extends Vue {
  @aedDeviceInfo.State description!: string;
}
</script>
