<template>
  <v-main>
    <h3 v-text="$t('events.eventListInfo')" />
    <v-card class="mx-auto">
      <v-select
        v-model="selectedType"
        :items="types"
        item-text="msg"
        item-value="code"
      ></v-select>
      <v-select
        v-model="selectedStatus"
        :items="status"
        item-text="msg"
        item-value="code"
      ></v-select>
      <br />
      <v-btn v-text="$t('history.searchEvent')" @click="searchEvent()" />
      <EventListPanel />
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedSearchInfo } from "@/types";
import eventListMod from "@/store/modules/dynamic/eventList.ts";

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
  types = [
    { msg: this.$t("events.eventS1"), code: 1 },
    { msg: this.$t("events.eventS2"), code: 2 },
    { msg: this.$t("events.eventS3"), code: 3 }
  ];
  selectedType = this.types[0].code;
  status = [
    { msg: this.$t("events.statusS1"), code: 1 },
    { msg: this.$t("events.statusS2"), code: 2 },
    { msg: this.$t("events.statusS3"), code: 3 }
  ];
  selectedStatus = this.status[0].code;
  isLoading = false;
  label = "";

  @eventList.Action fetchEventsPreview!: (data: AedSearchInfo) => Promise<any>;

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
