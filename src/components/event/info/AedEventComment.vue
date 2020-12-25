<template>
  <v-textarea outlined readonly height="95" :value="comment" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventComment extends Vue {
  @Prop() comment!: string;
}
</script>
