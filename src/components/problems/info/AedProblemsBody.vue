<template>
  <span v-text="body" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedProblemsBody extends Vue {
  @Prop() body!: string;
}
</script>
