<template>
  <span>{{ eventString(occurrenceType) }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedEventInfo = namespace("aedEventInfo");

@Component
export default class AedEventOccurrenceType extends Vue {
  @aedEventInfo.State occurrenceType!: number;
  eventString(occ: number) {
    if (occ == 1) {
      return this.$t("events.eventS1");
    }
    if (occ == 2) {
      return this.$t("events.eventS2");
    }
    if (occ == 3) {
      return this.$t("events.eventS3");
    }
  }
}
</script>
