<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in allAedEvents" :key="item.id" :cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"
                >{{
                <AedEventOccurrenceType />
                }}</v-list-item-title
              >
              <br />
              <v-list-item-title><AedEventAddress /> </v-list-item-title>
              <br />
              <v-list-item-subtitle bottom
                >{{
                <AedEventComment />
                }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                ><AedEventStatus />
                <br />
                <AedEventUsername />
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-card-actions>
            <h6>
              <AedEventRequestedTime />
            </h6>
            <v-spacer />
            <AedEventInfoButton />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEventCardDto } from "@/types/aed-event";
import AedEventComment from "@/components/event/info/AedEventComment.vue";

const eventList = namespace("eventList");
const environment = namespace("environment");

@Component({
  components: {
    AedEventComment,
    AedEventAddress: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventAddress.vue"
      ),
    AedEventCompletedTime: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventCompletedTime.vue"
      ),
    AedEventConclusion: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventConclusion.vue"
      ),
    AedEventInfoButton: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventInfoButton.vue"
      ),
    AedEventOccurrenceType: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventOccurrenceType.vue"
      ),
    AedEventRequestedTime: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventRequestedTime.vue"
      ),
    AedEventRescuer: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventRescuer.vue"
      ),
    AedEventStatus: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventStatus.vue"
      ),
    AedEventUsername: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventUsername.vue"
      )
  }
})
export default class EventListPanel extends Vue {
  eventString(occ: number) {
    if (occ == 1) {
      return this.$t("events.eventS1");
    } else if (occ == 2) {
      return this.$t("events.eventS2");
    } else {
      return this.$t("events.eventS3");
    }
  }
  statusString(status: number) {
    if (status == 1) {
      return this.$t("events.statusS1");
    } else if (status == 2) {
      return this.$t("events.statusS2");
    } else {
      return this.$t("events.statusS3");
    }
  }
  //previewEvents = [];
  @environment.State locale!: string;
  @eventList.State selectedType!: number;
  @eventList.State selectedStatus!: number;
  @eventList.Getter allAedEvents!: AedEventCardDto[];
}
</script>
