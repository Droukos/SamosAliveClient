<template>
  <v-main>
    <h3 v-text="$t('events.eventListInfo')" />

    <v-timeline dense align-top>
      <v-timeline-item v-for="item in items" :key="item.index">
        <template v-slot:icon> </template>
        <span>{{ item.username }}</span>
        <v-card>
          <v-card-title>{{ item.header }}</v-card-title>
          <span v-text="$t('events.situation')" />
          <p style="display: inline">{{ item.description }}</p>
          <br />
          <span v-text="$t('events.address')" />
          <p style="display: inline">{{ item.description }}</p>
          <br />
          <span v-text="$t('events.comment')" />
          <p style="display: inline">{{ item.description }}</p>
          <br />
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EventList extends Vue {
  get items() {
    return [
      {
        index: 0,
        username: "user1",
        header: "sumban1",
        description: "mpla"
      },
      {
        index: 1,
        username: "user2",
        header: "sumban2",
        description: "klp klp"
      },
      {
        index: 2,
        username: "user3",
        header: this.$t("events.problemList"),
        description: "tade tade"
      }
    ];
  }
}
</script>
