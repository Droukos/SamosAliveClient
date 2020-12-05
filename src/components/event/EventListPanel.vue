<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in previewEvents" :key="item.index" :cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{
                eventString(item.occurrenceType)
              }}</v-list-item-title>
              <v-list-item-title>{{ item.comment }} </v-list-item-title>
              <!--<v-list-item-subtitle bottom>{{
                    TODO item.address
                  }}</v-list-item-subtitle>-->
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
            <h6>
              {{ $helper.convDate2(item.requestedTime, "long", locale) }}
            </h6>
            <v-spacer />
            <v-btn
              color="primary"
              dark
              @click="more(item.id)"
              v-text="$t('history.more')"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEventInfo } from "@/types/aed-event";

const eventList = namespace("eventList");
const environment = namespace("environment");

@Component
export default class EventListPanel extends Vue {
  eventString(occ: number) {
    if (occ == 1) {
      return this.$t("events.eventS1");
    } else if (occ == 2) {
      return this.$t("events.eventS2");
    } else {
      return this.$t("events.eventS3");
    }
  }
  statusString(status: number) {
    if (status == 1) {
      return this.$t("events.statusS1");
    } else if (status == 2) {
      return this.$t("events.statusS2");
    } else {
      return this.$t("events.statusS3");
    }
  }
  //previewEvents = [];
  @environment.State locale!: string;
  @eventList.State selectedType!: number;
  @eventList.State selectedStatus!: number;
  @eventList.State previewEvents!: AedEventInfo[];

  more(id: string) {
    this.$router.push({
      name: "eventMore",
      params: { eventID: id }
    });
  }
}
</script>
