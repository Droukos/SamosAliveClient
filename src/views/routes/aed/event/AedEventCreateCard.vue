<template>
  <v-main>
    <div class="text-center">
      <AedEventCreate />
    </div>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import aedEventCreateMod from "@/store/modules/dynamic/aed/events/aed-event-create";

@Component({
  components: {
    AedEventCreate: () =>
      import(
        /* webpackChunkName: "AedEventCreate" */ "@/components/event/create/AedEventCreate.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const aedEventCreateCard = vm as AedEventCreateCard;
      const store = aedEventCreateCard.$store;
      if (!(store && store.state && store.state["aedEventCreate"])) {
        store.registerModule("aedEventCreate", aedEventCreateMod);
      }
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("aedEventCreate");
  }
})
export default class AedEventCreateCard extends Vue {}
</script>
