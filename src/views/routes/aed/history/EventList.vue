<template>
  <v-main>
    <h3 v-text="$t('events.eventListInfo')" />
    <v-card class="mx-auto">
      <select @change="getSelected($event.target.selectedIndex)">
        <option
          v-for="(item, index) in events"
          v-bind:value="item.msg"
          v-bind:key="index"
        >
          {{ item.msg }}
        </option>
      </select>
      <br />
      <v-btn v-text="$t('history.searchEvent')" @click="searchEvent()" />
      <v-container fluid>
        <v-row dense>
          <v-col v-for="item in previewEvents" :key="item.index" :cols="12">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    eventString(item.occ)
                  }}</v-list-item-title>
                  <v-list-item-title>{{ item.comm }} </v-list-item-title>
                  <v-list-item-subtitle bottom>{{
                    item.user
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{
                    item.status
                  }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>

              <v-card-actions>
                <v-sheet
                  ><span>{{ item.user }}</span>
                  <v-spacer />
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        v-text="$t('history.more')"
                      >
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="primary">
                        {{ eventString(item.occ) }}
                      </v-card-title>
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-card-text>{{ item.comm }} </v-card-text>
                          <v-list-item-subtitle bottom>{{
                            item.user
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text>{{
                            item.status
                          }}</v-list-item-action-text>
                        </v-list-item-action>
                      </v-list-item>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false">
                          Cancel
                        </v-btn>
                        <v-btn color="primary" text @click="dialog = false">
                          Complete
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-sheet>
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
  events = [
    { msg: this.$t("events.eventS1") },
    { msg: this.$t("events.eventS2") },
    { msg: this.$t("events.eventS3") }
  ];
  selectedIndex = 0;
  isLoading = false;
  label = "";

  getSelected(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
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
  dialog = false;
  previewEvents = [];
  @search.Action fetchEventsPreview!: (occurrenceType: number) => Promise<any>;

  fetchEventsPreviewList() {
    setTimeout(() => {
      //console.log(this.selectedIndex);
      this.fetchEventsPreview(this.selectedIndex)
        .then(response => {
          this.previewEvents = response;
          //console.log(JSON.parse(JSON.stringify(response)));
          //console.log(this.previewEvents);
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => (this.isLoading = false));
    }, 700);
  }
  searchEvent() {
    this.isLoading = true;
    this.fetchEventsPreviewList();
  }
}
</script>
