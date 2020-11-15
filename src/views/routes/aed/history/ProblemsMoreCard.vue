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
          <v-btn color="primary" v-text="$t('history.assign')" />
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ProblemsDto } from "@/types";

const aedProblems = namespace("aedProblems");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const problemsMoreCard = vm as ProblemsMoreCard;
      problemsMoreCard.findProblemsId({ id: to.params.problemsID }).then(() => {
        problemsMoreCard.loadingSkeleton = false;
        problemsMoreCard.loadingSkeleton = false;
      });
    });
  }
})
export default class ProblemsMoreCard extends Vue {
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
  @aedProblems.Action findProblemsId!: (data: ProblemsDto) => Promise<any>;
  @aedProblems.State id!: string;
  @aedProblems.State username!: string;
  @aedProblems.State problemsTitle!: number;
  @aedProblems.State address!: string;
  @aedProblems.State information!: string;
  @aedProblems.State status!: number;
  @aedProblems.State uploadedTime!: string;
}
</script>
