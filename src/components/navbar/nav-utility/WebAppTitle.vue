<template>
  <v-btn class="text-none" text>
    <span class="text-h6 teal--text text--darken-1" v-text="$t('webapp')" />
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class WebAppTitle extends Vue {}
</script>
