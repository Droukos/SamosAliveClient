<template>
  <v-select
    v-model="typeChoice"
    :items="types"
    item-text="msg"
    item-value="code"
    v-on:change="choose(typeChoice)"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const eventList = namespace("eventList");

@Component
export default class AedEventSelectedType extends Vue {
  @eventList.State selectedType!: number;
  //TODO den allazei to selected
  @eventList.Mutation setType!: (typeCode: number) => void;
  types = [
    { msg: this.$t("events.eventS1"), code: 1 },
    { msg: this.$t("events.eventS2"), code: 2 },
    { msg: this.$t("events.eventS3"), code: 3 }
  ];
  typeChoice = 1;

  choose(typeCode: number) {
    this.setType(typeCode);
  }
}
</script>
