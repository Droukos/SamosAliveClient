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
          {{ problemsTitle }}
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>{{ address }} </v-card-text>
            <v-card-text>{{ information }} </v-card-text>
            <v-list-item-subtitle bottom
              >{{ username }} - {{ uploadedTime }}</v-list-item-subtitle
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
                      @click="closeProblems()"
                      v-text="$t('history.complete')"
                    /><!--TODO refresh page-->
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
          <div v-else-if="checkStatus(status) == 1">
            <v-btn
              color="primary"
              @click="subTech()"
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
  AedProblemsCloseInfo,
  AedProblemsTechnicalInfo,
  ProblemsDto
} from "@/types";

const aedProblems = namespace("aedProblems");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const problemsMoreCard = vm as ProblemsMoreCard;
      problemsMoreCard.findProblemsId({ id: to.params.problemsID }).then(() => {
        problemsMoreCard.loadingSkeleton = false;
      });
    });
  }
})
export default class ProblemsMoreCard extends Vue {
  message = "";
  dialog = false;
  openDialog() {
    this.dialog = true;
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

  checkStatus(status: number) {
    if (status == 1) return 1;
    else if (status == 2) return 2;
    else return 3;
  }

  subTech() {
    this.subTechnical({ id: this.id, technical: this.username });
  }

  closeProblems() {
    this.closeAedProblems({ id: this.id, conclusion: this.message });
  }

  @aedProblems.Action findProblemsId!: (data: ProblemsDto) => Promise<any>;
  @aedProblems.Action subTechnical!: (
    data: AedProblemsTechnicalInfo
  ) => Promise<any>;
  @aedProblems.Action closeAedProblems!: (
    data: AedProblemsCloseInfo
  ) => Promise<any>;
  @aedProblems.State id!: string;
  @aedProblems.State username!: string;
  @aedProblems.State problemsTitle!: number;
  @aedProblems.State address!: string;
  @aedProblems.State information!: string;
  @aedProblems.State status!: number;
  @aedProblems.State uploadedTime!: string;
}
</script>
