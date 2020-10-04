<template>
  <v-main>
    <h3 v-text="$t('events.problemListInfo')" />
    <v-card class="mx-auto" max-width="500">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title v-text="$t('history.searchProblem')" />
        <v-spacer></v-spacer>
        <!--<v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>-->
      </v-toolbar>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="item in items" :key="item.index" :cols="12">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    item.problem
                  }}</v-list-item-title>
                  <v-list-item-title>{{ item.address }} </v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{
                    item.date
                  }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-text="$t('history.more')" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ProblemList extends Vue {
  get items() {
    return [
      {
        index: 0,
        address: "address1",
        problem: "problima1",
        description: "mplampla",
        date: "07/9/20"
      },
      {
        index: 1,
        address: "address2",
        problem: "problima2",
        description: "klp klp",
        date: "07/9/20"
      },
      {
        index: 2,
        address: "address3",
        problem: this.$t("events.problemList"),
        description: "tade tade",
        date: "07/9/20"
      }
    ];
  }
}
</script>
