<template>
  <v-main onload="searchEvent();">
    <h3 v-text="$t('events.eventListInfo')" />
    <v-card class="mx-auto">
      <EventListPanel />
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedSearchInfo } from "@/types/aed-event";
import eventListMod from "@/store/modules/dynamic/aed/events/event-list.ts";

const eventList = namespace("eventList");

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
      if (!(store && store.state && store.state["eventList"])) {
        store.registerModule("eventList", eventListMod);
      }
      eventLiveCard.fetchEventsPreviewList();
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("eventList");
  }
})
export default class EventLiveCard extends Vue {
  @eventList.Action fetchEventsPreview!: (data: AedSearchInfo) => Promise<any>;

  fetchEventsPreviewList() {
    setTimeout(() => {
      this.fetchEventsPreview({
        occurrenceType: 0,
        status: 1
      });
    }, 700);
  }
}
</script>
