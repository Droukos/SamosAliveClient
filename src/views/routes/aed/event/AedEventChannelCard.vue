<template>
  <v-content>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      :loading="loading"
      :transition="transition"
      type="card"
    >
      <v-container>
        <v-card>
          <v-card-title>
            <AedEventOccurrenceType
              :occurrenceType="aedEventDto.occurrenceType"
            />
          </v-card-title>
          <v-card-subtitle>
            <span>{{ $t("events.id") + ": " + aedEventId }}</span>
          </v-card-subtitle>
          <AedEventMainInfo
            :aedEvent="aedEventDto"
            :center="aedEventMarkerCenter"
            :marker="aedEventMarkerCenter"
          />
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <div v-if="aedEventDto.status === allStatus.ONPROGRESS">
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
                      <v-spacer />
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
            <div v-else-if="aedEventDto.status === allStatus.PENDING">
              <v-btn
                color="primary"
                @click="subResc()"
                v-text="$t('history.assign')"
              />
            </div>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-skeleton-loader>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import aedEventChannelSubMod from "@/store/modules/dynamic/aed/events/sub/aed-event-channels-sub";
import { namespace } from "vuex-class";
import {
  AedEventCloseInfo,
  AedEventInfoDto,
  AedEventRescuerInfo,
  EventDto
} from "@/types/aed-event";
import { LatLng } from "leaflet";
import { statusOptions } from "@/plugins/enums/event-options";

const aedEventChannelSub = namespace("aedEventChannelSub");
const user = namespace("user");

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
      const aedEventChannelCard = vm as AedEventChannelCard;
      aedEventChannelCard.aedEventId = to.params.eventID;
      const store = aedEventChannelCard.$store;
      if (!(store && store.state && store.state["aedEventChannelSub"])) {
        store.registerModule("aedEventChannelSub", aedEventChannelSubMod);
      }
      const eventIdDto: EventDto = { id: aedEventChannelCard.aedEventId };
      aedEventChannelCard.findEventId(eventIdDto).then(() => {
        aedEventChannelCard.loading = false;
        if (
          aedEventChannelCard.username ==
          aedEventChannelCard.aedEventDto.username
        ) {
          aedEventChannelCard.listenEvent(eventIdDto);
        }
      });
    });
  }
  //beforeDestroy() {}
})
export default class AedEventChannelCard extends Vue {
  @user.State username!: string;
  @aedEventChannelSub.State aedEventChannelMap!: Map<string, AedEventInfoDto>;
  @aedEventChannelSub.State aedEventChannelTracker!: number;
  @aedEventChannelSub.Action findEventId!: (
    data: EventDto
  ) => Promise<AedEventInfoDto>;
  @aedEventChannelSub.Action subRescuer!: (
    data: AedEventRescuerInfo
  ) => Promise<any>;
  @aedEventChannelSub.Action closeAedEvent!: (
    data: AedEventCloseInfo
  ) => Promise<any>;
  @aedEventChannelSub.Action listenEvent!: (data: EventDto) => void;
  @aedEventChannelSub.Getter aedEventMarker!: (aedEventId: string) => LatLng;
  @aedEventChannelSub.Getter aedEvent!: (aedEventId: string) => AedEventInfoDto;
  loading = true;
  transition = "scale-transition";
  aedEventId = "";
  allStatus = statusOptions;
  message = "";

  dialog = false;
  openDialog() {
    this.dialog = true;
  }

  checkConclusion(conclusion: string) {
    return !(conclusion == null || conclusion != "");
  }

  subResc() {
    this.subRescuer({
      id: this.aedEventDto.id,
      rescuer: this.username
    }).then(() => {

      this.listenEvent({ id: this.aedEventId });
    });
  }

  closeEvent() {
    this.closeAedEvent({ id: this.aedEventDto.id, conclusion: this.message });
  }

  get aedEventDto() {
    return this.aedEvent(this.aedEventId);
  }

  get aedEventMarkerCenter() {
    return this.aedEventMarker(this.aedEventId);
  }
}
</script>
