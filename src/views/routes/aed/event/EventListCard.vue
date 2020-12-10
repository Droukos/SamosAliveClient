<template>
  <v-main>
    <h3 v-text="$t('events.eventListInfo')" />
    <v-card class="mx-auto">
      <AedEventSelectedType />
      <AedEventSelectedStatus />
      <br />
      <v-btn v-text="$t('history.searchEvent')" @click="searchEvent()" />
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
      ),
    AedEventSelectedType: () =>
      import(
        /* webpackChunkName: "EventListPanel" */ "@/components/event/search/AedEventSelectedType.vue"
      ),
    AedEventSelectedStatus: () =>
      import(
        /* webpackChunkName: "EventListPanel" */ "@/components/event/search/AedEventSelectedStatus.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const eventListCard = vm as EventListCard;
      const store = eventListCard.$store;
      if (!(store && store.state && store.state["eventList"])) {
        store.registerModule("eventList", eventListMod);
      }
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("eventList");
  }
})
export default class EventListCard extends Vue {
  isLoading = false;
  label = "";

  @eventList.Action fetchEventsPreview!: (data: AedSearchInfo) => Promise<any>;
  @eventList.State selectedType!: number;
  @eventList.State selectedStatus!: number;

  fetchEventsPreviewList() {
    setTimeout(() => {
      this.fetchEventsPreview({
        occurrenceType: this.selectedType,
        status: this.selectedStatus
      });
    }, 700);
  }
  searchEvent() {
    this.fetchEventsPreviewList();
  }
}
</script>
