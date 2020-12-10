<template>
  <div v-if="aedEvent.status === allStatus.ONPROGRESS">
    <v-btn
      color="primary"
      @click="openDialog()"
      v-text="$t('history.complete')"
    />
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title class="headline" v-text="$t('history.conclusion')" />
          <v-textarea v-model="message" maxlength="200" solo></v-textarea>
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
  <div v-else-if="aedEvent.status === allStatus.PENDING">
    <v-btn color="primary" @click="subResc()" v-text="$t('history.assign')" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { statusOptions } from "@/plugins/enums/event-options";
import {
  AedEventCloseInfo,
  AedEventInfoDto,
  AedEventRescuerInfo,
  EventDto
} from "@/types/aed-event";

const aedEventChannelSub = namespace("aedEventChannelSub");
const user = namespace("user");

@Component
export default class AedEventButtons extends Vue {
  message = "";
  dialog = false;
  allStatus = statusOptions;
  @Prop() aedEvent!: AedEventInfoDto;
  @user.State username!: string;
  @aedEventChannelSub.Action subRescuer!: (
    data: AedEventRescuerInfo
  ) => Promise<AedEventInfoDto>;
  @aedEventChannelSub.Action closeAedEvent!: (
    data: AedEventCloseInfo
  ) => Promise<any>;
  @aedEventChannelSub.Action listenEvent!: (data: EventDto) => void;

  subResc() {
    this.subRescuer({
      id: this.aedEvent.id,
      rescuer: this.username
    }).then(() => {
      this.listenEvent({ id: this.aedEvent.id });
    });
  }

  openDialog() {
    this.dialog = true;
  }

  closeEvent() {
    this.closeAedEvent({ id: this.aedEvent.id, conclusion: this.message });
  }
}
</script>
