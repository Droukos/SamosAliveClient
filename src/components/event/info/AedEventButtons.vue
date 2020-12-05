<template>
  <div v-if="status === allStatus.ONPROGRESS">
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
    <v-btn color="primary" @click="subResc()" v-text="$t('history.assign')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { statusOptions } from "@/plugins/enums/event-options";
import { AedEventCloseInfo, AedEventRescuerInfo } from "@/types/aed-event";

const aedEventInfo = namespace("aedEventInfo");

@Component
export default class AedEventButtons extends Vue {
  message = "";
  dialog = false;
  openDialog() {
    this.dialog = true;
  }
  allStatus = statusOptions;
  @aedEventInfo.State id!: string;
  @aedEventInfo.State username!: string;
  @aedEventInfo.State status!: number;
  @aedEventInfo.State completedTime!: number[];
  @aedEventInfo.State rescuer!: string;
  @aedEventInfo.State conclusion!: string;
  @aedEventInfo.Action subRescuer!: (data: AedEventRescuerInfo) => Promise<any>;
  @aedEventInfo.Action closeAedEvent!: (
    data: AedEventCloseInfo
  ) => Promise<any>;

  subResc() {
    this.subRescuer({ id: this.id, rescuer: this.username });
    console.log(this.completedTime);
    console.log(this.rescuer);
    console.log(this.conclusion);
  }

  closeEvent() {
    this.closeAedEvent({ id: this.id, conclusion: this.message });
  }
}
</script>
