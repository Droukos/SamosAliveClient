<template>
  <v-main>
    <v-skeleton-loader
      class="mx-auto"
      max-width="400"
      :loading="loadingSkeleton"
      transition="scale-transition"
      type="card"
    >
      <v-card>
        <v-card-title class="primary">
          <AedEventOccurrenceType :occurrenceType="aedEvent.occurrenceType" />
        </v-card-title>
        <AedEventMainInfo
          :aedEvent="aedEvent"
          :center="center"
          :marker="marker"
        />
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEventInfoDto, EventDto } from "@/types/aed-event";
import aedEventInfoMod from "@/store/modules/dynamic/aed/events/aed-event-info";
import { LatLng } from "leaflet";
import { statusOptions } from "@/plugins/enums/event-options";

const aedEventInfo = namespace("aedEventInfo");
//TODO components sto card ton event kai antistoixa component gia news-problems
@Component({
  components: {
    AedEventMainInfo: () =>
      import(
        /* webpackChunkName: "AedEventMainInfo" */ "@/components/event/info/AedEventMainInfo.vue"
      ),
    AedEventOccurrenceType: () =>
      import(
        /* webpackChunkName: "AedEventOccurrenceType" */ "@/components/event/info/AedEventOccurrenceType.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const eventMoreCard = vm as EventMoreCard;
      const store = eventMoreCard.$store;
      if (!(store && store.state && store.state["aedEventInfo"])) {
        store.registerModule("aedEventInfo", aedEventInfoMod);
      }
      eventMoreCard.findEventId({ id: to.params.eventID }).then(() => {
        eventMoreCard.loadingSkeleton = false;
      });
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("aedEventInfo");
  }
})
export default class EventMoreCard extends Vue {
  loadingSkeleton = true;
  @aedEventInfo.Action findEventId!: (data: EventDto) => Promise<any>;
  @aedEventInfo.Getter aedEvent!: AedEventInfoDto;
  allStatus = statusOptions;

  @aedEventInfo.State center!: LatLng;
  @aedEventInfo.State marker!: LatLng;
}
</script>
