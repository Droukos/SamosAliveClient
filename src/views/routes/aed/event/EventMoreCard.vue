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
          <AedEventOccurrenceType :occurrenceType="occurrenceType" />
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>
              {{ addr }}<AedEventAddress :address="address" />
            </v-card-text>
            <v-card-text>
              {{ comm }}<AedEventComment :comment="comment" />
            </v-card-text>
            <v-card-text>
              <!--TODO v-if gia na emfanizei conclusion mono an uparxei-->
              {{ concl }}<AedEventConclusion :conclusion="conclusion" />
            </v-card-text>
            <div
              :style="
                'height:' + ($vuetify.breakpoint.mdAndUp ? '600px' : '300px')
              "
            >
              <l-map :zoom="zoom" :center="center" style="z-index: 0;">
                <LTileLayerBase />
                <LMarkerRedSimple :marker="marker" />
              </l-map>
            </div>
            <v-list-item-subtitle bottom>
              {{ upload }}<AedEventUsername :username="username" />
              -
              <AedEventRequestedTime :requestedTime="requestedTime" />
            </v-list-item-subtitle>
            <div v-if="status === allStatus.COMPLETED">
              <v-list-item-subtitle bottom>
                {{ complete }} <AedEventRescuer :rescuer="rescuer" />
                -
                <AedEventCompletedTime :completedTime="completedTime" />
              </v-list-item-subtitle>
            </div>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              <AedEventStatus :status="status" />
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <AedEventButtons />
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { EventDto } from "@/types/aed-event";
import aedEventInfoMod from "@/store/modules/dynamic/aed/events/aed-event-info";
import L from "leaflet";
import { LControl, LMap } from "vue2-leaflet";
import { statusOptions } from "@/plugins/enums/event-options";

const aedEventInfo = namespace("aedEventInfo");
//TODO components sto card ton event kai antistoixa component gia news-problems
@Component({
  components: {
    LMap,
    LControl,
    AedEventAddress: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventAddress.vue"
      ),
    AedEventButtons: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventButtons.vue"
      ),
    AedEventComment: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventComment.vue"
      ),
    AedEventCompletedTime: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventCompletedTime.vue"
      ),
    AedEventConclusion: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/event/info/AedEventConclusion.vue"
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
      ),
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LMarkerRedSimple: () =>
      import(
        /* webpackChunkName: "LMarkerRedSimple" */ "@/components/map/LMarkerRedSimple.vue"
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
  message = "";
  addr = this.$t("events.addr");
  comm = this.$t("events.comm");
  concl = this.$t("events.concl");
  upload = this.$t("events.upload");
  complete = this.$t("events.complete");
  allStatus = statusOptions;

  checkConclusion(conclusion: string) {
    return !(conclusion == null || conclusion != "");
  }
  loadingSkeleton = true;
  @aedEventInfo.Action findEventId!: (data: EventDto) => Promise<any>;
  @aedEventInfo.State id!: string;
  @aedEventInfo.State userid!: string;
  @aedEventInfo.State username!: string;
  @aedEventInfo.State occurrenceType!: number;
  @aedEventInfo.State address!: string;
  @aedEventInfo.State comment!: string;
  @aedEventInfo.State status!: number;
  @aedEventInfo.State requestedTime!: number[];
  @aedEventInfo.State completedTime!: number[];
  @aedEventInfo.State rescuer!: string;
  @aedEventInfo.State conclusion!: string;
  @aedEventInfo.State zoom!: string;
  @aedEventInfo.State center!: L.LatLng;
  @aedEventInfo.State marker!: L.LatLng;
}
</script>
