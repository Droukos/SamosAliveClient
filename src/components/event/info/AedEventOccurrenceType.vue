<template>
  <span v-text="eventString(occurrenceType)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class AedEventOccurrenceType extends Vue {
  @Prop() occurrenceType!: number;
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
