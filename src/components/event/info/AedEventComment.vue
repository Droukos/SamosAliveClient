<template>
  <v-textarea
    v-if="comment != null && comment.length > 0"
    outlined
    filled
    readonly
    auto-grow
    :value="comment"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventComment extends Vue {
  @Prop() comment!: string;
}
</script>
