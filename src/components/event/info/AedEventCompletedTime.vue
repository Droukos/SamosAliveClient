<template>
  <span>{{ $helper.convDate2(completedTime, "long", locale) }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedEventInfo = namespace("aedEventInfo");
const environment = namespace("environment");

@Component
export default class AedEventRequestedTim extends Vue {
  @aedEventInfo.State completedTime!: string;
  @environment.State locale!: string;
}
</script>
