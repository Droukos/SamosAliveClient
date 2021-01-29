<template>
  <span v-text="technical" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedProblemsTechnical extends Vue {
  @Prop() technical!: string;
}
</script>
