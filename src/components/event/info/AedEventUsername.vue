<template>
  <span>{{ username }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventOccurrenceType extends Vue {
  @Prop() username!: string;
}
</script>
