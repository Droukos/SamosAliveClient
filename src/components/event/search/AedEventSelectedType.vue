<template>
  <v-select
    v-model="selectedType"
    :items="types"
    item-text="msg"
    item-value="code"
    v-on:change="set(selectedType)"
  ></v-select>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const eventList = namespace("eventList");

@Component
export default class AedEventSelectedType extends Vue {
  @eventList.State selectedType!: number;
  //TODO den allazei to selected
  @eventList.Mutation setType!: (n: number) => void;
  types = [
    { msg: this.$t("events.eventS1"), code: 1 },
    { msg: this.$t("events.eventS2"), code: 2 },
    { msg: this.$t("events.eventS3"), code: 3 }
  ];
  //selectedType =1;
  set(n: number) {
    this.setType(this.types[n].code);
  }
}
</script>
