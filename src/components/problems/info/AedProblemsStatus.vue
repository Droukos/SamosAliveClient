<template>
  <span v-text="statusString(status)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedProblemsStatus extends Vue {
  @Prop() status!: number;
  statusString(status: number) {
    if (status == 1) {
      return this.$t("events.statusS1");
    }
    if (status == 2) {
      return this.$t("events.statusS2");
    }
    if (status == 3) {
      return this.$t("events.statusS3");
    }
  }
}
</script>
