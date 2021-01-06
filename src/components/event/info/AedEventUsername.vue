<template>
  <span v-text="username" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventUsername extends Vue {
  @Prop() username!: string;
}
</script>
