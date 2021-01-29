<template>
  <v-btn
    color="primary"
    v-text="$t('events.localMapOpen')"
    @click="changePage()"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AedMapOpen extends Vue {
  changePage() {
    this.$router.push({
      name: "openAedMap"
    });
  }
}
</script>
