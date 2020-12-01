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
          {{ eventString(occurrenceType) }}
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>{{ address }} </v-card-text>
            <v-card-text>{{ comment }} </v-card-text>
            <v-card-text>{{ conclusion }} </v-card-text>
            <v-list-item-subtitle bottom
              >{{ upload }}{{ username }} -
              {{
                $helper.convDate2(requestedTime, "short", locale)
              }}</v-list-item-subtitle
            >
            <div v-if="status === allStatus.COMPLETED">
              <v-list-item-subtitle bottom
                >{{ complete }} {{ rescuer }} -
                {{
                  $helper.convDate2(completedTime, "long", locale)
                }}</v-list-item-subtitle
              >
            </div>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{
              statusString(status)
            }}</v-list-item-action-text>
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

const aedEventInfo = namespace("aedEventInfo");
const environment = namespace("environment");

@Component({
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
  upload = this.$t("events.upload");
  complete = this.$t("events.complete");
  dialog = false;
  openDialog() {
    this.dialog = true;
  }
  allStatus = statusOptions;

  eventString(occ: number) {
    if (occ == 1) {
      return this.$t("events.eventS1");
    }
    if (occ == 2) {
      return this.$t("events.eventS2");
    }
    if (occ == 3) {
      return this.$t("events.eventS3");
    }
  }

  statusString(status: number) {
    if (status == 1) {
      return this.$t("events.statusS1");
    }
    if (status == 2) {
      return this.$t("events.statusS2");
    }
    if (status == 3) {
      return this.$t("events.statusS3");
    }
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
  @environment.State locale!: string;
  @aedEventInfo.Action findEventId!: (data: EventDto) => Promise<any>;
  @aedEventInfo.Action subRescuer!: (data: AedEventRescuerInfo) => Promise<any>;
  @aedEventInfo.Action closeAedEvent!: (
    data: AedEventCloseInfo
  ) => Promise<any>;
  @aedEventInfo.State id!: string;
  @aedEventInfo.State userid!: string;
  @aedEventInfo.State username!: string;
  @aedEventInfo.State occurrenceType!: number;
  @aedEventInfo.State occurrencePoint!: number[];
  @aedEventInfo.State address!: string;
  @aedEventInfo.State comment!: string;
  @aedEventInfo.State status!: number;
  @aedEventInfo.State requestedTime!: number[];
  @aedEventInfo.State completedTime!: number[];
  @aedEventInfo.State rescuer!: string;
  @aedEventInfo.State conclusion!: string;
}
</script>
