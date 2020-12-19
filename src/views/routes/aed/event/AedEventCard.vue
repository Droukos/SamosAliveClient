<template>
  <v-main>
    <p v-text="$t('main')" />
    <AedEventOpen />
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    AedEventOpen: () =>
      import(
        /* webpackChunkName: "AedEventOpen" */ "@/components/event/create/AedEventOpen.vue"
      )
  }
})
export default class AedEventCard extends Vue {}
</script>
