<template>
  <v-content>
    <v-sheet>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        :loading="loading"
        :transition="transition"
        type="card"
      >
      </v-skeleton-loader>
    </v-sheet>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AedEventUserSubCard extends Vue {
  loading = true;
  transition = "scale-transition";
}
</script>
