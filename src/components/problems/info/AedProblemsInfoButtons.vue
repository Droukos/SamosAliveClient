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
            />
            <v-btn
              color="green darken-1"
              text
              @click="closeProblems()"
              v-text="$t('history.complete')"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
  <div v-else-if="status === allStatus.PENDING">
    <v-btn color="primary" @click="subTech()" v-text="$t('history.assign')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import {
  AedProblemsCloseInfo,
  AedProblemsTechnicalInfo
} from "@/types/aed-problems";
import { statusOptions } from "@/plugins/enums/event-options";

const aedProblemsInfo = namespace("aedProblemsInfo");

@Component
export default class AedProblemsInfoButtons extends Vue {
  message = "";
  dialog = false;
  allStatus = statusOptions;
  @aedProblemsInfo.State id!: string;
  @aedProblemsInfo.State username!: string;
  @aedProblemsInfo.State status!: number;
  @aedProblemsInfo.Action subTechnical!: (
    data: AedProblemsTechnicalInfo
  ) => Promise<any>;
  @aedProblemsInfo.Action closeAedProblems!: (
    data: AedProblemsCloseInfo
  ) => Promise<any>;
  openDialog() {
    this.dialog = true;
  }

  subTech() {
    this.subTechnical({ id: this.id, technical: this.username });
  }

  closeProblems() {
    this.closeAedProblems({ id: this.id, conclusion: this.message });
  }
}
</script>
