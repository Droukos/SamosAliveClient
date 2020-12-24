<template>
  <v-select
    v-model="statusChoice"
    :items="status"
    item-text="msg"
    item-value="code"
    v-on:change="choose(statusChoice)"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const eventList = namespace("eventList");

@Component
export default class AedEventSelectedStatus extends Vue {
  @eventList.State selectedStatus!: number;
  @eventList.Mutation setStatus!: (statusCode: number) => void;
  status = [
    { msg: this.$t("events.statusS1"), code: 1 },
    { msg: this.$t("events.statusS2"), code: 2 },
    { msg: this.$t("events.statusS3"), code: 3 }
  ];
  statusChoice = 1;
  choose(statusCode: number) {
    this.setStatus(statusCode);
  }
}
</script>
