<template>
  <span>{{ address }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventOccurrenceType extends Vue {
  @Prop() address!: string;
}
</script>
