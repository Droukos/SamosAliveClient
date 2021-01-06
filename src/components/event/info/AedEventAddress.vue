<template>
  <span v-text="address" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventAddress extends Vue {
  @Prop() address!: string;
}
</script>
