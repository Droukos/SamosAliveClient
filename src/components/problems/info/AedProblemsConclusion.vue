<template>
  <span v-text="conclusion" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventUsername extends Vue {
  @Prop() conclusion!: string;
}
</script>
