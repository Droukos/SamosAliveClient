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
              >{{ username }} - {{ requestedTime }}</v-list-item-subtitle
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
          <div v-if="checkStatus(status) == 2">
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
          <div v-else-if="checkStatus(status) == 1">
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
import { AedEventCloseInfo, AedEventRescuerInfo, EventDto } from "@/types";

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
  message = "";
  dialog = false;
  openDialog() {
    this.dialog = true;
  }

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

  checkStatus(status: number) {
    if (status == 1) return 1;
    else if (status == 2) return 2;
    else return 3;
  }

  subResc() {
    this.subRescuer({ id: this.id, rescuer: this.username });
  }

  closeEvent() {
    this.closeAedEvent({ id: this.id, conclusion: this.message });
  }

  loadingSkeleton = true;
  @aedEvent.Action findEventId!: (data: EventDto) => Promise<any>;
  @aedEvent.Action subRescuer!: (data: AedEventRescuerInfo) => Promise<any>;
  @aedEvent.Action closeAedEvent!: (data: AedEventCloseInfo) => Promise<any>;
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
