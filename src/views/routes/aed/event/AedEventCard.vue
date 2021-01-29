<template>
  <v-main>
    <p v-text="$t('main')" />
    <br />
    <p v-text="$t('events.createEvent')" />
    <AedEventOpen />
    <br />
    <br />
    <p v-text="$t('events.localMap')" />
    <AedMapOpen />
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    AedEventOpen: () =>
      import(
        /* webpackChunkName: "AedEventOpen" */ "@/components/event/create/AedEventOpen.vue"
      ),
    AedMapOpen: () =>
      import(
        /* webpackChunkName: "AedEventOpen" */ "@/components/event/map/AedMapOpen.vue"
      )
  }
})
export default class AedEventCard extends Vue {}
</script>
