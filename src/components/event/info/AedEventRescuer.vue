<template>
  <span v-text="rescuer" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventRescuer extends Vue {
  @Prop() rescuer!: string;
}
</script>
