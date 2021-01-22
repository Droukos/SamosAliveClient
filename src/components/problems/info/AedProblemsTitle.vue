<template>
  <span v-text="titleString(title)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedProblemsTitle extends Vue {
  @Prop() title!: number;
  titleString(title: number) {
    if (title == 0) {
      return this.$t("problems.problemS0");
    }
    if (title == 1) {
      return this.$t("problems.problemS1");
    }
    if (title == 2) {
      return this.$t("problems.problemS2");
    }
    if (title == 3) {
      return this.$t("problems.problemS3");
    }
  }
}
</script>
