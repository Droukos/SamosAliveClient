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
          <AedEventOccurrenceType />
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>{{ addr }}<AedEventAddress /> </v-card-text>
            <v-card-text>{{ comm }}<AedEventComment /> </v-card-text>
            <v-card-text>{{ concl }}<AedEventConclusion /> </v-card-text>
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
            <v-list-item-subtitle bottom
              >{{ upload }}<AedEventUsername /> -
              <AedEventRequestedTime />
            </v-list-item-subtitle>
            <div v-if="status === allStatus.COMPLETED">
              <v-list-item-subtitle bottom
                >{{ complete }} <AedEventRescuer /> - <AedEventCompletedTime
              /></v-list-item-subtitle>
            </div>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text
              ><AedEventStatus
            /></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="status === allStatus.ONPROGRESS">
            <v-btn
              color="primary"
              @click="openDialog()"
              v-text="$t('history.complete')"
            />
            <v-row justify="center">
              <v-dialog v-model="dialog" persistent>
                <v-card>
                  <v-card-title
                    class="headline"
                    v-text="$t('history.conclusion')"
                  />
                  <v-textarea
                    v-model="message"
                    maxlength="200"
                    solo
                  ></v-textarea>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                      v-text="$t('general.cancel')"
                    >
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="closeEvent()"
                      v-text="$t('history.complete')"
                    />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
          <div v-else-if="status === allStatus.PENDING">
            <v-btn
              color="primary"
              @click="subResc()"
              v-text="$t('history.assign')"
            />
          </div>
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import {
  AedEventCloseInfo,
  AedEventRescuerInfo,
  EventDto
} from "@/types/aed-event";
import aedEventInfoMod from "@/store/modules/dynamic/aed/events/aed-event-info";
import { statusOptions } from "@/plugins/enums/event-options";
import L from "leaflet";
import { LControl, LMap } from "vue2-leaflet";
import AedEventComment from "@/components/event/info/AedEventComment.vue";

const aedEventInfo = namespace("aedEventInfo");
const environment = namespace("environment");
//TODO components sto card ton event kai antistoixa component gia news-problems
@Component({
  components: {
    AedEventComment,
    LMap,
    LControl,
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
  dialog = false;
  openDialog() {
    this.dialog = true;
  }
  allStatus = statusOptions;

  checkConclusion(conclusion: string) {
    return !(conclusion == null || conclusion != "");
  }

  subResc() {
    this.subRescuer({ id: this.id, rescuer: this.username });
    console.log(this.completedTime);
    console.log(this.rescuer);
    console.log(this.conclusion);
  }

  closeEvent() {
    this.closeAedEvent({ id: this.id, conclusion: this.message });
  }

  loadingSkeleton = true;
  @aedEventInfo.Action findEventId!: (data: EventDto) => Promise<any>;
  @aedEventInfo.Action subRescuer!: (data: AedEventRescuerInfo) => Promise<any>;
  @aedEventInfo.Action closeAedEvent!: (
    data: AedEventCloseInfo
  ) => Promise<any>;
  @aedEventInfo.State id!: string;
  @aedEventInfo.State userid!: string;
  @aedEventInfo.State username!: string;
  @aedEventInfo.State status!: number;
  @aedEventInfo.State completedTime!: number[];
  @aedEventInfo.State rescuer!: string;
  @aedEventInfo.State conclusion!: string;
  @aedEventInfo.State zoom!: string;
  @aedEventInfo.State center!: L.LatLng;
  @aedEventInfo.State marker!: L.LatLng;
}
</script>
