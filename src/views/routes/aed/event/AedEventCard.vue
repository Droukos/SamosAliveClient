<template>
  <v-main>
    <p v-text="$t('main')" />
    <AedEventOpenDialog />
    <div class="text-center">
      <AedEventCreateDialog />
    </div>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import aedEventCreateMod from "@/store/modules/dynamic/aed/events/aed-event-create";
import AedEventDialogOpen from "@/components/event/create/AedEventCreateDialog.vue";

@Component({
  components: {
    AedEventCreateDialog: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/create/AedEventCreateDialog.vue"
      ),
    AedEventOpenDialog: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/create/AedEventOpenDialog.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const aedEventDialogOpen = vm as AedEventDialogOpen;
      const store = aedEventDialogOpen.$store;
      if (!(store && store.state && store.state["aedEventCreate"])) {
        store.registerModule("aedEventCreate", aedEventCreateMod);
      }
    });
  },
  beforeDestroy() {
    //this.$store.unregisterModule("aedEventCreate");
  }
})
export default class EventCard extends Vue {}
</script>
