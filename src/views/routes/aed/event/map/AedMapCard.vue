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
import searchMod from "@/store/modules/dynamic/search/search";

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
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const aedMapCard = vm as AedMapCard;
      const store = aedMapCard.$store;
      if (!(store && store.state && store.state["search"])) {
        store.registerModule("search", searchMod);
      }
    });
  }
})
export default class AedMapCard extends Vue {}
</script>
