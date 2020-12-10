<template>
  <v-main onload="searchEvent();">
    <h3 v-text="$t('events.eventListInfo')" />
    <v-card class="mx-auto">
      <EventListPanel
        nextRoute="aedEventChannel"
        :allAedEvents="allAedEvents"
      />
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEventCardDto } from "@/types/aed-event";
import eventLiveListMod from "@/store/modules/dynamic/aed/events/event-live-list.ts";

const eventLiveList = namespace("eventLiveList");

@Component({
  components: {
    EventListPanel: () =>
      import(
        /* webpackChunkName: "EventListPanel" */ "@/components/event/EventListPanel.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const eventLiveCard = vm as EventLiveCard;
      const store = eventLiveCard.$store;
      if (!(store && store.state && store.state["eventLiveList"])) {
        store.registerModule("eventLiveList", eventLiveListMod);
      }
      eventLiveCard
        .fetchUnassignedEventsPreview()
        .then(() => eventLiveCard.listenEvents());
    });
  },
  beforeDestroy() {
    //this.$store.unregisterModule("eventList");
  }
})
export default class EventLiveCard extends Vue {
  @eventLiveList.Action fetchUnassignedEventsPreview!: () => Promise<void>;
  @eventLiveList.Action listenEvents!: () => void;
  @eventLiveList.State selectedType!: number;
  @eventLiveList.State selectedStatus!: number;
  @eventLiveList.Getter allAedEvents!: AedEventCardDto[];
}
</script>
