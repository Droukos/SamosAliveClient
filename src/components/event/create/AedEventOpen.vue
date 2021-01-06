<template>
  <v-btn color="primary" v-text="$t('events.event')" @click="changePage()" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AedEventOpen extends Vue {
  changePage() {
    this.$router.push({
      name: "createAedEvent"
    });
  }
}
</script>
