<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in previewProblems" :key="item.index" :cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{
                item.problemsTitle
              }}</v-list-item-title>
              <v-list-item-title>{{ item.address }} </v-list-item-title>
              <v-list-item-subtitle bottom>{{
                item.information
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                >{{ statusString(item.status) }}
                <br />
                {{ item.username }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-card-actions>
            <h6>{{ $helper.convDate2(item.uploadedTime, "long", locale) }}</h6>
            <v-spacer />
            <v-btn
              color="primary"
              dark
              @click="more(item.id)"
              v-text="$t('history.more')"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedProblemsCardDto } from "@/types/aed-problems";

const problemsList = namespace("problemsList");
const environment = namespace("environment");

@Component
export default class ProblemsListPanel extends Vue {
  statusString(status: number) {
    if (status == 1) {
      return this.$t("events.statusS1");
    } else if (status == 2) {
      return this.$t("events.statusS2");
    } else {
      return this.$t("events.statusS3");
    }
  }
  formatDate(date: number[]) {
    const d = date.toString();
    const formatted = d.substring(11, 19) + " " + d.substring(0, 10);
    console.log(formatted);
    return formatted;
  }
  @environment.State locale!: string;
  @problemsList.State problemsTitle!: string;
  @problemsList.State previewProblems!: AedProblemsCardDto;

  more(id: string) {
    this.$router.push({
      name: "problemsMore",
      params: { problemsID: id }
    });
  }
}
</script>
