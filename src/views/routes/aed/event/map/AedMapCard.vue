<template>
  <v-main>
    <v-container>
      <div class="d-flex flex-column">
        <p v-text="$t('events.localMap')" />
        <AedMap />
        <br />
        <SearchAedDevicePreviewList />
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    AedMap: () =>
      import(
        /* webpackChunkName: "AedEventOpen" */ "@/components/event/map/AedMap.vue"
      ),
    SearchAedDevicePreviewList: () =>
      import(
        /* webpackChunkName: "SearchAedDevicePreviewList" */ "@/components/search/SearchAedDevicePreviewList.vue"
      )
  }
})
export default class AedMapCard extends Vue {}
</script>
