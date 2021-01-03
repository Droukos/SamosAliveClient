<template>
  <span class="text-subtitle-2 grey--text" v-text="timestamp" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CommentTimestamp extends Vue {
  @Prop() timestamp!: string;
}
</script>
