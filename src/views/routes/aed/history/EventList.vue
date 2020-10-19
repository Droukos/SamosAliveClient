<template>
  <v-main>
    <h3 v-text="$t('events.eventListInfo')" />
    <v-card class="mx-auto">
      <v-text-field
        color="indigo"
        dark
        v-model="model.search"
        :loading="model.isLoading"
        class="pt-1"
        :counter="model.counter"
        :label="model.label"
        prepend-icon="mdi-database-search"
        @keyup="searchEvent()"
        outlined
      ></v-text-field>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="item in previewEvents" :key="item.index" :cols="12">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    item.occ
                  }}</v-list-item-title>
                  <v-list-item-title>{{ item.user }} </v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{
                    item.status
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
import { namespace } from "vuex-class";

const search = namespace("search");

@Component
export default class EventList extends Vue {
  model = {
    search: "",
    isLoading: false,
    counter: 1,
    label: this.$t("history.searchEvent")
  };
  previewEvents = [];
  @search.Action fetchEventsPreview!: (occurrenceType: string) => Promise<any>;

  fetchEventsPreviewList() {
    setTimeout(() => {
      this.fetchEventsPreview(this.model.search)
        .then(response => {
          this.previewEvents = response;
        })
        .finally(() => (this.model.isLoading = false));
    }, 700);
  }
  searchEvent() {
    this.model.isLoading = true;
    this.fetchEventsPreviewList();
  }
}
</script>
