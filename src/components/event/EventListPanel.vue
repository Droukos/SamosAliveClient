<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in allAedEvents" :key="item.id" :cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                <AedEventOccurrenceType :occurrenceType="item.occurrenceType" />
              </v-list-item-title>
              <br />
              <v-list-item-title>
                <AedEventAddress :address="item.address" />
              </v-list-item-title>
              <br />
              <v-list-item-subtitle bottom>
                <AedEventComment :comment="item.comment" />
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>
                <AedEventStatus :status="item.status" />
                <br />
                <AedEventUsername :username="item.username" />
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-card-actions>
            <h6>
              <AedEventRequestedTime :requestedTime="item.requestedTime" />
            </h6>
            <v-spacer />
            <AedEventInfoButton :eventID="item.id" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEventCardDto } from "@/types/aed-event";

const environment = namespace("environment");

@Component({
  components: {
    AedEventAddress: () =>
      import(
        /* webpackChunkName: "AedEventAddress" */ "@/components/event/info/AedEventAddress.vue"
      ),
    AedEventComment: () =>
      import(
        /* webpackChunkName: "AedEventComment" */ "@/components/event/info/AedEventComment.vue"
      ),
    AedEventInfoButton: () =>
      import(
        /* webpackChunkName: "AedEventInfoButton" */ "@/components/event/info/AedEventInfoButton.vue"
      ),
    AedEventOccurrenceType: () =>
      import(
        /* webpackChunkName: "AedEventOccurrenceType" */ "@/components/event/info/AedEventOccurrenceType.vue"
      ),
    AedEventRequestedTime: () =>
      import(
        /* webpackChunkName: "AedEventRequestedTime" */ "@/components/event/info/AedEventRequestedTime.vue"
      ),
    AedEventRescuer: () =>
      import(
        /* webpackChunkName: "AedEventRescuer" */ "@/components/event/info/AedEventRescuer.vue"
      ),
    AedEventStatus: () =>
      import(
        /* webpackChunkName: "AedEventStatus" */ "@/components/event/info/AedEventStatus.vue"
      ),
    AedEventUsername: () =>
      import(
        /* webpackChunkName: "AedEventUsername" */ "@/components/event/info/AedEventUsername.vue"
      )
  }
})
export default class EventListPanel extends Vue {
  @eventList.Getter allAedEvents!: AedEventCardDto[];

  @Prop() nextRoute!: string;
  @Prop() allAedEvents!: AedEventCardDto[];

  more(id: string) {
    this.$router.push({
      name: this.nextRoute,
      params: { eventID: id }
    });
  }
}
</script>
