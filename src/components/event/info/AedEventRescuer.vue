<template>
  <span>{{ rescuer }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventOccurrenceType extends Vue {
  @Prop() rescuer!: string;
}
</script>
