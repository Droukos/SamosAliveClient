<template>
  <span>{{ comment }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventOccurrenceType extends Vue {
  @Prop() comment!: string;
}
</script>
