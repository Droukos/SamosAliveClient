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
            <AedEventButtons :aedEvent="aedEventDto" />
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
import { AedEventInfoDto, EventDto } from "@/types/aed-event";
import { LatLng } from "leaflet";

const user = namespace("user");
const aedEventChannelSub = namespace("aedEventChannelSub");

@Component({
  components: {
    AedEventMainInfo: () =>
      import(
        /* webpackChunkName: "AedEventMainInfo" */ "@/components/event/info/AedEventMainInfo.vue"
      ),
    AedEventButtons: () =>
      import(
        /* webpackChunkName: "AedEventButtons" */ "@/components/event/info/AedEventButtons.vue"
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
  },
  beforeDestroy() {
    if (!this.hasAedEvChannel(this.aedEventId)) {
      this.deleteEvOnMap(this.aedEventId);
    }
  }
})
export default class AedEventChannelCard extends Vue {
  @aedEventChannelSub.Action findEventId!: (
    data: EventDto
  ) => Promise<AedEventInfoDto>;
  @user.State username!: string;
  @aedEventChannelSub.Action listenEvent!: (data: EventDto) => void;
  @aedEventChannelSub.Getter aedEventMarker!: (aedEventId: string) => LatLng;
  @aedEventChannelSub.Getter aedEvent!: (aedEventId: string) => AedEventInfoDto;
  @aedEventChannelSub.Getter hasAedEvChannel!: (aedEventId: string) => boolean;
  @aedEventChannelSub.Mutation deleteEvOnMap!: (aedEventId: string) => void;
  loading = true;
  transition = "scale-transition";
  aedEventId = "";

  get aedEventDto() {
    return this.aedEvent(this.aedEventId);
  }

  get aedEventMarkerCenter() {
    return this.aedEventMarker(this.aedEventId);
  }
}
</script>
