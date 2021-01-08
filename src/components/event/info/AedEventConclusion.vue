<template>
  <v-textarea outlined readonly height="95" :value="conclusion" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventConclusion extends Vue {
  @Prop() conclusion!: string;
}
</script>
