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
            <v-list-item-subtitle bottom
              >{{ username }} -
              {{ requestedTime }}</v-list-item-subtitle
            >
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
          <v-btn color="primary" v-text="$t('history.assign')" />
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { EventDto } from "@/types";

const aedEvent = namespace("aedEvent");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const eventMoreCard = vm as EventMoreCard;
      eventMoreCard.findEventId({ id: to.params.eventID }).then(() => {
        eventMoreCard.loadingSkeleton = false;
      });
    });
  }
})
export default class EventMoreCard extends Vue {
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

  loadingSkeleton = true;
  @aedEvent.Action findEventId!: (data: EventDto) => Promise<any>;
  @aedEvent.State id!: string;
  @aedEvent.State userid!: string;
  @aedEvent.State username!: string;
  @aedEvent.State occurrenceType!: number;
  @aedEvent.State address!: string;
  @aedEvent.State comment!: string;
  @aedEvent.State status!: number;
  @aedEvent.State requestedTime!: string;
}
</script>
