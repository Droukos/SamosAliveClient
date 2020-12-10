<template>
  <span>{{ conclusion }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventConclusion extends Vue {
  @Prop() conclusion!: string;
}
</script>
